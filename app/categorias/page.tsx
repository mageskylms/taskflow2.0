import { prisma } from "@/lib/prisma";
import { createCategory } from "@/app/actions/tasks";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CategoryItem } from "@/components/CategoryItem"; 
export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { nome: 'asc' },
    include: { _count: { select: { tasks: true } } }
  });

  return (
    <main className="max-w-xl mx-auto p-6 md:p-12 font-sans min-h-screen text-slate-200">
      
      <div className="flex items-center gap-4 mb-8">
        <Link href="/" className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Gerenciar Categorias</h1>
          <p className="text-slate-400 text-sm">Organize suas etiquetas</p>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-8">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">Nova Categoria</h2>
        <form action={createCategory} className="flex gap-3">
          <input
            type="text"
            name="nome"
            placeholder="Nome da categoria..."
            className="flex-1 bg-black/30 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-indigo-500"
            required
            autoComplete="off"
          />
          <select name="cor" className="bg-black/30 border border-white/10 p-3 rounded-xl cursor-pointer outline-none">
            <option value="bg-blue-500">🔵</option>
            <option value="bg-green-500">🟢</option>
            <option value="bg-red-500">🔴</option>
            <option value="bg-purple-500">🟣</option>
          </select>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 rounded-xl font-bold">
            +
          </button>
        </form>
      </div>

      <div className="space-y-3">
        {categories.map((cat) => (
            <CategoryItem key={cat.id} category={cat} count={cat._count.tasks} />
        ))}
      </div>
    </main>
  );
}