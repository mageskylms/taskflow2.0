import { Heart, Globe, ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const appVersion = "v1.0.4";

  return (
    <footer className="mt-20 border-t border-white/5 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">

        <div className="flex items-center gap-1.5 text-sm text-slate-500">
          <span>&copy; {currentYear} TASKFLOW 2.0 | Feito por</span>
          
          <span className="text-slate-300 font-medium">Lucas Magesky |</span>
          <span>{appVersion}</span>
        </div>

        <div className="flex items-center gap-6 text-sm">

          <a
            href="https://lucas.msky.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-colors group"
          >
            <Globe size={14} />
            <span>Portfólio</span>
            <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>

          <a
            href="https://msky.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
          >
            <div className="w-2 h-2 rounded-full bg-indigo-500 group-hover:shadow-[0_0_8px_rgba(99,102,241,0.8)] transition-all" />
            <span>MSky</span>
          </a>

        </div>

      </div>
    </footer>
  );
}