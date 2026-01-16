"use client";

import { Task, Category } from "@prisma/client";
import { AlertCircle, CalendarDays, CheckCircle2, Clock, Flame } from "lucide-react";
import { isBefore, isAfter, addDays, startOfDay } from "date-fns"; 

type TaskWithCategory = Task & { category: Category | null };

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  textColor?: string;
}

function StatCard({ label, value, icon, color, textColor = "text-white" }: StatCardProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between backdrop-blur-md hover:bg-white/10 transition-colors">
      <div>
        <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">
          {label}
        </p>
        <p className={`text-3xl font-bold ${textColor}`}>{value}</p>
      </div>
      <div className={`p-3 rounded-xl bg-white/5 ${color}`}>
        {icon}
      </div>
    </div>
  );
}

interface DashboardStatsProps {
  tasks: TaskWithCategory[];
}

export function DashboardStats({ tasks }: DashboardStatsProps) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "DONE").length;
  const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  const hoje = startOfDay(new Date());

  // Atrasadoas
  const overdueTasks = tasks.filter((t) => 
    t.status !== "DONE" && 
    t.dataLimite && 
    isBefore(new Date(t.dataLimite), hoje)
  ).length;

  // Para a Semana
  const nextWeek = addDays(hoje, 7);
  const upcomingTasks = tasks.filter((t) => 
    t.status !== "DONE" && 
    t.dataLimite && 
    (isAfter(new Date(t.dataLimite), hoje) || t.dataLimite.getTime() === hoje.getTime()) &&
    isBefore(new Date(t.dataLimite), nextWeek)
  ).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between backdrop-blur-md hover:bg-white/10 transition-colors">
        <div>
          <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Conclusão</p>
          <p className="text-3xl font-bold text-white">{progress}%</p>
        </div>
        <div className="relative w-12 h-12">
           <svg className="w-full h-full" viewBox="0 0 36 36">
            <path className="text-slate-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4"/>
            <path className={`transition-all duration-1000 ease-out ${progress === 100 ? "text-green-500" : "text-indigo-500"}`} strokeDasharray={`${progress}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4"/>
          </svg>
        </div>
      </div>

      <StatCard 
        label="Atrasadas" 
        value={overdueTasks} 
        icon={<Flame size={24} />} 
        color={overdueTasks > 0 ? "text-red-500 bg-red-500/10" : "text-slate-500"}
        textColor={overdueTasks > 0 ? "text-red-400" : "text-white"}
      />

      <StatCard 
        label="Para a Semana" 
        value={upcomingTasks} 
        icon={<CalendarDays size={24} />} 
        color="text-blue-400"
      />

      <StatCard 
        label="Total Pendente" 
        value={tasks.filter(t => t.status !== "DONE").length} 
        icon={<Clock size={24} />} 
        color="text-yellow-400"
      />

    </div>
  );
}