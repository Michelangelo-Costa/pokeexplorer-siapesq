"use client";

import { useEffect, useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import PokemonCard from "@/components/PokemonCard";
import { Search, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface PokemonListItem {
  name: string;
  url: string;
}

interface PokemonData {
  id: number;
  name: string;
  sprites: { other: { "official-artwork": { front_default: string } } };
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  height: number;
  weight: number;
}

const PER_PAGE = 20;

export default function PokedexPage() {
  const [pokemon, setPokemon] = useState<PokemonData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");

  const fetchPokemon = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const listRes = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${PER_PAGE}&offset=${page * PER_PAGE}`
      );
      if (!listRes.ok) throw new Error(`Erro ${listRes.status}`);
      const listData = await listRes.json();
      setTotal(listData.count);

      const details = await Promise.all(
        listData.results.map((p: PokemonListItem) =>
          fetch(p.url).then((r) => {
            if (!r.ok) throw new Error(`Erro ${r.status}`);
            return r.json();
          })
        )
      );
      setPokemon(details);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar Pokémon");
      setPokemon([]);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  const filtered = search
    ? pokemon.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    : pokemon;

  const totalPages = Math.ceil(total / PER_PAGE);

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            Pokédex
          </h1>
          <p className="text-slate-500 text-lg">
            Explore {total > 0 ? total.toLocaleString("pt-BR") : "..."} Pokémon
            com dados da PokéAPI
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Buscar nesta página..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0 || loading}
              className="flex items-center gap-1 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={16} />
              Anterior
            </button>
            <span className="px-4 py-3 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl">
              {page + 1} / {totalPages || "..."}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= totalPages - 1 || loading}
              className="flex items-center gap-1 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Próximo
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
            {error} —{" "}
            <button
              onClick={fetchPokemon}
              className="underline font-medium hover:text-red-900"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 size={40} className="text-primary-500 animate-spin" />
            <p className="text-slate-500">Carregando Pokémon...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">
              Nenhum Pokémon encontrado para &quot;{search}&quot;
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((p, i) => (
              <PokemonCard key={p.id} pokemon={p} index={i} />
            ))}
          </div>
        )}

        <div className="flex justify-center mt-12">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0 || loading}
              className="flex items-center gap-1 px-5 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={16} />
              Anterior
            </button>
            <span className="px-4 py-3 text-sm text-slate-500">
              Página {page + 1} de {totalPages || "..."}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= totalPages - 1 || loading}
              className="flex items-center gap-1 px-5 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Próximo
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
