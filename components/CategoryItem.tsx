"use client";

import { useState } from "react";
import { Category } from "@prisma/client";
import { Trash2, Edit2, Check, X } from "lucide-react";
import { updateCategory, deleteCategory } from "@/app/actions/tasks"; 
import { toast } from "sonner";

interface CategoryItemProps {
  category: Category;
  count: number;
}

export function CategoryItem({ category, count }: CategoryItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  async function handleUpdate(formData: FormData) {
    await updateCategory(category.id, formData);
    setIsEditing(false);
    toast.success("Categoria atualizada!");
  }

  if (isEditing) {
    return (
      <form action={handleUpdate} className="flex items-center gap-2 p-3 bg-white/10 rounded-xl border border-indigo-500/50">
        <input 
            type="text" 
            name="nome" 
            defaultValue={category.nome} 
            className="bg-black/20 text-white p-2 rounded-lg outline-none flex-1"
            autoFocus
        />
        <select name="cor" defaultValue={category.cor || "bg-slate-500"} className="bg-black/20 text-white p-2 rounded-lg outline-none cursor-pointer">
            <option value="bg-blue-500">🔵</option>
            <option value="bg-green-500">🟢</option>
            <option value="bg-red-500">🔴</option>
            <option value="bg-purple-500">🟣</option>
            <option value="bg-orange-500">🟠</option>
            <option value="bg-pink-500">🌸</option>
        </select>
        <button type="submit" className="text-green-400 hover:bg-green-500/10 p-2 rounded"><Check size={18} /></button>
        <button type="button" onClick={() => setIsEditing(false)} className="text-red-400 hover:bg-red-500/10 p-2 rounded"><X size={18} /></button>
      </form>
    );
  }

  return (
    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors group">
        <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full ${category.cor || 'bg-slate-500'}`} />
            <div>
            <p className="font-medium text-white">{category.nome}</p>
            <p className="text-xs text-slate-500">{count} tarefas</p>
            </div>
        </div>

        <div className="flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
            <button onClick={() => setIsEditing(true)} className="text-slate-400 hover:text-indigo-400 p-2 rounded hover:bg-white/5 transition-colors">
                <Edit2 size={18} />
            </button>
            <button onClick={() => deleteCategory(category.id)} className="text-slate-400 hover:text-red-400 p-2 rounded hover:bg-white/5 transition-colors">
                <Trash2 size={18} />
            </button>
        </div>
    </div>
  );
}