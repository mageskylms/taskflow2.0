"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"; 

export async function sendFeedback(formData: FormData) {
  const { userId } = await auth();
  
  const mensagem = formData.get("mensagem") as string;
  const tipo = formData.get("tipo") as string;
  const nome = formData.get("nome") as string;

  if (!mensagem) return;

  await prisma.feedback.create({
    data: {
      mensagem,
      tipo,
      userId: userId || null, 
      nome: nome || null, 
    }
  });
}