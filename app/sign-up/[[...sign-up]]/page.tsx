import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Footer } from "@/components/Footer";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 relative overflow-hidden">
      
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="z-10 text-center mb-8 max-w-md px-6">
        <h1 className="text-3xl font-extrabold text-white mb-2">
          Crie sua conta
        </h1>
        <p className="text-slate-400 text-sm">
          Comece a organizar sua vida profissional hoje mesmo. É grátis.
        </p>
      </div>

      <div className="z-10">
        <SignUp 
          appearance={{
            baseTheme: dark,
            elements: {
              card: "bg-slate-900/50 border border-white/10 backdrop-blur-xl shadow-2xl",
              formButtonPrimary: "bg-indigo-600 hover:bg-indigo-500 text-white",
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