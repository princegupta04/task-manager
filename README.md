# 📝 Task Management System (MERN Stack)

A full‑stack **Task Management System** built using the **MERN stack (MongoDB, Express, React, Node.js)**. This project was developed as part of a technical assignment and demonstrates real‑world features such as authentication, task CRUD, pagination, priority management, and protected routes.

---

## 🚀 Features

### ✅ Authentication

* User **Register & Login**
* **JWT‑based authentication**
* Protected routes (only logged‑in users can access tasks)

### ✅ Task Management

* Create new tasks (title, description, due date)
* View task list with **pagination (Ajax based)**
* View task details
* Edit existing tasks
* Delete tasks with confirmation
* Mark tasks as **pending / completed**

### ✅ Priority Management

* Task priorities: **High, Medium, Low**
* Color‑coded priority badges for quick identification
* Easy priority updates

### ✅ UI / UX

* Clean, modern UI built with **Tailwind CSS**
* Responsive layout
* Card‑based task display

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* React Router DOM
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT (jsonwebtoken)
* bcryptjs

---

## 📁 Project Structure

```
task-manager/
│
├── backend/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   ├── api/
    │   └── App.jsx
    └── index.html
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone <repo-url>
cd task-manager
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/task_manager
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

Backend runs on:
👉 `http://localhost:5000`

---

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs on:
👉 `http://localhost:5173`

---

## 🔐 API Overview

### Auth APIs

* `POST /api/auth/register` – Register user
* `POST /api/auth/login` – Login & get JWT

### Task APIs (Protected)

* `POST /api/tasks` – Create task
* `GET /api/tasks?page=1` – Get tasks (pagination)
* `GET /api/tasks/:id` – Task details
* `PUT /api/tasks/:id` – Update task
* `DELETE /api/tasks/:id` – Delete task
* `PATCH /api/tasks/:id/status` – Update status

---

## 🎥 Assignment Submission Notes

* A **5–10 minute video** was recorded explaining:

  * Project architecture
  * Authentication flow
  * Task CRUD operations
  * Pagination & priority handling
* Live demo of working application included

---

## 💡 Key Learnings

* Implemented secure JWT authentication
* Built scalable REST APIs
* Handled pagination and user‑specific data
* Improved UX using Tailwind CSS
* Followed clean folder and code structure

---

## 👨‍💻 Author

**Prince Gupta**
Software Developer (MERN Stack)

---

## ✅ Conclusion

This project demonstrates a **production‑ready MERN application** with clean architecture, secure authentication, and a modern UI. It closely reflects real‑world task management systems used in enterprise applications.

---

⭐ Thank you for reviewing this
