# Blog App

A modern, full-featured blog application built with Vite + React, Tailwind CSS v4, DaisyUI v5, Redux Toolkit, and Firebase.

## Tech Stack

- **Frontend:** Vite 8 + React 19
- **Styling:** Tailwind CSS v4 + DaisyUI v5
- **State Management:** Redux Toolkit
- **Backend & Database:** Firebase (Firestore + Storage + Auth)
- **Routing:** React Router v7

## Features

- 📝 Create, edit, and delete blog posts
- 🗂️ Category and tag filtering
- 💬 Comment system with admin approval
- 🔐 Admin panel with Firebase Authentication
- 📱 Fully responsive design
- ⚡ Fast and optimized with Vite

## Project Structure

Feature-based architecture — each feature (posts, comments, auth, categories) owns its own slice, service, hooks, and components.

## Getting Started
```bash
# Install dependencies
npm install

# Create .env file and add your Firebase config
cp .env.example .env

# Start development server
npm run dev
```

## Environment Variables
```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## Deployment
```bash
npm run build
```

---
