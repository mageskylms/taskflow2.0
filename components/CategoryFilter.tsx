"use client";

import { Category } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { LayoutGrid } from "lucide-react";

interface CategoryFilterProps {
  categories: Category[];
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCatId = searchParams.get("cat");

  function setCategory(id: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (id) {
      params.set("cat", id);
    } else {
      params.delete("cat");
    }
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-6">
      <button
        onClick={() => setCategory(null)}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border
          ${!currentCatId 
            ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20" 
            : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
          }
        `}
      >
        <LayoutGrid size={16} />
        Todas
      </button>

      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setCategory(cat.id.toString())}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border whitespace-nowrap
            ${currentCatId === cat.id.toString()
              ? `bg-white text-slate-900 border-white shadow-lg shadow-indigo-500/20 ` // Estilo Ativo
              : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
            }
          `}
        >
          <div className={`w-2 h-2 rounded-full ${cat.cor || 'bg-slate-500'}`} />
          {cat.nome}
        </button>
      ))}
    </div>
  );
}