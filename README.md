# 📚 NoteShare Frontend

A modern React-based frontend for the **NoteShare API**, enabling users to upload, manage, and securely access shared notes. This project focuses on clean UI, smooth user experience, and proper integration with a FastAPI backend.

---

## 🚀 Project Overview

NoteShare Frontend is the client-side application of the Note Sharing platform. It allows authenticated users to:

* 🔐 Register and log in
* 📤 Upload notes
* 📂 View their uploaded notes
* 📥 Download/open notes
* 🗑️ Delete notes
* 👤 Manage their session securely

The frontend communicates with the NoteShare FastAPI backend using REST APIs and JWT authentication.

---

## 🧠 Tech Stack

* **React (Vite)**
* **JavaScript (ES6+)**
* **Tailwind CSS**
* **Axios / Fetch API**
* **React Router**
* **JWT Authentication**

---

## ✨ Features Implemented

* ✅ User authentication (login/signup)
* ✅ Search notes
* ✅ Protected routes
* ✅ Upload notes functionality
* ✅ Notes listing dashboard
* ✅ Open/download notes
* ✅ Edit notes
* ✅ Delete notes
* ✅ Responsive UI
* ✅ Loading and error states
* ✅ Clean component structure

---

## 🔌 Backend Integration

This frontend is designed to work with the **NoteShare FastAPI Backend**.

**Backend responsibilities:**

* JWT authentication
* File storage & retrieval
* User authorization
* Note ownership validation

> ⚠️ Make sure the backend server is running before using the frontend.

---

## ⚙️ Getting Started

### 1️⃣ Clone the repository

```bash
git clone <your-frontend-repo-url>
cd note-share-frontend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables

Create a `.env` file:

```
VITE_API_BASE_URL=http://localhost:8000
```

---

### 4️⃣ Run the development server

```bash
npm run dev
```

App will run at:

```
http://localhost:5173
```

---

## 🔐 Authentication Flow

1. User logs in → receives JWT
2. Token stored in localStorage
3. Token attached to protected API requests
4. Backend validates ownership before file access

---

## 🎯 Future Improvements

* 🌙 Dark mode
* 🧪 Unit & integration tests

---

## 📸 Screenshots

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

---

## 📜 License

This project is for educational and portfolio purposes.

---

## ⭐ Author

**Vaishnavi Sinha**
BTech CSE 

---

### 💡 Recruiter Note

This project demonstrates:

* Full-stack integration skills
* JWT authentication handling
* REST API consumption
* Professional React project structure
* Clean Git workflow

---
