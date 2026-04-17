"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

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
    const users = getStoredUsers();
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!found) throw new Error("Credenciais inválidas");

    const currentUser = { name: found.name, email: found.email };
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    setUser(currentUser);
    router.push("/");
  }

  async function register(name: string, email: string, password: string) {
    const users = getStoredUsers();

    if (users.some((u) => u.email === email)) {
      throw new Error("Este e-mail já está cadastrado");
    }

    if (password.length < 6) {
      throw new Error("A senha deve ter pelo menos 6 caracteres");
    }

    users.push({ name, email, password });
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
