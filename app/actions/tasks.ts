"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Priority, Status } from "@prisma/client";
import { auth } from "@clerk/nextjs/server"; 
import { redirect } from "next/navigation";

// Helper para garantir que o usuário está logado
async function getUserId() {
  const { userId } = await auth();
  if (!userId) throw new Error("Não autorizado");
  return userId;
}

// tarefas
export async function addTask(formData: FormData) { 
  const userId = await getUserId();
  
  const titulo = formData.get("titulo") as string;
  const descricao = formData.get("descricao") as string;
  const dataRaw = formData.get("dataLimite") as string;
  const priority = formData.get("priority") as Priority;
  const categoryId = formData.get("categoryId") as string;

  if (!titulo) return;

  await prisma.task.create({
    data: {
      titulo,
      descricao,
      dataLimite: dataRaw ? new Date(dataRaw) : null,
      priority: priority || "BAIXA",
      status: "TODO",
      userId, 
      categoryId: categoryId ? parseInt(categoryId) : null,
    },
  });
  revalidatePath("/");
}

export async function updateTask(id: number, formData: FormData) {
  const userId = await getUserId(); 
  
  await prisma.task.update({
    where: { id, userId }, 
    data: {
      titulo: formData.get("titulo") as string,
      descricao: formData.get("descricao") as string,
      dataLimite: formData.get("dataLimite") ? new Date(formData.get("dataLimite") as string) : null,
      priority: formData.get("priority") as Priority,
      categoryId: formData.get("categoryId") ? parseInt(formData.get("categoryId") as string) : null,
    },
  });
  revalidatePath("/");
}

export async function updateTaskStatus(id: number, status: Status) {
  const userId = await getUserId();
  await prisma.task.update({
    where: { id, userId }, 
    data: { status },
  });
  revalidatePath("/");
}

export async function deleteTask(id: number) {
  const userId = await getUserId();
  await prisma.task.delete({
    where: { id, userId }, 
  });
  revalidatePath("/");
}

export async function toggleTask(taskId: string, currentStatus: string) {
  const { userId } = await auth();
  if (!userId) return;

  const newStatus = currentStatus === "DONE" ? "TODO" : "DONE";

  await prisma.task.update({
    where: { 
      id: parseInt(taskId),
      userId: userId, 
    },
    data: { status: newStatus },
  });

  revalidatePath("/");
}

// subtarefas

export async function createSubtask(taskId: number, titulo: string) {
  const userId = await getUserId();
  
  // Verifica se a tarefa pai pertence ao usuário antes de criar subtarefa
  const task = await prisma.task.findUnique({ where: { id: taskId, userId } });
  if (!task) throw new Error("Tarefa não encontrada ou sem permissão");

  await prisma.subtask.create({
    data: { taskId, titulo }
  });
  revalidatePath("/");
}

export async function toggleSubtask(id: number, concluidaAtual: boolean) {
    await auth(); // valida se o usuário está autenticado
  await prisma.subtask.update({
    where: { id },
    data: { concluida: !concluidaAtual }
  });
  revalidatePath("/");
}

export async function deleteSubtask(id: number) {
  await auth();
  await prisma.subtask.delete({ where: { id } });
  revalidatePath("/");
}

export async function createCategory(formData: FormData) {
  const userId = await getUserId();
  await prisma.category.create({
    data: {
      nome: formData.get("nome") as string,
      cor: formData.get("cor") as string,
      userId 
    },
  });
  revalidatePath("/categorias");
  revalidatePath("/");
}

export async function updateCategory(id: number, formData: FormData) {
  const userId = await getUserId();
  await prisma.category.update({
    where: { id, userId },
    data: {
      nome: formData.get("nome") as string,
      cor: formData.get("cor") as string,
    }
  });
  revalidatePath("/categorias");
  revalidatePath("/");
}

export async function deleteCategory(id: number) {
  const userId = await getUserId();
  await prisma.task.updateMany({
    where: { categoryId: id, userId },
    data: { categoryId: null }
  });
  await prisma.category.delete({ where: { id, userId } });
  revalidatePath("/categorias");
  revalidatePath("/");
}