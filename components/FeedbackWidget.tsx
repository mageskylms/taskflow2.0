"use client";

import { useState } from "react";
import { MessageSquarePlus, X, Send, Loader2 } from "lucide-react";
import { sendFeedback } from "@/app/actions/feedback";
import { toast } from "sonner";

export function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const [tipo, setTipo] = useState("SUGESTAO");
  const [nome, setNome] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function handleSend() {
    if (!mensagem.trim()) {
      toast.warning("Escreva uma mensagem primeiro!");
      return;
    }

    setIsSending(true);

    try {
      const formData = new FormData();
      formData.append("tipo", tipo);
      formData.append("nome", nome);
      formData.append("mensagem", mensagem);

      await sendFeedback(formData);

      toast.success("Feedback enviado! Valeu! 🚀");
      
      setMensagem("");
      setTipo("SUGESTAO");
      setIsOpen(false);
      
    } catch (error) {
      console.error(error);
      toast.error("Erro ao enviar.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-4">
      
      {isOpen && (
        <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-2xl w-80 animate-in slide-in-from-bottom-5 duration-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-bold text-sm">📢 Enviar Sugestão</h3>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-slate-400 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex flex-col gap-3">
            
            <select 
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="bg-black/30 border border-white/10 text-slate-300 text-sm rounded-lg p-2 outline-none focus:border-indigo-500"
            >
              <option value="SUGESTAO">💡 Sugestão / Ideia</option>
              <option value="BUG">🐛 Achei um Bug</option>
              <option value="OUTRO">💬 Outro</option>
            </select>

            <input 
              type="text" 
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome (Opcional)" 
              className="bg-black/30 border border-white/10 text-white text-sm rounded-lg p-3 outline-none focus:border-indigo-500"
            />

            <textarea
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              placeholder="Conta pra gente o que você achou..."
              className="bg-black/30 border border-white/10 text-white text-sm rounded-lg p-3 outline-none focus:border-indigo-500 h-24 resize-none"
            />

            <button 
              onClick={handleSend}
              disabled={isSending}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isSending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              Enviar
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-4 py-3 rounded-full font-bold shadow-lg transition-all hover:scale-105 active:scale-95
          ${isOpen 
            ? "bg-slate-800 text-slate-300 border border-white/10" 
            : "bg-indigo-600 text-white shadow-indigo-500/20"
          }
        `}
      >
        {isOpen ? <X size={20} /> : <MessageSquarePlus size={20} />}
        {!isOpen && <span className="text-sm">Feedback</span>}
      </button>

    </div>
  );
}