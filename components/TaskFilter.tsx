"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function TaskFilter() { 
  const router = useRouter();
  const searchParams = useSearchParams();
  
  function buscar(texto: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (texto) {
      params.set("q", texto);
    } else {
      params.delete("q");
    }
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="w-full">
      <input 
        type="text" 
        placeholder="🔍 Buscar tarefa..." 
        onChange={(e) => buscar(e.target.value)}
        defaultValue={searchParams.get("q") || ""}
        className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-xl p-3 outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-slate-500"
      />
    </div>
  );
}