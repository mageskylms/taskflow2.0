"use client";

interface HeaderProps {
  userName?: string | null;
}

export function Header({ userName }: HeaderProps) {
  return (
    <div className="mb-8 space-y-2">
      <h1 className="text-4xl font-extrabold tracking-tight text-white">
        TASK <span className="text-indigo-400">FLOW</span> 2.0
      </h1>
      <p className="text-slate-400">
        {userName 
          ? `Bem-vindo de volta, ${userName}! 👋` 
          : "Seu espaço privado e seguro."}
      </p>
    </div>
  );
}