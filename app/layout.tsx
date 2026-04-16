import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs"; 
import { ptBR } from "@clerk/localizations"; 
import { Toaster } from "sonner";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"


export const metadata = {
  title: "TaskFLOW - Kanban Task Manager para Produtividade Real | Grátis",
  description: "Gerencie suas tarefas com um Kanban intuitivo, drag-and-drop, subtasks e prioridades. TaskFLOW é gratuito, open-source e construído para máxima produtividade.",
  keywords: "kanban, gerenciador de tarefas, produtividade, task manager, open source",
  openGraph: {
    title: "TaskFLOW - Task Manager Kanban",
    description: "Visualize seu fluxo de trabalho com um Kanban moderno, seguro e rápido.",
    image: "https://taskflow.app/og-image.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="pt-BR">
        <body className="antialiased bg-slate-950 text-slate-200">
          {children}
          <Toaster position="top-right" richColors theme="dark" />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}