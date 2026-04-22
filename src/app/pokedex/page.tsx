"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import PokemonModal from "@/components/PokemonModal";
import { PokemonCardClickable } from "@/components/PokemonCard";
import PokemonCardSkeleton from "@/components/PokemonCardSkeleton";

const TYPE_COLORS: Record<string, string> = {
  normal: "bg-gray-400",
  fire: "bg-orange-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-cyan-400",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-amber-600",
  flying: "bg-indigo-300",
  psychic: "bg-pink-500",
  bug: "bg-lime-500",
  rock: "bg-amber-700",
  ghost: "bg-purple-700",
  dragon: "bg-violet-700",
  dark: "bg-gray-700",
  steel: "bg-slate-400",
  fairy: "bg-pink-300",
};

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

  const [selected, setSelected] = useState<PokemonData | null>(null);
  const [types, setTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/type")
      .then((res) => res.json())
      .then((data) =>
        setTypes(data.results.map((t: { name: string }) => t.name)),
      );
  }, []);

  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const listRes = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${PER_PAGE}&offset=${page * PER_PAGE}`,
        );
        if (!listRes.ok) throw new Error(`Erro ${listRes.status}`);
        const listData = await listRes.json();
        if (cancelled) return;
        setTotal(listData.count);

        const details = await Promise.all(
          listData.results.map((p: PokemonListItem) =>
            fetch(p.url).then((r) => {
              if (!r.ok) throw new Error(`Erro ${r.status}`);
              return r.json();
            }),
          ),
        );
        if (cancelled) return;
        setPokemon(details);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Erro ao carregar Pokémon");
        setPokemon([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [page, retryCount]);

  const filtered = search
    ? pokemon.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    : pokemon;

  const filteredByType = selectedType
    ? filtered.filter((p) => p.types.some((t) => t.type.name === selectedType))
    : filtered;

  const totalPages = Math.ceil(total / PER_PAGE);

  return (
    <>
      <Navbar />
      <PokemonModal
        open={!!selected}
        onClose={() => setSelected(null)}
        pokemon={selected}
      />
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

        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedType("")}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
              !selectedType
                ? "bg-primary-500 text-white border-primary-500"
                : "bg-white text-slate-600 border-slate-200 hover:bg-primary-50"
            }`}
          >
            Todos
          </button>
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium border capitalize transition-all ${
                selectedType === type
                  ? `${TYPE_COLORS[type] || "bg-primary-500 text-white border-primary-500"} text-white border-0`
                  : `${TYPE_COLORS[type] || "bg-white text-slate-600 border-slate-200"} bg-white text-slate-600 border-slate-200 hover:bg-primary-50`
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
            {error} —{" "}
            <button
              onClick={() => setRetryCount((c) => c + 1)}
              className="underline font-medium hover:text-red-900"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <PokemonCardSkeleton count={PER_PAGE} />
          </div>
        ) : filteredByType.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">
              Nenhum Pokémon encontrado para &quot;{search}&quot;
              {selectedType ? ` do tipo ${selectedType}` : ""}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredByType.map((p, i) => (
              <PokemonCardClickable
                key={p.id}
                pokemon={p}
                index={i}
                onClick={() => setSelected(p)}
              />
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
