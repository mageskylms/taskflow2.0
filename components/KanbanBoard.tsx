"use client";

import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Task, Category, Subtask, Status } from "@prisma/client";
import { updateTaskStatus, deleteTask } from "@/app/actions/tasks";
import { Calendar, Tag, ChevronLeft, ChevronRight, CheckCircle2, Trash2, ListChecks, Edit2 } from "lucide-react";
import { toast } from "sonner";
import { formatSmartDate, checkIsLate } from "@/lib/dateUtils";
import { EditTaskModal } from "./EditTaskModal";
import Link from "next/link";

type TaskFull = Task & {
  category: Category | null;
  subtasks: Subtask[];
};

interface KanbanBoardProps {
  initialTasks: TaskFull[];
  categories: Category[];
}

const columns = {
  [Status.TODO]: { title: "A Fazer", color: "border-slate-500/20 bg-slate-500/5", badge: "bg-slate-500/20 text-slate-400" },
  [Status.IN_PROGRESS]: { title: "Em Progresso", color: "border-blue-500/20 bg-blue-500/5", badge: "bg-blue-500/20 text-blue-400" },
  [Status.DONE]: { title: "Concluído", color: "border-green-500/20 bg-green-500/5", badge: "bg-green-500/20 text-green-400" },
};

const priorityConfig = {
  BAIXA: { color: "bg-emerald-500" },
  MEDIA: { color: "bg-yellow-500" },
  ALTA:  { color: "bg-rose-500" },
};

export function KanbanBoard({ initialTasks, categories }: KanbanBoardProps) {
  const [tasks, setTasks] = useState(initialTasks);
  const [editingTask, setEditingTask] = useState<TaskFull | null>(null);

  useEffect(() => { setTasks(initialTasks); }, [initialTasks]);

  const moveTask = async (taskId: number, newStatus: Status) => {
    const task = tasks.find(t => t.id === taskId);
    if(!task) return;
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    
    if (newStatus === "DONE") toast.success("Tarefa concluída! 🎉");
    else toast.info(`Movido para ${columns[newStatus].title}`);

    await updateTaskStatus(taskId, newStatus);
  };

  const handleDelete = async (e: React.MouseEvent, taskId: number) => {
    e.stopPropagation();
    if(confirm("Excluir tarefa?")) {
        setTasks(prev => prev.filter(t => t.id !== taskId));
        await deleteTask(taskId);
        toast.success("Tarefa excluída");
    }
  }

  const onDragEnd = async (result: any) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const newStatus = destination.droppableId as Status;
    const taskId = parseInt(draggableId);

    const updatedTasks = tasks.map((t) => t.id === taskId ? { ...t, status: newStatus } : t);
    setTasks(updatedTasks);
    await updateTaskStatus(taskId, newStatus);
  };

  return (
    <>
        <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-col md:flex-row gap-6 overflow-x-auto pb-24 scrollbar-hide">
            
            {Object.entries(columns).map(([statusKey, config]) => (
            <div key={statusKey} className={`flex-1 min-w-[320px] rounded-3xl border ${config.color} p-5 backdrop-blur-md flex flex-col`}>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-slate-200 tracking-tight">{config.title}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${config.badge}`}>
                        {tasks.filter(t => t.status === statusKey).length}
                    </span>
                </div>

                <Droppable droppableId={statusKey}>
                {(provided) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-3 flex-1">
                    {tasks.filter((task) => task.status === statusKey).map((task, index) => {
                        const isLate = checkIsLate(task.dataLimite ? new Date(task.dataLimite) : null, task.status === 'DONE');
                        const subtasksDone = task.subtasks.filter(s => s.concluida).length;
                        const subtasksTotal = task.subtasks.length;

                        return (
                            <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                            {(provided, snapshot) => (
                                <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{ ...provided.draggableProps.style }}
                                onClick={() => setEditingTask(task)}
                                className={`
                                    relative p-4 rounded-2xl border transition-all duration-200 group cursor-pointer
                                    ${snapshot.isDragging 
                                    ? "bg-indigo-900/90 border-indigo-500 shadow-2xl rotate-2 scale-105 z-50" 
                                    : "bg-slate-800/60 border-white/5 hover:border-white/10 hover:bg-slate-800"
                                    }
                                    ${isLate ? "border-red-500/30 bg-red-950/10" : ""}
                                `}
                                >
                                <div className="flex justify-between items-start mb-2 gap-3">
                                    <div className="group-hover:text-indigo-400 transition-colors flex-1 flex items-start justify-between">
                                        <span className={`font-medium text-sm leading-relaxed ${task.status === 'DONE' ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                                            {task.titulo}
                                        </span>
                                        <Edit2 size={14} className="opacity-0 group-hover:opacity-50 text-slate-400 shrink-0 ml-2" />
                                    </div>
                                    <div className={`w-2 h-2 rounded-full shrink-0 mt-1.5 shadow-[0_0_8px_rgba(0,0,0,0.5)] ${priorityConfig[task.priority].color}`} title={`Prioridade ${task.priority}`} />
                                </div>
                                
                                <div className="flex flex-wrap gap-2 mt-3 items-center justify-between">
                                    <div className="flex gap-2 items-center">
                                        {task.category && (
                                            <span className={`text-[10px] px-2 py-0.5 rounded-md border flex items-center gap-1 font-medium ${task.category.cor} bg-opacity-10 border-opacity-20 text-slate-300`}>
                                                <Tag size={10} /> {task.category.nome}
                                            </span>
                                        )}
                                        {subtasksTotal > 0 && (
                                            <span className={`text-[10px] px-2 py-0.5 rounded-md border flex items-center gap-1 font-medium border-white/10 text-slate-400 bg-white/5`}>
                                                <ListChecks size={10} /> {subtasksDone}/{subtasksTotal}
                                            </span>
                                        )}
                                        {task.dataLimite && (
                                            <span className={`text-[10px] px-2 py-0.5 rounded-md border flex items-center gap-1 font-medium ${isLate ? "border-red-500/30 text-red-400 bg-red-500/10" : "border-white/10 text-slate-400 bg-white/5"}`}>
                                                <Calendar size={10} /> {formatSmartDate(new Date(task.dataLimite))}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        
                                        {task.status !== "TODO" && (
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); moveTask(task.id, task.status === 'DONE' ? 'IN_PROGRESS' : 'TODO'); }}
                                                className="p-1.5 hover:bg-white/10 rounded text-slate-400 hover:text-white"
                                                title="Voltar etapa"
                                            >
                                                <ChevronLeft size={16} />
                                            </button>
                                        )}

                                        {task.status === "TODO" && (
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); moveTask(task.id, 'IN_PROGRESS'); }}
                                                className="p-1.5 hover:bg-blue-500/20 rounded text-slate-400 hover:text-blue-400"
                                                title="Iniciar (Em Progresso)"
                                            >
                                                <ChevronRight size={16} />
                                            </button>
                                        )}

                                        {task.status !== "DONE" && (
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); moveTask(task.id, 'DONE'); }}
                                                className="p-1.5 hover:bg-green-500/20 rounded text-slate-400 hover:text-green-400" 
                                                title="Concluir agora"
                                            >
                                                <CheckCircle2 size={16} />
                                            </button>
                                        )}

                                        <button 
                                            onClick={(e) => handleDelete(e, task.id)}
                                            className="p-1.5 hover:bg-red-500/20 rounded text-slate-400 hover:text-red-400" 
                                            title="Excluir"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                                </li>
                            )}
                            </Draggable>
                        );
                    })}
                    {provided.placeholder}
                    </ul>
                )}
                </Droppable>
            </div>
            ))}
        </div>
        </DragDropContext>

        {editingTask && (
            <EditTaskModal 
                task={editingTask} 
                categories={categories}
                onClose={() => setEditingTask(null)} 
            />
        )}
    </>
  );
}