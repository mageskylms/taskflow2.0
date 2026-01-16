import { prisma } from "@/lib/prisma";
import { createCategory } from "@/app/actions/tasks";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { CategoryItem } from "@/components/CategoryItem";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { nome: 'asc' },
    include: { _count: { select: { tasks: true } } }
  });

  return (
    <main className="max-w-xl mx-auto p-4 md:p-12 font-sans min-h-screen text-slate-200">
      
      <div className="flex items-center gap-4 mb-8">
        <Link href="/" className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Gerenciar Categorias</h1>
          <p className="text-slate-400 text-sm">Organize suas etiquetas</p>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 p-5 rounded-2xl mb-8">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">
            Nova Categoria
        </h2>
        
        <form action={createCategory} className="flex flex-col sm:flex-row gap-3">
          
          <input
            type="text"
            name="nome"
            placeholder="Nome da categoria..."
            className="w-full sm:flex-1 bg-black/30 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-indigo-500"
            required
            autoComplete="off"
          />
          
          <div className="flex gap-3">
            <select name="cor" className="flex-1 sm:flex-none bg-black/30 border border-white/10 p-3 rounded-xl cursor-pointer outline-none text-center sm:text-left">
                <option value="bg-blue-500">🔵 Azul</option>
                <option value="bg-green-500">🟢 Verde</option>
                <option value="bg-red-500">🔴 Vermelho</option>
                <option value="bg-purple-500">🟣 Roxo</option>
                <option value="bg-yellow-500">🟡 Amarelo</option>
                <option value="bg-orange-500">🟠 Laranja</option>
            </select>

            <button className="flex-1 sm:flex-none bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 sm:py-0 rounded-xl font-bold flex items-center justify-center transition-colors">
                <Plus size={20} />
            </button>
          </div>

        </form>
      </div>

      <div className="space-y-3 pb-20">
        {categories.length === 0 && (
            <p className="text-center text-slate-500 py-10">Nenhuma categoria criada.</p>
        )}
        
        {categories.map((cat) => (
            <CategoryItem key={cat.id} category={cat} count={cat._count.tasks} />
        ))}
      </div>
    </main>
  );
}