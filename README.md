# 🌮 Cosmic Food — Full-Stack Food Ordering App

A premium, full-stack food ordering application with a React web frontend, Express.js backend, and an Android mobile app built in Kotlin with Jetpack Compose.

---

## 🏗️ Project Structure

```
cosmic-food/
├── web-frontend/         # React + Vite web application
├── backend-express/      # Node.js + Express REST API + Socket.io
├── android-kotlin/       # Android app (Kotlin + Jetpack Compose)
└── docker-compose.yml    # Full stack orchestration
```

---

## 🚀 Getting Started

### Backend (Express.js)
```bash
cd backend-express
npm install
node server.js
```
Server runs at `http://localhost:5000`

### Web Frontend (React + Vite)
```bash
cd web-frontend
npm install
npm run dev
```
App runs at `http://localhost:3000`

### Full Stack with Docker
```bash
docker-compose up
```

### Android App
1. Open `android-kotlin/` in **Android Studio**
2. Sync Gradle files
3. Run on an emulator or device
   > Make sure the backend is running. The emulator connects to `http://10.0.2.2:5000`

---

## ✨ Features

- 🛒 **Shopping Cart** — Add/remove items and manage your order
- 🔍 **Menu Search & Filter** — Find food by name or category
- 📱 **Android App** — Native mobile experience with Jetpack Compose
- ⚡ **Real-time Updates** — Socket.io for live order status
- 🐳 **Docker Ready** — One command to spin up the entire stack

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Web Frontend | React 18, Vite, Framer Motion |
| Backend API | Node.js, Express.js, Socket.io |
| Mobile App | Kotlin, Jetpack Compose, Retrofit, Coil |
| Containerization | Docker, Docker Compose |
