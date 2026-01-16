# 🚀 TaskFlow v2.0 (by MSKY)

![TaskFlow Cover](https://via.placeholder.com/1200x400.png?text=TaskFlow+Cover+Image)
*(Dica: Substitua esse link acima por um print bem bonito da tela inicial do seu app)*

> **Organize sua vida com estilo.** Um gerenciador de tarefas Kanban moderno, privado e minimalista.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## 🌌 Sobre o Projeto

O **TaskFlow** nasceu da necessidade de ter uma ferramenta de organização que fosse, ao mesmo tempo, simples de usar e visualmente agradável. Diferente dos apps tradicionais "brancos e sem graça", o TaskFlow adota uma estética **Dark Mode & Glassmorphism**, tornando a experiência de uso mais imersiva.

Este projeto é o **pioneiro** do ecossistema **MSKY**, um hub de ferramentas digitais focado em produtividade e utilitários modernos.

### ✨ Principais Funcionalidades

- **Kanban Visual:** Separação clara entre tarefas pendentes e concluídas.
- **Categorias Inteligentes:** Sistema de etiquetas coloridas para organizar por área (Trabalho, Pessoal, Estudo).
- **100% Responsivo:** Funciona perfeitamente no Desktop e no Celular (Mobile First).
- **Feedback Integrado:** Widget flutuante para envio de sugestões e bugs direto para o Admin.
- **Painel Administrativo:** Área restrita para gestão de feedbacks dos usuários.
- **Privacidade Total:** Cada usuário vê apenas as suas próprias tarefas (Autenticação via Clerk).
- **Design Premium:** Interface moderna com efeitos de vidro (blur), transições suaves e modo escuro nativo.

---

## 🛠️ Tecnologias Utilizadas

Este projeto utiliza o que há de mais moderno no ecossistema React/Next.js:

- **Frontend:** Next.js 16 (App Router), Tailwind CSS, Lucide React (Ícones).
- **Backend:** Server Actions (Zero API routes), Prisma ORM.
- **Banco de Dados:** PostgreSQL (Hospedado na Vercel/Neon).
- **Autenticação:** Clerk (Middleware seguro).
- **Monitoramento:** Vercel Analytics.
- **Deploy:** Vercel (CI/CD automático).

---

## 🚀 Como Rodar Localmente

Siga os passos abaixo para ter o TaskFlow rodando na sua máquina:

### 1. Clone o repositório
```bash
git clone [https://github.com/SEU_USUARIO/taskflow.git](https://github.com/SEU_USUARIO/taskflow.git)
cd taskflow
2. Instale as dependências
Bash

npm install
3. Configure as Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto e adicione as chaves necessárias (você precisará criar um projeto no Clerk e um banco Postgres):

Snippet de código

# Conexão com o Banco de Dados (Ex: Vercel Postgres, Neon, Supabase)
POSTGRES_PRISMA_URL="postgresql://usuario:senha@host:5432/db?pgbouncer=true"
POSTGRES_URL_NON_POOLING="postgresql://usuario:senha@host:5432/db"

# Chaves do Clerk (Autenticação)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# URLs do Clerk
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
4. Sincronize o Banco de Dados
Bash

npx prisma generate
npx prisma db push
5. Rode o projeto
Bash

npm run dev
Acesse http://localhost:3000 e divirta-se! 🎉

📂 Estrutura de Pastas
src/
├── app/              # Páginas e Rotas (App Router)
│   ├── actions/      # Server Actions (Backend functions)
│   ├── admin/        # Página secreta de admin
│   ├── api/          # Webhooks (se houver)
│   └── page.tsx      # Dashboard Principal
├── components/       # Componentes Reutilizáveis (Cards, Modais, Footer)
├── lib/              # Configurações (Prisma Client, Utils)
└── ...
🤝 Contribuindo
Feedbacks e pull requests são bem-vindos! Se você encontrou um bug ou tem uma ideia de funcionalidade:

Abra uma Issue aqui no GitHub.

Ou use o Widget de Feedback dentro do próprio app.

📄 Licença
Este projeto está sob a licença MIT. Sinta-se livre para usar como base para seus estudos.

<div align="center"> <p>Feito com 💜 por <a href="https://lucas.msky.com.br" target="_blank"><b>Lucas (MSKY)</b></a></p> <p> <a href="https://taskflow.msky.com.br">Acessar Demonstração Online</a> </p> </div>


### 💡 Toque de Mestre:

Percebeu a linha `![TaskFlow Cover](...)`?
Tire um **Print Screen** bem bonito do seu app (com algumas tarefas criadas para ficar cheio), suba essa imagem no próprio GitHub (pode ser numa Issue ou na pasta `public`) e troque o link ali. Um README com imagem chama 10x mais atenção\!