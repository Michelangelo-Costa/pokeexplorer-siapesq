"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { hash, compare } from "bcryptjs";

interface User {
  name: string;
  email: string;
}

interface StoredUser extends User {
  password: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getStoredUsers(): StoredUser[] {
  const data = localStorage.getItem("registeredUsers");
  return data ? JSON.parse(data) : [];
}

function saveStoredUsers(users: StoredUser[]) {
  localStorage.setItem("registeredUsers", JSON.stringify(users));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  async function login(email: string, password: string) {
    if (!EMAIL_REGEX.test(email)) throw new Error("E-mail inválido");

    const users = getStoredUsers();
    const found = users.find((u) => u.email === email);

    if (!found) throw new Error("Credenciais inválidas");

    const valid = await compare(password, found.password);
    if (!valid) throw new Error("Credenciais inválidas");

    const currentUser = { name: found.name, email: found.email };
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    setUser(currentUser);
    router.push("/");
  }

  async function register(name: string, email: string, password: string) {
    if (!name.trim()) throw new Error("Nome é obrigatório");
    if (!EMAIL_REGEX.test(email)) throw new Error("E-mail inválido");
    if (password.length < 8) throw new Error("A senha deve ter pelo menos 8 caracteres");

    const users = getStoredUsers();

    if (users.some((u) => u.email === email)) {
      throw new Error("Este e-mail já está cadastrado");
    }

    const hashed = await hash(password, 10);
    users.push({ name, email, password: hashed });
    saveStoredUsers(users);

    const currentUser = { name, email };
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    setUser(currentUser);
    router.push("/");
  }

  function logout() {
    localStorage.removeItem("currentUser");
    setUser(null);
    router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
