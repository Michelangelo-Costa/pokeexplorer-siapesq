"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { Compass, Shield, Zap, Sparkles, ArrowRight } from "lucide-react";

const FEATURES = [
  {
    icon: Compass,
    title: "Explorar Pokémon",
    desc: "Navegue por centenas de Pokémon com dados detalhados obtidos em tempo real da PokéAPI.",
  },
  {
    icon: Shield,
    title: "Dados Completos",
    desc: "Veja tipos, estatísticas, altura, peso e muito mais de cada Pokémon.",
  },
  {
    icon: Zap,
    title: "Busca Inteligente",
    desc: "Encontre rapidamente qualquer Pokémon pelo nome com nossa busca em tempo real.",
  },
  {
    icon: Sparkles,
    title: "Design Moderno",
    desc: "Interface responsiva e intuitiva construída com React, Next.js e Tailwind CSS.",
  },
];

export default function HomePage() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-accent-400 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-20 w-96 h-96 bg-primary-300 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
            <div className="max-w-3xl animate-fade-in">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-primary-100 mb-6">
                <Sparkles size={14} />
                Desafio Frontend SiaPesq
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
                Explore o mundo
                <br />
                <span className="bg-gradient-to-r from-accent-400 to-pink-300 bg-clip-text text-transparent">
                  Pokémon
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-primary-100 max-w-2xl mb-10 leading-relaxed">
                Uma aplicação interativa construída com React, Next.js,
                TypeScript e Tailwind CSS. Descubra informações detalhadas sobre
                seus Pokémon favoritos com dados em tempo real.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/pokedex"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-700 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:bg-primary-50 transition-all"
                >
                  <Compass size={20} />
                  Explorar Pokédex
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
                {!user && (
                  <Link
                    href="/registro"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all"
                  >
                    Criar conta
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Por que usar o PokéExplorer?
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Uma experiência completa para explorar o universo Pokémon com
              tecnologia moderna.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className="group p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-primary-200 transition-all duration-300 animate-slide-up"
                style={{
                  animationDelay: `${i * 100}ms`,
                  animationFillMode: "both",
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  {title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Pronto para começar?
            </h2>
            <p className="text-primary-100 mb-8 text-lg">
              Crie sua conta e comece a explorar agora mesmo.
            </p>
            <Link
              href="/pokedex"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:bg-primary-50 transition-all"
            >
              <Compass size={20} />
              Abrir Pokédex
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
          <p>
            PokéExplorer &mdash; Desafio Frontend SiaPesq &copy; 2026. Dados da{" "}
            <a
              href="https://pokeapi.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300"
            >
              PokéAPI
            </a>
            .
          </p>
        </div>
      </footer>
    </>
  );
}
