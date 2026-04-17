"use client";

import Image from "next/image";

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

interface PokemonCardProps {
  pokemon: {
    id: number;
    name: string;
    sprites: { other: { "official-artwork": { front_default: string } } };
    types: { type: { name: string } }[];
    stats: { base_stat: number; stat: { name: string } }[];
    height: number;
    weight: number;
  };
  index: number;
}

export default function PokemonCard({ pokemon, index }: PokemonCardProps) {
  const artwork = pokemon.sprites.other["official-artwork"].front_default;
  const mainType = pokemon.types[0].type.name;

  return (
    <div
      className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl border border-slate-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 animate-slide-up"
      style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
    >
      <div className="absolute top-3 right-3 text-slate-200 font-bold text-3xl select-none">
        #{String(pokemon.id).padStart(3, "0")}
      </div>

      <div className="relative bg-gradient-to-b from-primary-50/60 to-transparent p-6 pb-2 flex justify-center">
        <Image
          src={artwork}
          alt={pokemon.name}
          width={160}
          height={160}
          className="drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      <div className="px-5 pb-5 pt-2">
        <h3 className="text-lg font-bold text-slate-800 capitalize mb-2">
          {pokemon.name}
        </h3>

        <div className="flex gap-2 mb-4">
          {pokemon.types.map(({ type }) => (
            <span
              key={type.name}
              className={`${TYPE_COLORS[type.name] || "bg-gray-400"} text-white text-xs font-semibold px-3 py-1 rounded-full capitalize`}
            >
              {type.name}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <span className="font-medium text-slate-700">Altura:</span>
            {(pokemon.height / 10).toFixed(1)}m
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium text-slate-700">Peso:</span>
            {(pokemon.weight / 10).toFixed(1)}kg
          </div>
        </div>

        <div className="mt-3 space-y-1.5">
          {pokemon.stats.slice(0, 3).map(({ base_stat, stat }) => (
            <div key={stat.name}>
              <div className="flex justify-between text-xs mb-0.5">
                <span className="text-slate-500 uppercase tracking-wide">
                  {stat.name.replace("special-", "sp. ").replace("attack", "atk").replace("defense", "def")}
                </span>
                <span className="font-semibold text-slate-700">
                  {base_stat}
                </span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    base_stat > 100
                      ? "bg-green-500"
                      : base_stat > 60
                        ? "bg-primary-400"
                        : "bg-orange-400"
                  }`}
                  style={{ width: `${Math.min(100, (base_stat / 150) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
