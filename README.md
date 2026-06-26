👑 FahisBrownieBee — Taste The Heaven

Welcome to the official repository for **FahisBrownieBee**, an elite online micro-patisserie web application. This platform is custom-built to deliver a premium, luxury digital storefront experience for an artisan bakery, showcasing 100% eggless, freshly baked boutique batches shipped pan-India.

🔗 **Live Production Link:** [https://fahisbrowniebee-web.vercel.app](https://fahisbrowniebee-web.vercel.app)

---

## ✨ Premium Features

*   **Luxury Dark Aesthetic:** Immersive visual experience utilizing deep espresso tones, gold accent highlights, custom typography (`Playfair Display` & `Inter`), and modern glassmorphic components.
*   **Fully Populated Local Menu Grid:** Categorized item catalog powered entirely by custom brand photography assets (`Menu1.png` through `Menu11.png`) mapped natively to dynamic display cards.
    *   *Signature Fudgy Boxes* ✨
    *   *Deep-Dish Tubs* 🔥
    *   *Nutritious Loaves & Wellness Boxes* 🌿
*   **Direct WhatsApp Checkout:** Removed complex checkout bottlenecks in favor of direct, high-conversion customer connection lines. Clicking order buttons instantly formats a personalized text manifest directly to the patisserie's WhatsApp Business endpoint (`+919488411471`).
*   **"Captured in the Wild" Instagram Feed:** Interactive social display board linking user touchpoints back to the brand's verified feed (@fahisbrowniebee) utilizing local assets (`CAP.png` through `CAP3.png`).
*   **Administrative CRM Cockpit:** A secure, password-protected back-office panel accessible via the storefront menu. Allows the owner to safely monitor simulated customer interactions, product popularity clicks, and core inquiry logs.

---

## 🛠️ Technology Stack

*   **Framework:** React with TypeScript (`App.tsx`)
*   **Build Tool:** Vite (`vite.config.ts`)
*   **Styling:** Tailwind CSS + Framer Motion (for fluid micro-interactions and premium transitions)
*   **Deployment Hosting Environment:** Vercel Production Network

---

## 🚀 Local Development Setup

To run this project on your computer locally, open your terminal inside the project folder and run the following commands:

1. **Install Dependencies:**
   ```bash
   npm install
Run the Local Server:

Bash
npm run dev
Your app will immediately spin up locally at http://localhost:5173 or http://localhost:3000.

🔒 Owner Dashboard Login Credentials
To test the simulated metrics and visitor analytics logger embedded inside the application framework:

Access Point: Navigate to the main application menu bar and click "BOUTIQUE SECRET" (or the lock icon).

Master Password: Fahis@2026

🌍 Production Pipeline
This application is configured for Continuous Deployment (CD) using Vercel connected directly via GitHub. Any commits pushed to the main branch of this repository will trigger an automatic production rebuild, ensuring the live storefront stays up to date in real time.
