import { prisma } from "@/lib/prisma";
import { updateTask } from "@/app/actions/tasks";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Save, Trash2 } from "lucide-react";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPage({ params }: EditPageProps) {
  const { id } = await params;
  const taskId = parseInt(id);

  if (isNaN(taskId)) redirect("/");

  const task = await prisma.task.findUnique({ where: { id: taskId } });
  const categories = await prisma.category.findMany({ orderBy: { nome: 'asc' } });

  if (!task) redirect("/");

  const updateTaskWithId = updateTask.bind(null, task.id);
  
  // Data formatada (DD/MM/AAAA)
  const dataFormatada = task.dataLimite 
    ? new Date(task.dataLimite).toISOString().split('T')[0] 
    : "";

  return (
    <main className="max-w-2xl mx-auto p-6 md:p-12 font-sans min-h-screen text-slate-200">
      
      <div className="flex items-center gap-4 mb-8">
        <Link href="/" className="p-3 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-3xl font-bold text-white">Editar Tarefa</h1>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
        <form action={updateTaskWithId} className="flex flex-col gap-6">
          
          <div className="flex gap-2 mb-2">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">Status Atual:</span>
            <span className="text-xs uppercase tracking-wider text-indigo-400 font-bold">{task.status.replace('_', ' ')}</span>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2 ml-1">Título</label>
            <input
              type="text"
              name="titulo"
              defaultValue={task.titulo}
              className="w-full bg-black/30 border border-white/10 p-4 rounded-xl text-white focus:ring-2 focus:ring-indigo-500/50 outline-none text-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2 ml-1">Descrição</label>
            <textarea
              name="descricao"
              defaultValue={task.descricao || ""}
              className="w-full bg-black/30 border border-white/10 p-4 rounded-xl text-white focus:ring-2 focus:ring-indigo-500/50 outline-none h-32 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div>
              <label className="block text-sm text-slate-400 mb-2 ml-1">Data Limite</label>
              <input
                type="date"
                name="dataLimite"
                defaultValue={dataFormatada}
                className="w-full bg-black/30 border border-white/10 p-3 rounded-xl text-slate-300 focus:ring-2 focus:ring-indigo-500/50 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2 ml-1">Categoria</label>
              <select 
                name="categoryId" 
                defaultValue={task.categoryId || ""}
                className="w-full bg-black/30 border border-white/10 p-3 rounded-xl text-slate-300 focus:ring-2 focus:ring-indigo-500/50 outline-none appearance-none cursor-pointer"
              >
                <option value="">Sem Categoria</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id} className="bg-slate-900">
                    {cat.nome}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2 ml-1">Prioridade</label>
              <select 
                name="priority" 
                defaultValue={task.priority}
                className="w-full bg-black/30 border border-white/10 p-3 rounded-xl text-slate-300 focus:ring-2 focus:ring-indigo-500/50 outline-none appearance-none cursor-pointer"
              >
                <option value="BAIXA" className="bg-slate-900">🟢 Baixa</option>
                <option value="MEDIA" className="bg-slate-900">🟡 Média</option>
                <option value="ALTA" className="bg-slate-900">🔴 Alta</option>
              </select>
            </div>

             <div>
              <label className="block text-sm text-slate-400 mb-2 ml-1">Mover para</label>
              <select 
                name="status" 
                defaultValue={task.status}
                className="w-full bg-black/30 border border-white/10 p-3 rounded-xl text-slate-300 focus:ring-2 focus:ring-indigo-500/50 outline-none appearance-none cursor-pointer"
              >
                <option value="TODO" className="bg-slate-900">A Fazer</option>
                <option value="IN_PROGRESS" className="bg-slate-900">Em Progresso</option>
                <option value="DONE" className="bg-slate-900">Concluído</option>
              </select>
            </div>

          </div>

          <div className="flex gap-4 mt-4 pt-4 border-t border-white/10">
              <Link href="/" className="flex-1 py-3 rounded-xl text-center text-slate-400 hover:bg-white/5 border border-transparent hover:border-white/10 transition-all">
                  Cancelar
              </Link>
              <button className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2">
                <Save size={20} />
                Salvar Alterações
              </button>
          </div>

        </form>
      </div>
    </main>
  );
}