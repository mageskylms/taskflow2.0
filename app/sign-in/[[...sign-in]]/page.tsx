import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes"; 
import { Footer } from "@/components/Footer";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 relative overflow-hidden selection:bg-indigo-500/30">
      
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="z-10 text-center mb-8 max-w-md px-6 animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
          TASK <span className="text-indigo-400">FLOW</span> 2.0
        </h1>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-slate-300 text-sm leading-relaxed">
              👋 Olá! Para garantir que suas tarefas sejam <strong className="text-white">privadas e seguras</strong> (só você vê), precisamos que faça um login rápido.
            </p>
        </div>
      </div>

      <div className="z-10 animate-in fade-in zoom-in duration-500">
        <SignIn 
          appearance={{
            baseTheme: dark, 
            elements: {
              
              card: "bg-slate-900/50 border border-white/10 backdrop-blur-xl shadow-2xl",
              
              
              formButtonPrimary: "bg-indigo-600 hover:bg-indigo-500 transition-all text-white shadow-lg shadow-indigo-500/20",
              
              
              headerTitle: "text-white",
              headerSubtitle: "text-slate-400",
              socialButtonsBlockButton: "bg-white/5 border-white/10 hover:bg-white/10 text-white",
              formFieldInput: "bg-black/20 border-white/10 text-white focus:border-indigo-500",
              footerActionLink: "text-indigo-400 hover:text-indigo-300"
            }
          }}
        />
      </div>

          <Footer/> 

    </div>
  );
}