import { prisma } from "@/lib/prisma";
import { KanbanBoard } from "@/components/KanbanBoard";
import { TaskFilter } from "@/components/TaskFilter";
import { CategoryFilter } from "@/components/CategoryFilter";
import { NewTaskModal } from "@/components/NewTaskModal";
import { DashboardStats } from "@/components/DashboardStats";
import { Header } from "@/components/Header";
import { auth, currentUser } from "@clerk/nextjs/server";
import { UserButton, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { addTask } from "@/app/actions/tasks";
import Link from "next/link";
import { Settings } from "lucide-react";
import { FeedbackWidget } from "@/components/FeedbackWidget";
import { Footer } from "@/components/Footer";
import { dark } from "@clerk/themes";

export default async function Home({ searchParams }: { searchParams: Promise<{ q?: string; cat?: string }> }) {
  const { userId } = await auth();
  const user = await currentUser(); //forma de pegar dados do usuário logado com Clerk

  if (!userId) return null;

  const params = await searchParams;
  const query = params.q || "";
  const catFilter = params.cat ? parseInt(params.cat) : undefined;


  // Busca Tarefas
  const tasks = await prisma.task.findMany({
    where: {
      userId: userId,
      titulo: { contains: query, mode: 'insensitive' },
      categoryId: catFilter,
    },
    orderBy: [{ priority: 'desc' }, { dataLimite: 'asc' }],
    include: {
      category: true,
      subtasks: { orderBy: { id: 'asc' } }
    },
  });

  // Busca Categorias
  const categories = await prisma.category.findMany({
    where: { userId: userId },
    orderBy: { nome: 'asc' }
  });

  return (
    <main className="max-w-7xl mx-auto p-4 md:p-8 font-sans min-h-screen pb-24 relative">

      <div className="absolute top-4 right-4 md:top-8 md:right-8 z-10">
        <ClerkLoading>
          <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
        </ClerkLoading>

        <ClerkLoaded>
          <UserButton
            afterSignOutUrl="/sign-in"
            appearance={{
              baseTheme: dark,
              elements: {
                // O Cartão flutuante (Popover)
                userButtonPopoverCard:
                  "bg-slate-900/95 border border-white/10 backdrop-blur-xl shadow-2xl",

                // O texto do nome do usuário
                userButtonPopoverMainIdentifier:
                  "text-white font-bold",

                // O texto do email
                userButtonPopoverSecondaryIdentifier:
                  "text-slate-400",

                // Os botões de ação (Gerenciar conta, Sair)
                userButtonPopoverActionButton:
                  "hover:bg-white/10 text-slate-200 hover:text-white transition-colors",

                // Ícones dentro dos botões (engrenagem, porta de saída)
                userButtonPopoverActionButtonIcon:
                  "text-indigo-400",

                // O rodapé (Secured by Clerk) - deixamos discreto
                userButtonPopoverFooter:
                  "hidden" // Ou "bg-transparent border-t border-white/5" se quiser manter
              }
            }}
          />
        </ClerkLoaded>
      </div>

      <Header userName={user?.firstName} />

      <DashboardStats tasks={tasks} />

      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-6">
        <div className="flex items-center gap-2 w-full md:w-auto overflow-hidden">
          <div className="flex-1 overflow-x-auto scrollbar-hide">
            <CategoryFilter categories={categories} />
          </div>
          <Link href="/categorias" className="p-2 mb-6 bg-white/5 border border-white/10 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
            <Settings size={20} />
          </Link>
        </div>
        <div className="w-full md:w-64">
          <TaskFilter />
        </div>
      </div>

      <KanbanBoard initialTasks={tasks} categories={categories} />

      <NewTaskModal categories={categories} addTaskAction={addTask} />

      <FeedbackWidget />

      <Footer />

    </main>
  );
}