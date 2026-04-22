import React from "react";
import Image from "next/image";

interface PokemonModalProps {
  open: boolean;
  onClose: () => void;
  pokemon: {
    id: number;
    name: string;
    sprites: { other: { "official-artwork": { front_default: string } } };
    types: { type: { name: string } }[];
    stats: { base_stat: number; stat: { name: string } }[];
    height: number;
    weight: number;
    abilities?: { ability: { name: string } }[];
  } | null;
}

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

export default function PokemonModal({
  open,
  onClose,
  pokemon,
}: PokemonModalProps) {
  if (!open || !pokemon) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-slide-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-primary-500 text-2xl font-bold"
          aria-label="Fechar"
        >
          ×
        </button>
        <div className="flex flex-col items-center">
          <Image
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            width={180}
            height={180}
            className="mb-4 drop-shadow-lg"
          />
          <h2 className="text-2xl font-bold text-slate-800 capitalize mb-2">
            {pokemon.name}{" "}
            <span className="text-slate-400">
              #{String(pokemon.id).padStart(3, "0")}
            </span>
          </h2>
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
          <div className="grid grid-cols-2 gap-4 w-full mb-4">
            <div className="text-sm text-slate-600">
              <span className="font-medium">Altura:</span>{" "}
              {(pokemon.height / 10).toFixed(1)}m
            </div>
            <div className="text-sm text-slate-600">
              <span className="font-medium">Peso:</span>{" "}
              {(pokemon.weight / 10).toFixed(1)}kg
            </div>
            {pokemon.abilities && (
              <div className="col-span-2 text-sm text-slate-600">
                <span className="font-medium">Habilidades:</span>{" "}
                {pokemon.abilities.map((a) => a.ability.name).join(", ")}
              </div>
            )}
          </div>
          <div className="w-full">
            <h3 className="text-base font-semibold text-slate-700 mb-2">
              Stats
            </h3>
            <div className="space-y-2">
              {pokemon.stats.map(({ base_stat, stat }) => (
                <div key={stat.name}>
                  <div className="flex justify-between text-xs mb-0.5">
                    <span className="text-slate-500 uppercase tracking-wide">
                      {stat.name
                        .replace("special-", "sp. ")
                        .replace("attack", "atk")
                        .replace("defense", "def")}
                    </span>
                    <span className="font-semibold text-slate-700">
                      {base_stat}
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        base_stat > 100
                          ? "bg-green-500"
                          : base_stat > 60
                            ? "bg-primary-400"
                            : "bg-orange-400"
                      }`}
                      style={{
                        width: `${Math.min(100, (base_stat / 150) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
