# 🚀 ResumeAI — AI-Powered Resume Builder SaaS

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3FCF8E?logo=supabase&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow)

> Create stunning, ATS-optimized resumes in minutes with the power of AI.

🔗 **Live Demo**: [your-app.lovable.app](https://your-app.lovable.app)

---

## 📸 Screenshots

| Dashboard | Resume Editor | AI Features |
|-----------|--------------|-------------|
| ![Dashboard](public/placeholder.svg) | ![Editor](public/placeholder.svg) | ![AI](public/placeholder.svg) |

---

## ✨ Features

### Resume Builder
- 📝 **4 Professional Templates** — Modern (2-column), Classic, Minimal, ATS-Safe
- 🎨 **Design Customization** — 8 color presets, 5 font pairs, 3 spacing options
- 📄 **PDF Export** — Pixel-perfect A4 PDF generation with `@react-pdf/renderer`
- ↩️ **Undo/Redo** — Full edit history (up to 50 states)
- 💾 **Auto-Save** — Changes saved every 30 seconds

### AI-Powered Tools
- 🤖 **Bullet Generator** — Generate 5 ATS-friendly action-verb bullet points
- ✏️ **Bullet Improver** — Inline AI suggestions for stronger bullet points
- 🎯 **ATS Score Checker** — Score 0-100 with missing keywords & suggestions
- 🔄 **Resume Tailoring** — Optimize resume for any job description
- 💌 **Cover Letter Generator** — AI-generated cover letters with streaming

### Plans & Billing
- 🆓 **Free Plan** — 1 resume, 3 templates, 5 AI credits/month
- 👑 **Pro Plan** — Unlimited everything + priority support
- 🔒 **Feature Gating** — Smart upgrade modals for locked features

### Authentication
- 🔐 **Email/Password Auth** — Secure signup & login with email verification
- 👤 **User Profiles** — Personalized dashboard experience
- 🛡️ **Row-Level Security** — All data protected at the database level

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, TypeScript, Vite |
| **Styling** | Tailwind CSS, shadcn/ui |
| **State** | TanStack React Query |
| **PDF** | @react-pdf/renderer |
| **Routing** | React Router v6 |
| **Backend** | Lovable Cloud (Supabase) |
| **Database** | PostgreSQL |
| **Auth** | Supabase Auth |
| **AI** | Lovable AI Gateway |
| **Edge Functions** | Deno (Supabase Edge Functions) |

---

## 🚀 Local Development

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- [Bun](https://bun.sh/) or npm

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/your-username/resume-ai.git
cd resume-ai

# 2. Install dependencies
bun install

# 3. Start the development server
bun run dev
```

The app runs at `http://localhost:5173`.

---

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Backend API URL (auto-configured) |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Public API key (auto-configured) |

### Backend Secrets (Edge Functions)

| Secret | Description |
|--------|-------------|
| `LOVABLE_API_KEY` | AI Gateway access |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin database access |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ai/                 # AI feature components
│   ├── editor/             # Resume editor + templates
│   └── ui/                 # shadcn/ui components
├── contexts/AuthContext.tsx # Authentication
├── hooks/
│   ├── use-resumes.ts      # Resume CRUD
│   └── use-plan-limits.ts  # Feature gating
├── lib/ai-service.ts       # AI API wrapper
├── pages/                  # Route pages
└── types/resume.ts         # TypeScript types

supabase/functions/          # 5 AI edge functions
```

---

## 🚢 Deployment

1. Click **Publish** in the Lovable editor
2. App is live at `your-app.lovable.app`
3. Connect a custom domain in Settings → Domains

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push and open a Pull Request

---

## 📜 License

MIT License — see [LICENSE](LICENSE) for details.

---

<p align="center">Built with ❤️ using <a href="https://lovable.dev">Lovable</a></p>
