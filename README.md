# 🚍 BusHive - Real-Time Bus Tracking Platform

[![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)

A modern web application that provides **real-time bus locations, accurate ETAs, route maps, and stop information**.  
Users can track buses live while drivers can view their schedules and attendance in a secure dashboard.

---

## ✨ Features

### 🧑‍💻 User Features
- **Live Bus Tracking** – See buses moving in real-time on routes.
- **Estimated Time of Arrival (ETA)** – Accurate bus arrival times.
- **Route Maps & Stops** – Visualize routes and all bus stops.
- **User Authentication** – Secure signup/login for personalized experience.

### 🚍 Driver Features
- **Driver Dashboard** – View schedules and attendance logs.
- **Secure Login** – Driver authentication with password.
- **Bus Assignment** – Access assigned buses and routes.

---

## 🛠 Technologies Used

- **Frontend:** React, TypeScript, Tailwind CSS, Headless UI, Lucide Icons  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Other Libraries:** Axios, Sonner (toast notifications)  

---

## 📂 Project Structure

public/
├─ images/ # Logos, images
src/
├─ components/
│ ├─ user/ # Auth cards, contact forms, maps
│ ├─ driver/ # Driver dashboard components
│ └─ layouts/ # Navbar, Layout, Footer
├─ pages/
│ ├─ auth/ # Login, Signup, Aadhaar Verification, Set Password
│ ├─ driver/ # DriverDashboard
│ └─ user/ # UserDashboard
├─ App.tsx # Main app component
├─ main.tsx # App entry point
├─ index.css
└─ vite-env.d.ts
.gitignore
README.md
package.json
vite.config.ts
tsconfig.json

📌 Usage

User: Navigate through Welcome → Login → Signup → Dashboard to track buses live.

Driver: Log in to access dashboard, view schedules, and attendance logs.🚍 Bus Tracking System
📌 Project Overview

A real-time bus tracking system built with React and MongoDB, designed for students and drivers:

Users can:

Log in/sign up securely

View buses in real-time on a map

Track routes and bus positions

Mark buses as favorites for quick access

Drivers can:

Log in/sign up

View their assigned logs & trip history

Update live status for users to track

🛠️ Tech Stack
Frontend

⚛️ React (Vite + TypeScript)

🎨 Tailwind CSS (UI styling)

🗺️ Leaflet.js (real-time maps)

Backend & Database

🌐 RESTful API (Node.js + Express)

🍃 MongoDB (NoSQL database for users, drivers, buses, favorites)

🔄 Socket.IO (real-time bus location updates)

Hosting & Deployment

🌍 Vercel (frontend hosting)

☁️ MongoDB Atlas (cloud database)

🚀 Backend hosted on [Render/Heroku/your choice]

📂 File Structure
📦 project-root
 ┣ 📂 public/               # Static assets (logos, images)
 ┣ 📂 src/
 ┃ ┣ 📂 components/         # Reusable UI components
 ┃ ┃ ┣ 📂 user/             # User-specific components
 ┃ ┃ ┣ AuthCard.tsx
 ┃ ┃ ┣ ContactUS.tsx
 ┃ ┃ ┣ MapView.tsx
 ┃ ┃ ┣ Navbar.tsx
 ┃ ┃ ┗ footer.tsx
 ┃ ┣ 📂 layouts/            # App layout (Navbar, Footer, etc.)
 ┃ ┃ ┗ Layout.tsx
 ┃ ┣ 📂 pages/              # Main app pages
 ┃ ┃ ┣ 📂 auth/             # Authentication (login/signup/verification)
 ┃ ┃ ┣ 📂 driver/           # Driver dashboard
 ┃ ┃ ┣ 📂 user/             # User dashboard
 ┃ ┃ ┣ About.tsx
 ┃ ┃ ┣ LandingPage.tsx
 ┃ ┃ ┗ App.tsx
 ┃ ┣ index.css              # Global styles
 ┃ ┣ main.tsx               # Entry point
 ┃ ┗ vite-env.d.ts
 ┣ .gitignore
 ┣ README.md
 ┣ package.json
 ┣ tailwind.config.js
 ┣ tsconfig.json
 ┣ vite.config.ts
 ┗ ... (other configs)

🚦 Features Roadmap

✅ User login & signup

✅ Driver login & signup

✅ Real-time bus location tracking

✅ Favorite buses section

✅ Driver logs dashboard

🔜 Notifications for bus arrival

🔜 Admin panel for managing routes & buses


💡 Future Improvements

Mobile-friendly responsive layout

Push notifications for bus arrivals

Admin panel for managing routes and drivers

Analytics dashboard for driver and bus performanc
