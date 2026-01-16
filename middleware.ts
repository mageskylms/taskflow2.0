import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

//rotas que não precisam de autenticação
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware(async (auth, req) => {
  //rotas protegidas por autenticação
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Padrão do Next.js para ignorar arquivos estáticos
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Sempre roda para API
    '/(api|trpc)(.*)',
  ],
};