// src/app/admin/page.tsx

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import { ArrowLeft, Bug, Lightbulb, MessageSquare } from "lucide-react";

export default async function AdminFeedbackPage() {
  const user = await currentUser();

  const ADMIN_EMAILS = ['mageskylms@gmail.com']; 
  
  const userEmail = user?.emailAddresses[0]?.emailAddress;

  if (!user || !userEmail || !ADMIN_EMAILS.includes(userEmail)) {
    redirect("/"); 
  }

  const feedbacks = await prisma.feedback.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="max-w-5xl mx-auto p-8 font-sans min-h-screen">
      
      <div className="flex items-center gap-4 mb-8">
        <Link href="/" className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-3xl font-bold text-white">
          Painel de Feedback <span className="text-indigo-400">Admin</span>
        </h1>
      </div>

      <div className="grid gap-4">
        {feedbacks.length === 0 && (
            <p className="text-slate-500 text-center py-10">Nenhum feedback recebido ainda.</p>
        )}

        {feedbacks.map((item) => (
          <div key={item.id} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col md:flex-row gap-4 items-start justify-between">
            
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3">
                {item.tipo === 'BUG' && <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-red-500/20"><Bug size={12}/> Bug</span>}
                {item.tipo === 'SUGESTAO' && <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-yellow-500/20"><Lightbulb size={12}/> Ideia</span>}
                {item.tipo === 'OUTRO' && <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-blue-500/20"><MessageSquare size={12}/> Outro</span>}
                
                <span className="text-xs text-slate-500">
                  {format(new Date(item.createdAt), "dd 'de' MMMM 'às' HH:mm", { locale: ptBR })}
                </span>
              </div>
              
              <p className="text-slate-200 text-lg leading-relaxed">
                "{item.mensagem}"
              </p>
              
              <div className="flex gap-4 text-xs font-mono mt-2">
                 <span className="text-indigo-400 font-bold">
                    👤 {item.nome || "Anônimo"}
                 </span>
                 
                 <span className="text-slate-600">
                    ID: {item.userId || "N/A"}
                 </span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </main>
  );
}