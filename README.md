# InterviewIQ - AI-Powered Interview Preparation Platform

InterviewIQ is a full-stack, AI-powered mock interview and career preparation platform. It analyzes candidate resumes, generates tailored technical and behavioral questions, conducts simulated interview sessions, evaluates candidate answers with intelligent scoring and feedback, and provides comprehensive performance reports.

---

## 🚀 Features

- **Resume Parsing & Skill Extraction:** Automatically parses PDF resumes and extracts relevant roles, skills, and projects using `pdfjs-dist` and AI.
- **Dynamic Question Generation:** Customizes interview difficulty, domains, and question styles based on experience and role.
- **Real-Time Interactive Interviews:** Supports text and voice interactions, realistic AI avatars, and answer evaluations.
- **Detailed Evaluation Reports:** Granular scoring across technical proficiency, communication, and depth with downloadable PDF summaries.
- **Credit & Payment Integration:** Seamless checkout and credit replenishment with Razorpay.
- **Secure Authentication:** Google Single Sign-On (SSO) via Firebase Auth with HttpOnly JWT authentication cookies.

---

## 🛠️ Tech Stack

### Frontend (`/client`)
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4, Motion (Framer Motion)
- **State Management:** Redux Toolkit
- **Auth:** Firebase Auth (Google Sign-In)
- **Charts & PDFs:** Recharts, jsPDF, jsPDF-AutoTable
- **HTTP Client:** Axios (with credentials)

### Backend (`/server`)
- **Runtime:** Node.js + Express 5
- **Database:** MongoDB Atlas with Mongoose ODM
- **AI Engine:** OpenRouter AI API
- **Document Processing:** PDF.js (`pdfjs-dist`), Multer
- **Payment Gateway:** Razorpay SDK
- **Security:** JWT, Cookie-Parser, CORS

---

## 📂 Project Structure

```text
interview-agent/
├── client/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/     # UI components & interview steps
│   │   ├── pages/          # Application views (Home, Auth, Pricing, Reports)
│   │   ├── redux/          # Redux Toolkit store & user slices
│   │   └── utils/          # Firebase & helper utilities
│   ├── vercel.json         # Vercel SPA routing rewrite rules
│   ├── package.json
│   └── .env.example
├── server/                 # Express backend API
│   ├── config/             # Database connection & JWT token utilities
│   ├── controllers/        # Auth, User, Interview, and Payment logic
│   ├── middlewares/        # Authentication & Multer upload middlewares
│   ├── models/             # Mongoose schemas (User, Interview)
│   ├── routes/             # Express API route declarations
│   ├── services/           # OpenRouter AI & Razorpay services
│   ├── package.json
│   └── .env.example
├── .gitignore              # Repository gitignore
└── README.md               # Project documentation
```

---

## ⚙️ Getting Started Locally

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas cluster or local MongoDB instance
- Firebase project credentials (Google Auth enabled)
- OpenRouter API Key
- Razorpay test keys (optional for payments)

---

### 1. Server Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory (reference `.env.example`):
```env
PORT=8000
MONGODB_URL=your_mongodb_connection_uri
JWT_SECRET=your_jwt_secret_key
OPENROUTER_API_KEY=your_openrouter_api_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Start the backend:
```bash
npm run dev
# Server runs at http://localhost:8000
```

---

### 2. Client Setup

```bash
cd ../client
npm install
```

Create a `.env` file in the `client` directory (reference `.env.example`):
```env
VITE_SERVER_URL=http://localhost:8000
VITE_FIREBASE_APIKEY=your_firebase_api_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

Start the frontend:
```bash
npm run dev
# Client runs at http://localhost:5173
```

---

## 🌐 Deployment Guide

### Backend (e.g. Render, Railway, or VPS)
1. Set the root directory to `server`.
2. Build command: `npm install`
3. Start command: `npm start`
4. Provide all backend environment variables (`NODE_ENV=production`, `MONGODB_URL`, `JWT_SECRET`, `OPENROUTER_API_KEY`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `CLIENT_URL=https://your-frontend-domain.vercel.app`).

### Frontend (e.g. Vercel)
1. Set root directory to `client`.
2. Framework preset: `Vite`.
3. Build command: `npm run build`
4. Output directory: `dist`.
5. Environment variables: `VITE_SERVER_URL=https://your-backend-domain.onrender.com`.

### Important Deployment Checklist:
- **Firebase Auth:** Add your Vercel production domain to **Firebase Console -> Authentication -> Settings -> Authorized Domains**.
- **MongoDB Atlas:** Ensure your IP access list allows connections from `0.0.0.0/0` (or your cloud hosting IPs).
- **CORS & Cookies:** Keep `NODE_ENV=production` on the server so authentication cookies include `SameSite=None; Secure`.
