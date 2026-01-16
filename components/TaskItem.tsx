"use client";

import { Task, Category } from "@prisma/client"; 
import { deleteTask, toggleTask } from "@/app/actions/tasks";
import Link from "next/link";
import { Trash2, Calendar, CheckCircle2, Circle, Flag, Tag } from "lucide-react";

type TaskWithCategory = Task & {
  category: Category | null;
};

interface TaskProps {
  task: TaskWithCategory;
}

export function TaskItem({ task }: TaskProps) {
  const priorityConfig = {
    BAIXA: { color: "text-green-400", bg: "bg-green-500/10 border-green-500/20", label: "Baixa" },
    MEDIA: { color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20", label: "Média" },
    ALTA: { color: "text-red-400", bg: "bg-red-500/10 border-red-500/20", label: "Alta" },
  };

  const pConfig = priorityConfig[task.priority as keyof typeof priorityConfig] || priorityConfig.BAIXA;

  return (
    <li className={`
      group relative flex justify-between items-start gap-4 p-5 rounded-2xl transition-all duration-300
      backdrop-blur-md border shadow-lg hover:-translate-y-1
      ${task.concluida
        ? "bg-slate-900/30 border-slate-800/50 opacity-60"
        : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
      }
    `}>

      <div className="flex items-start gap-4 flex-1">
        <button
          onClick={() => toggleTask(task.id, task.concluida)}
          className={`mt-1 transition-colors ${task.concluida ? "text-green-500" : "text-slate-400 hover:text-blue-400"}`}
        >
          {task.concluida ? <CheckCircle2 size={24} /> : <Circle size={24} />}
        </button>

        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-wrap items-center gap-3">
            <Link href={`/editar/${task.id}`} className="hover:text-blue-300 transition-colors mr-auto">
              <span className={`text-lg font-medium ${task.concluida ? "line-through decoration-slate-500" : "text-slate-100"}`}>
                {task.titulo}
              </span>
            </Link>

            <span className={`flex items-center gap-1.5 text-[10px] uppercase tracking-wider px-2 py-1 rounded-md border font-bold ${pConfig.color} ${pConfig.bg}`}>
              <Flag size={10} fill="currentColor" />
              {pConfig.label}
            </span>

            {task.category && (
              <span className={`
                  flex items-center gap-1.5 text-[10px] uppercase tracking-wider px-2 py-1 rounded-md border 
                  bg-opacity-10 border-opacity-20 text-white font-bold
                  ${task.category.cor || 'bg-slate-500 border-slate-500'} 
                  `}>
                
                <div className={`w-1.5 h-1.5 rounded-full ${task.category.cor || 'bg-slate-400'}`} />
                <span className="opacity-90">{task.category.nome}</span>
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            {task.descricao && (
              <p className="text-sm text-slate-400 font-light">{task.descricao}</p>
            )}

            {task.dataLimite && (
              <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                <Calendar size={12} />
                <span>{new Date(task.dataLimite).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={() => deleteTask(task.id)}
        className="text-slate-600 hover:text-red-400 p-2 rounded-lg hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
      >
        <Trash2 size={18} />
      </button>
    </li>
  );
}