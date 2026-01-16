"use client";

import { useState, useEffect } from "react";
import { Task, Category, Subtask, Priority } from "@prisma/client";
import { X, Trash2, Plus, CheckCircle2, Circle, Save } from "lucide-react";
import { updateTask, deleteTask, createSubtask, toggleSubtask, deleteSubtask } from "@/app/actions/tasks";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; 

type TaskFull = Task & {
  category: Category | null;
  subtasks: Subtask[];
};

interface EditTaskModalProps {
  task: TaskFull;
  categories: Category[];
  onClose: () => void;
}

export function EditTaskModal({ task, categories, onClose }: EditTaskModalProps) {
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
  
  // ESTADO LOCAL: Permite atualizar a tela sem esperar o servidor
  const [localTask, setLocalTask] = useState<TaskFull>(task);
  const router = useRouter();

  // Garante que se a tarefa mudar externamente, o modal atualiza
  useEffect(() => {
    setLocalTask(task);
  }, [task]);

  const dataFormatada = localTask.dataLimite 
    ? new Date(localTask.dataLimite).toISOString().split('T')[0] 
    : "";

  async function handleUpdate(formData: FormData) {
    await updateTask(localTask.id, formData);
    toast.success("Tarefa atualizada!");
    router.refresh(); 
    onClose();
  }

  async function handleDelete() {
    if(confirm("Tem certeza que deseja excluir esta tarefa?")) {
        await deleteTask(localTask.id);
        toast.success("Tarefa excluída.");
        onClose();
    }
  }

  async function handleAddSubtask(e: React.FormEvent) {
    e.preventDefault();
    if (!newSubtaskTitle.trim()) return;

    const tempSubtask: Subtask = {
        id: Math.random(), // Provisório
        taskId: localTask.id,
        titulo: newSubtaskTitle,
        concluida: false
    };

    setLocalTask(prev => ({
        ...prev,
        subtasks: [...prev.subtasks, tempSubtask]
    }));
    setNewSubtaskTitle("");

    await createSubtask(localTask.id, newSubtaskTitle);
    
    router.refresh(); 
    toast.success("Subtarefa adicionada");
  }

  async function handleToggleSubtask(subId: number, currentStatus: boolean) {
    setLocalTask(prev => ({
        ...prev,
        subtasks: prev.subtasks.map(s => s.id === subId ? { ...s, concluida: !currentStatus } : s)
    }));
    await toggleSubtask(subId, currentStatus);
    router.refresh();
  }

  async function handleDeleteSubtask(subId: number) {
    setLocalTask(prev => ({
        ...prev,
        subtasks: prev.subtasks.filter(s => s.id !== subId)
    }));
    await deleteSubtask(subId);
    router.refresh();
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-white/10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative animate-in fade-in zoom-in duration-200 flex flex-col md:block">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 z-10 bg-slate-800/50 rounded-full">
          <X size={24} />
        </button>

        <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                ✏️ Editar Tarefa
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <form action={handleUpdate} className="flex flex-col gap-4">
                    <input type="hidden" name="status" value={localTask.status} />
                    
                    <div>
                        <label className="text-xs text-slate-500 uppercase font-bold ml-1">Título</label>
                        <input
                            type="text" name="titulo" defaultValue={localTask.titulo}
                            className="w-full bg-black/20 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-xs text-slate-500 uppercase font-bold ml-1">Descrição</label>
                        <textarea
                            name="descricao" defaultValue={localTask.descricao || ""}
                            className="w-full bg-black/20 border border-white/10 p-3 rounded-xl text-white outline-none h-32 resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs text-slate-500 uppercase font-bold ml-1">Data</label>
                            <input type="date" name="dataLimite" defaultValue={dataFormatada} className="w-full bg-black/20 border border-white/10 p-2 rounded-xl text-slate-300 text-sm outline-none" />
                        </div>
                        <div>
                            <label className="text-xs text-slate-500 uppercase font-bold ml-1">Prioridade</label>
                            <select name="priority" defaultValue={localTask.priority} className="w-full bg-black/20 border border-white/10 p-2 rounded-xl text-slate-300 text-sm outline-none cursor-pointer">
                                <option value="BAIXA" className="bg-slate-900">🟢 Baixa</option>
                                <option value="MEDIA" className="bg-slate-900">🟡 Média</option>
                                <option value="ALTA" className="bg-slate-900">🔴 Alta</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs text-slate-500 uppercase font-bold ml-1">Categoria</label>
                        <select name="categoryId" defaultValue={localTask.categoryId || ""} className="w-full bg-black/20 border border-white/10 p-3 rounded-xl text-slate-300 outline-none cursor-pointer">
                            <option value="">Sem Categoria</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id} className="bg-slate-900">{cat.nome}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-3 mt-4 pt-4 border-t border-white/10">
                        <button type="button" onClick={handleDelete} className="p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors border border-transparent hover:border-red-500/20">
                            <Trash2 size={20} />
                        </button>
                        <button className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white p-3 rounded-xl font-bold flex items-center justify-center gap-2">
                            <Save size={20} /> Salvar
                        </button>
                    </div>
                </form>

                <div className="bg-black/20 rounded-2xl p-5 border border-white/5 flex flex-col h-full">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex justify-between">
                        Subtarefas
                        <span className="text-indigo-400">{localTask.subtasks.filter(s => s.concluida).length}/{localTask.subtasks.length}</span>
                    </h3>

                    <div className="w-full bg-slate-800 h-1.5 rounded-full mb-6 overflow-hidden">
                        <div 
                            className="bg-indigo-500 h-full transition-all duration-500" 
                            style={{ width: `${localTask.subtasks.length > 0 ? (localTask.subtasks.filter(s => s.concluida).length / localTask.subtasks.length) * 100 : 0}%` }}
                        />
                    </div>

                    <ul className="space-y-3 mb-6 flex-1 overflow-y-auto pr-2 custom-scrollbar min-h-[100px]">
                        {localTask.subtasks.map(sub => (
                            <li key={sub.id} className="flex items-center gap-3 group animate-in fade-in slide-in-from-left-2 duration-300">
                                <button onClick={() => handleToggleSubtask(sub.id, sub.concluida)} className={sub.concluida ? "text-green-500 transition-colors" : "text-slate-500 hover:text-white transition-colors"}>
                                    {sub.concluida ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                                </button>
                                <span className={`flex-1 text-sm transition-all ${sub.concluida ? "line-through text-slate-600" : "text-slate-300"}`}>
                                    {sub.titulo}
                                </span>
                                <button onClick={() => handleDeleteSubtask(sub.id)} className="text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-1">
                                    <X size={16} />
                                </button>
                            </li>
                        ))}
                         {localTask.subtasks.length === 0 && <p className="text-slate-600 text-sm italic text-center py-4">Nenhuma subtarefa ainda.</p>}
                    </ul>

                    <form onSubmit={handleAddSubtask} className="flex gap-2 mt-auto">
                        <input 
                            type="text" 
                            value={newSubtaskTitle}
                            onChange={(e) => setNewSubtaskTitle(e.target.value)}
                            placeholder="Adicionar etapa..." 
                            className="flex-1 bg-slate-800 border border-white/10 px-3 py-2 rounded-lg text-sm text-white outline-none focus:border-indigo-500 transition-colors"
                        />
                        <button className="bg-slate-700 hover:bg-indigo-600 text-white p-2 rounded-lg transition-colors">
                            <Plus size={18} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}