import { format, isToday, isTomorrow, isYesterday } from "date-fns";
import { ptBR } from "date-fns/locale";

// Função auxiliar para corrigir o Fuso Horário (UTC para Local visualmente)
function getLocalDate(date: Date) {
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

export function formatSmartDate(date: Date) {

  const localDate = getLocalDate(date);

  if (isToday(localDate)) return "Hoje";
  if (isTomorrow(localDate)) return "Amanhã";
  if (isYesterday(localDate)) return "Ontem";
  
  const now = new Date();
  const daysDiff = Math.floor((localDate.getTime() - now.getTime()) / (1000 * 3600 * 24));
  
  if (daysDiff > 0 && daysDiff < 7) {
    return format(localDate, "EEEE", { locale: ptBR });
  }

  return format(localDate, "dd MMM", { locale: ptBR });
}

export function checkIsLate(date: Date | null, isDone: boolean) {
    if (!date || isDone) return false;
    const localDate = getLocalDate(date);
    const today = new Date();
    today.setHours(0,0,0,0);
    return localDate < today;
}