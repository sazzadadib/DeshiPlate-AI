# **DeshiPlate AI — Frontend (Next.js Application)**

This folder contains the full **Next.js 16** frontend powering the DeshiPlate AI web experience.  
Users can upload images, analyze foods, get nutrition guidance, track meals, and manage their profiles.

---

## ✨ **Features**

- 🖼️ Upload food images & get instant classification  
- 🍽️ Nutrition analysis & macro breakdown  
- 🏥 Health-aware AI suggestions using LLM  
- 🔐 User authentication (NextAuth)  
- 🧑‍⚕️ Profile + health data management  
- 🍛 Daily food log and calorie tracking  
- ⚡ API routes for food analysis, logging, and user data  
- 🎨 Beautiful UI with TailwindCSS  

---

## 📁 **Folder Structure**

````

frontend/
│
├── public/                      # Static assets (SVGs, logo, icons)
│
├── src/
│   ├── app/
│   │   ├── (routes)/            # Client-facing pages
│   │   │   ├── classifier/      # Upload + classification UI
│   │   │   ├── food-analysis/   # Nutrition results
│   │   │   ├── how-it-works/
│   │   │   ├── profile/
│   │   │   ├── signin/
│   │   │   └── signup/
│   │   │
│   │   ├── api/
│   │   │   ├── auth/            # Login, signup, sessions
│   │   │   ├── food/            # Analysis + logging APIs
│   │   │   └── user/            # Profile CRUD
│   │   │
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Landing page
│   │
│   ├── components/              # Navbar, Footer, Buttons, Providers
│   ├── db/                      # Drizzle ORM config + schema
│   ├── lib/                     # Utility functions, auth helpers
│   └── types/                   # TypeScript definitions
│
├── drizzle.config.ts
├── middleware.ts                # Protected route handling
├── next.config.ts
├── package.json
├── tsconfig.json
└── postcss.config.mjs

````

---

## 🚀 **Running the Frontend**

### 1. Install dependencies
```bash
npm install
````

### 2. Set environment variables

Create `.env.local`:

```
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
OPENAI_API_KEY=
HUGGINGFACE_API_URL=
```

### 3. Run development server

```bash
npm run dev
```

Visit:
👉 `http://localhost:3000`

---

## 🎨 **Tech Stack**

* **Next.js 14** (App Router)
* **React + TypeScript**
* **TailwindCSS**
* **NextAuth**
* **Drizzle ORM + PostgreSQL**
* **OpenAI / LLM**
* **HuggingFace Inference API**

---

## 📄 **License**

This frontend is licensed under the MIT License.

