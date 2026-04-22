"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  Menu,
  X,
  LogOut,
  Compass,
  Home,
  LogIn,
  UserPlus,
  Moon,
  Sun,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const NAV_ITEMS = [
  { href: "/", label: "Início", icon: Home },
  { href: "/pokedex", label: "Pokédex", icon: Compass },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { theme, mounted, toggleTheme } = useTheme();

  const isAuth = pathname === "/login" || pathname === "/registro";
  if (isAuth) return null;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-primary-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:shadow-lg transition-shadow">
              P
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
              PokéExplorer
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  pathname === href
                    ? "bg-primary-50 text-primary-700"
                    : "text-slate-600 hover:text-primary-600 hover:bg-primary-50/50"
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-slate-600">
                  Olá, <strong className="text-primary-700">{user.name}</strong>
                </span>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                >
                  <LogOut size={16} />
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary-600 hover:bg-primary-50/50 rounded-lg transition-all"
                >
                  <LogIn size={16} />
                  Entrar
                </Link>
                <Link
                  href="/registro"
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  <UserPlus size={16} />
                  Cadastrar
                </Link>
              </>
            )}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-slate-600 hover:bg-primary-50 transition-all w-full flex items-center gap-2"
                aria-label="Alternar tema"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                <span className="text-sm">
                  {theme === "dark" ? "Claro" : "Escuro"}
                </span>
              </button>
            )}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-primary-50"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-primary-100 bg-white/95 backdrop-blur-lg animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  pathname === href
                    ? "bg-primary-50 text-primary-700"
                    : "text-slate-600 hover:bg-primary-50/50"
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            ))}
            <div className="border-t border-primary-100 pt-2 mt-2">
              {user ? (
                <>
                  <p className="px-4 py-2 text-sm text-slate-500">
                    Logado como <strong>{user.name}</strong>
                  </p>
                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
                  >
                    <LogOut size={18} />
                    Sair
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-primary-50/50"
                  >
                    <LogIn size={18} />
                    Entrar
                  </Link>
                  <Link
                    href="/registro"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-primary-600 hover:bg-primary-50/50"
                  >
                    <UserPlus size={18} />
                    Cadastrar
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
