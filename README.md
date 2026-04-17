<div align="center">

# 🎮 PokéExplorer

### Desafio Frontend — SiaPesq

Uma aplicação web interativa para explorar o universo Pokémon, construída com tecnologias modernas e foco em UI/UX.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

---

## 📋 Sobre o Projeto

Aplicação desenvolvida como parte do **Desafio de Estágio Frontend da SiaPesq**, com o objetivo de demonstrar habilidades em construção de interfaces responsivas, dinâmicas e intuitivas.

A aplicação consome dados em tempo real da [PokéAPI](https://pokeapi.co/) e conta com sistema de autenticação completo.

---

## 🖥️ Telas

| Tela | Descrição |
|------|-----------|
| **🏠 Home** | Página de apresentação com hero section, features e call-to-action |
| **🔐 Login** | Formulário de login com validação e feedback visual |
| **📝 Registro** | Formulário de cadastro com confirmação de senha |
| **📖 Pokédex** | Grid de Pokémon com busca, paginação e cards detalhados |

---

## 🚀 Tecnologias

- **Next.js 16** — App Router, API Routes, SSR
- **React 19** — Hooks, Context API
- **TypeScript** — Tipagem estática
- **Tailwind CSS 4** — Estilização utility-first
- **Lucide React** — Ícones modernos
- **PokéAPI** — API externa de dados Pokémon
- **JWT + bcryptjs** — Autenticação segura

---

## ✨ Features

- ✅ Design responsivo (mobile, tablet, desktop)
- ✅ Animações e transições suaves
- ✅ Busca de Pokémon em tempo real
- ✅ Paginação na Pokédex
- ✅ Cards com tipos, stats, altura e peso
- ✅ Sistema de autenticação (login/registro)
- ✅ API Routes no Next.js (backend integrado)
- ✅ Navbar dinâmica com estado do usuário
- ✅ Loading states e feedback visual

---

## 📦 Como Rodar

```bash
# Clone o repositório
git clone https://github.com/SEU_USUARIO/pokeexplorer-siapesq.git

# Entre na pasta
cd pokeexplorer-siapesq

# Instale as dependências
npm install

# Rode o projeto
npm run dev
```

Acesse **http://localhost:3000** no navegador.

---

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── api/auth/         # Rotas de autenticação (login/registro)
│   ├── login/            # Página de login
│   ├── registro/         # Página de registro
│   ├── pokedex/          # Página da Pokédex
│   ├── layout.tsx        # Layout raiz
│   ├── page.tsx          # Página inicial (Home)
│   └── globals.css       # Estilos globais e animações
├── components/
│   ├── Navbar.tsx         # Barra de navegação responsiva
│   └── PokemonCard.tsx    # Card de Pokémon com stats
├── contexts/
│   └── AuthContext.tsx    # Context de autenticação
└── lib/
    └── auth.ts           # Utilitários de auth (JWT, bcrypt)
```

---

## 👤 Autor

**Michelangelo** — Desafio Frontend SiaPesq 2026

---

<div align="center">

Feito com 💜 para o processo seletivo da **SiaPesq**

</div>
