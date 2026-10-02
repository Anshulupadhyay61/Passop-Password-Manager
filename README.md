# 🔐 PassOP — Password Manager

A full-stack password manager built with **React, Vite, Express.js, and MongoDB Atlas**.

PassOP provides a simple and responsive interface to save, view, edit, copy, and delete password records while keeping data persisted in a MongoDB database.

---

## 🚀 Live Demo

🌐 **Frontend:**  
https://passop-password-manager-nine.vercel.app

⚙️ **Backend API:**  
https://passop-password-manager-pact.onrender.com

---

## ✨ Features

- 🔐 Save password records
- 👁️ Show / hide passwords
- 📋 Copy website, username, and password
- ✏️ Edit existing password records
- 🗑️ Delete password records
- 🔄 Persistent data storage with MongoDB Atlas
- ⚡ REST API powered by Express.js
- 📱 Responsive user interface
- 🎨 Modern UI built with Tailwind CSS
- ☁️ Deployed frontend and backend
- 🔄 Real-time frontend ↔ backend communication

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- JavaScript
- Tailwind CSS
- React Toastify
- UUID

### Backend

- Node.js
- Express.js
- MongoDB Driver
- CORS
- dotenv

### Database

- MongoDB Atlas

### Deployment

- Vercel — Frontend
- Render — Backend
- MongoDB Atlas — Database

---

## 🏗️ Architecture

```text
┌─────────────────────────┐
│      React + Vite       │
│       Frontend          │
└────────────┬────────────┘
             │
             │ REST API
             ▼
┌─────────────────────────┐
│      Express.js         │
│       Backend           │
│        Render           │
└────────────┬────────────┘
             │
             │ MongoDB Driver
             ▼
┌─────────────────────────┐
│      MongoDB Atlas      │
│   passop.documents      │
└─────────────────────────┘
