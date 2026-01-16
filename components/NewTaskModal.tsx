"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Category } from "@prisma/client";
import Link from "next/link";
import { toast } from "sonner";

interface NewTaskModalProps {
  categories: Category[];
  addTaskAction: (formData: FormData) => Promise<void>; 
}

export function NewTaskModal({ categories, addTaskAction }: NewTaskModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  async function handleSubmit(formData: FormData) {
    await addTaskAction(formData);
    setIsOpen(false); 
    toast.success("Tarefa criada com sucesso!");
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-full shadow-2xl shadow-indigo-500/40 transition-transform hover:scale-110 active:scale-95 z-50 group"
      >
        <Plus size={28} />
        <span className="absolute right-full mr-4 bg-slate-800 text-white px-3 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Nova Tarefa
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          
          <div className="bg-slate-900 border border-white/10 w-full max-w-2xl rounded-3xl shadow-2xl p-6 relative animate-in fade-in zoom-in duration-200">
            
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold text-white mb-6">Criar Nova Tarefa</h2>

            <form action={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    name="titulo"
                    placeholder="✨ O que precisa ser feito?"
                    className="w-full bg-black/20 border border-white/10 p-4 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 outline-none text-lg"
                    required
                    autoFocus
                    autoComplete="off"
                />

                <textarea
                    name="descricao"
                    placeholder="Descrição ou detalhes..."
                    className="w-full bg-black/20 border border-white/10 p-4 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 outline-none resize-none h-24"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                        type="date"
                        name="dataLimite"
                        className="bg-black/20 border border-white/10 p-3 rounded-xl text-slate-300 focus:ring-2 focus:ring-indigo-500/50 outline-none w-full"
                    />

                    <div className="relative">
                        <select 
                            name="categoryId" 
                            className="bg-black/20 border border-white/10 p-3 rounded-xl text-slate-300 focus:ring-2 focus:ring-indigo-500/50 outline-none w-full appearance-none cursor-pointer h-full"
                        >
                            <option value="">Sem Categoria</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id} className="bg-slate-900">
                                    {cat.nome}
                                </option>
                            ))}
                        </select>
                        <Link href="/categorias" className="absolute top-1/2 -translate-y-1/2 right-3 text-indigo-400 hover:text-white">
                            <Plus size={16} />
                        </Link>
                    </div>

                    <select 
                        name="priority" 
                        className="bg-black/20 border border-white/10 p-3 rounded-xl text-slate-300 focus:ring-2 focus:ring-indigo-500/50 outline-none w-full appearance-none cursor-pointer"
                    >
                        <option value="BAIXA" className="bg-slate-900">🟢 Prioridade Baixa</option>
                        <option value="MEDIA" className="bg-slate-900">🟡 Prioridade Média</option>
                        <option value="ALTA" className="bg-slate-900">🔴 Prioridade Alta</option>
                    </select>
                </div>

                <button className="bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-xl font-bold mt-2 transition-all hover:scale-[1.02] active:scale-95">
                    Salvar Tarefa
                </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}