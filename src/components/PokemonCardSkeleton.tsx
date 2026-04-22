import React from "react";

export default function PokemonCardSkeleton({ count = 1 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden"
        >
          <div className="relative bg-slate-100 p-6 pb-2 flex justify-center h-[160px]">
            <div className="w-32 h-32 bg-slate-200 rounded-full" />
          </div>
          <div className="px-5 pb-5 pt-2">
            <div className="h-5 w-2/3 bg-slate-200 rounded mb-3" />
            <div className="flex gap-2 mb-4">
              <div className="h-6 w-16 bg-slate-200 rounded-full" />
              <div className="h-6 w-16 bg-slate-200 rounded-full" />
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="h-4 w-16 bg-slate-200 rounded" />
              <div className="h-4 w-16 bg-slate-200 rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-full bg-slate-200 rounded" />
              <div className="h-3 w-5/6 bg-slate-200 rounded" />
              <div className="h-3 w-2/3 bg-slate-200 rounded" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
