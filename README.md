# 🚀 TaskFlow 

> Gerenciador de tarefas com foco em organização, clareza e evolução de produto.

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

---

## 🧠 Sobre o Projeto

O TaskFlow é um sistema de gestão de tarefas inspirado em Kanban, desenvolvido com foco em organização de informações e experiência do usuário.

Mais do que um projeto de interface, ele foi estruturado como base para evolução futura, considerando separação de responsabilidades, persistência de dados e possíveis integrações.

---

## 🎯 Objetivo

Criar uma ferramenta simples, mas bem estruturada, capaz de evoluir de um frontend funcional para um sistema mais completo, com backend dedicado e maior controle de dados.

---

## ⚙️ Funcionalidades

- Organização de tarefas em formato Kanban  
- Sistema de categorias para classificação  
- Interface responsiva (desktop e mobile)  
- Autenticação de usuários  
- Área administrativa para gestão de feedbacks  

---

## 🏗️ Arquitetura (visão prática)

Apesar de ser um projeto focado em frontend, o TaskFlow já foi pensado com alguns conceitos importantes:

- Organização de lógica de negócio no cliente  
- Uso de Server Actions para operações de dados  
- Integração com banco via ORM  
- Estrutura preparada para evolução futura com APIs dedicadas  

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS  
- **Dados:** Prisma ORM + PostgreSQL  
- **Autenticação:** Clerk  
- **Deploy:** Vercel  

---

## 🚀 Como rodar o projeto

```bash
git clone https://github.com/mageskylms/taskflow2.0
cd taskflow2.0
npm install
npm run dev
