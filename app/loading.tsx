//Esqueleto que aparece durante o carregamento da página de tarefas

import { TaskSkeleton } from "@/components/TaskSkeleton";

export default function Loading() {
  return (
    <main className="max-w-2xl mx-auto p-10 font-sans min-h-screen bg-gray-900 text-white">
      
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-400">Minhas Tarefas</h1>

      <div className="mb-8 bg-gray-800 p-4 rounded-lg border border-gray-700 h-32 animate-pulse" />

      <div className="flex gap-2 mb-6 animate-pulse">
        <div className="h-8 w-20 bg-gray-800 rounded-full" />
        <div className="h-8 w-24 bg-gray-800 rounded-full" />
        <div className="h-8 w-24 bg-gray-800 rounded-full" />
      </div>

      <ul className="space-y-3">
        <TaskSkeleton />
        <TaskSkeleton />
        <TaskSkeleton />
        <TaskSkeleton />
        <TaskSkeleton />
      </ul>
    </main>
  );
}