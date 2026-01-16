import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs"; 
import { ptBR } from "@clerk/localizations"; 
import { Toaster } from "sonner";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: "TASKFLOW 2.0 - Gerenciador de Tarefas",
  description: "Gerenciador de tarefas seguro e privado.",
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