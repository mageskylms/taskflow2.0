'use client';

import Link from "next/link";
import { Github, LayoutDashboard, CheckCircle2, Zap, Users, TrendingUp, Calendar, Flame, Clock, ArrowRight, Play } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function LandingPage() {
  const { userId } = useAuth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-bold text-white text-xl">TaskFLOW</div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/mageskylms/taskflow2.0"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
            >
              <Github size={18} />
              GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section - Refactored */}
      <section className="relative overflow-hidden pt-20 pb-32 px-6">
        {/* Animated background gradients */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-sm font-medium text-indigo-300 mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            TaskFLOW 2.0 — Open Source & Gratuito
          </div>

          <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-8 bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent leading-tight">
            Veja seu trabalho <br /> como nunca antes
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
            Um Kanban moderno que combina <span className="text-white font-medium">design elegante</span>, <span className="text-white font-medium">drag-and-drop fluido</span> e <span className="text-white font-medium">controle total</span> das suas tarefas.
          </p>

          {/* CTA Buttons - Redesigned */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/sign-up"
              className="group relative px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              Começar Grátis
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* <button className="group px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-bold rounded-xl transition-all">
              <span className="flex items-center gap-2">
                <Play size={18} />
                Ver Demo
              </span>
            </button> */}

            <a
              href="https://github.com/mageskylms/taskflow2.0"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-xl transition-all flex items-center gap-2"
            >
              <Github size={20} />
              GitHub
            </a>
          </div>

          {/* Trust Signals */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-500" />
              <span>Sem cartão de crédito</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-500" />
              <span>100% Open Source</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-500" />
              <span>Seus dados, sua privacidade</span>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase - Visual Demo */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Conheça o Painel
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Uma interface minimalista mas poderosa. Tudo que você precisa, nada que não precisa.
          </p>
        </div>

        {/* Kanban Board Demo */}
        <div className="relative bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-white/10 rounded-3xl p-8 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <StatCard label="Conclusão" value="68%" icon="📊" accent="indigo" />
            <StatCard label="Atrasadas" value="2" icon="🔥" accent="red" />
            <StatCard label="Esta Semana" value="7" icon="📅" accent="blue" />
            <StatCard label="Pendentes" value="14" icon="⏱️" accent="yellow" />
          </div>

          {/* Kanban Columns */}
          <div className="flex flex-col lg:flex-row gap-6 overflow-x-auto pb-4">
            <KanbanColumn title="A Fazer" color="slate" count={5} tasks={[
              { title: "Refatorar API de usuários", priority: "ALTA", category: "Backend" },
              { title: "Atualizar documentação", priority: "MEDIA", category: "Docs" },
            ]} />

            <KanbanColumn title="Em Progresso" color="blue" count={3} tasks={[
              { title: "Implementar autenticação OAuth", priority: "ALTA", category: "Auth" },
              { title: "Otimizar queries do banco", priority: "MEDIA", category: "Backend" },
            ]} />

            <KanbanColumn title="Concluído" color="green" count={12} tasks={[
              { title: "Setup inicial do projeto", priority: "MEDIA", category: "Infra" },
              { title: "Integrar Clerk", priority: "ALTA", category: "Auth" },
            ]} />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Recursos que você vai amar
          </h2>
          <p className="text-xl text-slate-400">
            Construído para velocidade e usabilidade
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<LayoutDashboard className="text-indigo-400" size={28} />}
            title="Kanban Intuitivo"
            description="Arraste e solte suas tarefas entre colunas. Visualize todo o seu trabalho em um só lugar."
            highlight="Drag & Drop Fluido"
          />

          <FeatureCard
            icon={<Zap className="text-yellow-400" size={28} />}
            title="Extremamente Rápido"
            description="Construído com Next.js 15 Server Components. Nenhuma latência, apenas performance."
            highlight="Instant Feedback"
          />

          <FeatureCard
            icon={<CheckCircle2 className="text-green-400" size={28} />}
            title="Subtarefas & Checklist"
            description="Divida tarefas complexas em etapas menores. Acompanhe o progresso de cada uma."
            highlight="Organização Profunda"
          />

          <FeatureCard
            icon={<Flame className="text-red-400" size={28} />}
            title="Prioridades Visuais"
            description="3 níveis de prioridade com indicadores visuais claros. Foque no que importa."
            highlight="Triagem Inteligente"
          />

          <FeatureCard
            icon={<Calendar className="text-blue-400" size={28} />}
            title="Datas Limite e Alertas"
            description="Nunca perca um deadline. Acompanhe tarefas atrasadas em tempo real."
            highlight="Gestão de Prazos"
          />

          <FeatureCard
            icon={<Users className="text-purple-400" size={28} />}
            title="100% Seguro com Clerk"
            description="Autenticação moderna com suporte a OAuth, SMS e mais. Seus dados são seus."
            highlight="Privacidade Total"
          />
        </div>
      </section>

      {/* Why TaskFLOW Section */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Feito por quem entende produtividade
            </h2>
            <p className="text-lg text-slate-300 mb-6 leading-relaxed">
              TaskFLOW não é um clone genérico. É construído com foco em <strong>desenvolvedores</strong> e <strong>entusiastas de produtividade</strong> que entendem que ferramentas devem ser:
            </p>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-indigo-400 mt-1">✓</span>
                <div>
                  <strong className="text-white">Minimalista.</strong> <span className="text-slate-400">Sem bloat, sem complexidade desnecessária.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-400 mt-1">✓</span>
                <div>
                  <strong className="text-white">Transparente.</strong> <span className="text-slate-400">Open source, você vê exatamente o que está usando.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-400 mt-1">✓</span>
                <div>
                  <strong className="text-white">Confiável.</strong> <span className="text-slate-400">Sem dependências desnecessárias, código limpo e bem testado.</span>
                </div>
              </li>
            </ul>

            <div className="mt-8">
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-all hover:scale-105 active:scale-95"
              >
                Comece Agora
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
              <p className="text-indigo-400 font-bold mb-2">⚡ Performance</p>
              <p className="text-slate-400 text-sm">Carregamento instantâneo. Sem delays, sem esperas.</p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
              <p className="text-indigo-400 font-bold mb-2">🔒 Privacidade</p>
              <p className="text-slate-400 text-sm">Nenhum rastreamento. Nenhum dado vendido. Seu trabalho é seu.</p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
              <p className="text-indigo-400 font-bold mb-2">🎨 Design Moderno</p>
              <p className="text-slate-400 text-sm">Interface limpa, intuitiva e agradável ao olhar.</p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
              <p className="text-indigo-400 font-bold mb-2">📖 Open Source</p>
              <p className="text-slate-400 text-sm">Código público. Você controla tudo, sempre.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold text-indigo-400 mb-2">100%</p>
            <p className="text-slate-400">Open Source & Gratuito</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold text-green-400 mb-2">0$</p>
            <p className="text-slate-400">Sem taxas escondidas</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">∞</p>
            <p className="text-slate-400">Escalabilidade infinita</p>
          </div>
        </div>
      </section>

      {/* CTA Section - Final */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          Pronto para revolucionar sua produtividade?
        </h2>
        <p className="text-xl text-slate-400 mb-10">
          Sem cartão de crédito. Sem compromisso. Comece em 30 segundos.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/sign-up"
            className="group px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg rounded-xl transition-all shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 active:scale-95"
          >
            Criar Conta Grátis
            <ArrowRight size={20} className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href="https://github.com/mageskylms/taskflow2.0"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-lg rounded-xl transition-all"
          >
            Ver no GitHub
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-white mb-4">TaskFLOW</h3>
              <p className="text-slate-400 text-sm">Um gerenciador de tarefas para quem leva a produtividade a sério.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4 text-sm">Links</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Dashboard</a></li>
                {/* <li><a href="#" className="hover:text-white transition-colors">Documentação</a></li> */}
                <li><a href="https://github.com/mageskylms/taskflow2.0" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
              </ul>
            </div>
            {/* <div>
              <h4 className="font-bold text-white mb-4 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termos</a></li>
              </ul>
            </div> */}
            <div>
              <h4 className="font-bold text-white mb-4 text-sm">Social</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                {/* <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a></li> */}
                <li><a href="https://github.com/mageskylms/taskflow2.0" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500">
            <p>© {new Date().getFullYear()} TaskFLOW. Feito com ❤️ por MSKY.</p>
            <p>Built with Next.js 15 • Hosted on Vercel</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Component: Stat Card
function StatCard({ label, value, icon, accent }: { label: string; value: string; icon: string; accent: string }) {
  const accentClasses = {
    indigo: "bg-indigo-500/10 border-indigo-500/20",
    red: "bg-red-500/10 border-red-500/20",
    blue: "bg-blue-500/10 border-blue-500/20",
    yellow: "bg-yellow-500/10 border-yellow-500/20",
  };

  return (
    <div className={`p-4 rounded-xl border ${accentClasses[accent as keyof typeof accentClasses]} bg-slate-800/30`}>
      <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-2">{label}</p>
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold text-white">{value}</p>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  );
}

// Component: Kanban Column
function KanbanColumn({ title, color, count, tasks }: { title: string; color: string; count: number; tasks: any[] }) {
  const colorClasses = {
    slate: "border-slate-500/20 bg-slate-500/5",
    blue: "border-blue-500/20 bg-blue-500/5",
    green: "border-green-500/20 bg-green-500/5",
  };

  const badgeClasses = {
    slate: "bg-slate-500/20 text-slate-400",
    blue: "bg-blue-500/20 text-blue-400",
    green: "bg-green-500/20 text-green-400",
  };

  return (
    <div className={`flex-1 min-w-[300px] rounded-2xl border p-5 ${colorClasses[color as keyof typeof colorClasses]}`}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-slate-200 text-sm">{title}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${badgeClasses[color as keyof typeof badgeClasses]}`}>
          {count}
        </span>
      </div>

      <div className="space-y-3">
        {tasks.map((task, i) => (
          <div
            key={i}
            className="p-3 bg-slate-800/60 border border-white/5 rounded-xl hover:bg-slate-800 transition-colors cursor-move"
          >
            <p className="text-sm font-medium text-slate-200 mb-2">{task.title}</p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[10px] px-2 py-1 rounded border ${task.priority === "ALTA"
                  ? "bg-red-500/10 border-red-500/20 text-red-400"
                  : "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
                }`}>
                {task.priority === "ALTA" ? "🔴" : "🟡"} {task.priority}
              </span>
              <span className="text-[10px] px-2 py-1 rounded bg-white/5 border border-white/10 text-slate-400">
                {task.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Component: Feature Card
function FeatureCard({ icon, title, description, highlight }: { icon: React.ReactNode; title: string; description: string; highlight: string }) {
  return (
    <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 backdrop-blur-sm transition-all hover:bg-white/5 group cursor-pointer">
      <div className="mb-4 transform group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-slate-400 leading-relaxed mb-4">{description}</p>
      <span className="inline-block px-3 py-1 text-xs font-bold text-indigo-400 bg-indigo-500/10 rounded-full">
        {highlight}
      </span>
    </div>
  );
}