# Task Manager (MERN)

A clean, task manager built with **MongoDB + Express + React + Node**.  
Create, edit, complete, and delete tasks. Includes search, filters, toast notifications, a confirm dialog, and a **History** view for completed tasks.

---

## ✨ Features

- CRUD tasks (title, description, deadline, completed)
- Search by title/description
- Filters: All / Active / Completed
- Mark complete from the list (checkbox toggle)
- History page for completed tasks (Restore + Delete)
- Confirm dialog for destructive actions
- Toast notifications for success/errors
- Tailwind styling + responsive layout
- Clean REST API with MongoDB (Mongoose)

---

## 🧰 Tech Stack

**Frontend:** React, React Router, Axios, Tailwind CSS, react-hot-toast  
**Backend:** Node.js, Express, Mongoose, CORS, Morgan  
**Database:** MongoDB (local or Atlas)

---

## 📦 Project Structure

~~~
Task Manager/
├─ client/                 # React app
│  ├─ public/
│  └─ src/
│     ├─ components/
│     │  ├─ Navbar.jsx
│     │  ├─ TaskForm.jsx
│     │  ├─ TaskItem.jsx
│     │  ├─ TaskList.jsx
│     │  ├─ Spinner.jsx
│     │  └─ ConfirmDialog.jsx
│     ├─ pages/
│     │  ├─ TaskListPage.jsx
│     │  ├─ TaskFormPage.jsx
│     │  └─ TaskHistoryPage.jsx
│     ├─ services/
│     │  └─ taskService.js
│     ├─ App.js
│     └─ index.js
├─ server/                 # Express API
│  ├─ config/
│  │  └─ db.js
│  ├─ controllers/
│  │  └─ taskController.js
│  ├─ models/
│  │  └─ Task.js
│  ├─ routes/
│  │  └─ taskRoutes.js
│  ├─ middleware/          # (optional)
│  ├─ server.js
│  └─ .env
└─ README.md
~~~

---

## 🚀 Getting Started (Local)

### 1) Prerequisites
- Node.js ≥ 18 and npm
- MongoDB (Local **or** Atlas)

### 2) Backend setup

~~~bash
cd server
npm install
~~~

Create **server/.env**:

~~~
PORT=5000
# Local (example):
MONGO_URI=mongodb://localhost:27017/taskdb
# Or Atlas (example):
# MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/taskdb?retryWrites=true&w=majority
~~~

Run the API:

~~~bash
npm run dev
# expected: "MongoDB connected" and "Server listening on port 5000"
~~~

### 3) Frontend setup

~~~bash
cd ../client
npm install
~~~

Tailwind config check (Create React App):

- `tailwind.config.js` has:
  ~~~js
  module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: { extend: {} },
    plugins: [],
  }
  ~~~
- `src/index.css` contains:
  ~~~css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ~~~

Start React:

~~~bash
npm start
# opens http://localhost:3000
~~~

**Frontend → Backend URL**  
`client/src/services/taskService.js` uses:
~~~js
const API_URL = 'http://localhost:5000/api/tasks'
~~~

---

## 🔌 REST API

Base URL: `http://localhost:5000/api/tasks`

| Method | Endpoint | Body (JSON)                                        | Description                       |
|------:|----------|------------------------------------------------------|-----------------------------------|
|   GET | `/`      | –                                                    | List all tasks                    |
|   GET | `/:id`   | –                                                    | Get task by ID                    |
|  POST | `/`      | `{ title, description?, deadline?, isCompleted? }`   | Create task                       |
|   PUT | `/:id`   | *any subset of fields*                               | Update task (partial + validated) |
| DELETE| `/:id`   | –                                                    | Delete task                       |

**Notes**

- Updates are **partial**; server runs validators (`runValidators: true`).
- Empty `deadline` from UI is normalized to `null`.

**cURL quickstart**

~~~bash
# list
curl http://localhost:5000/api/tasks

# create
curl -X POST http://localhost:5000/api/tasks \
 -H "Content-Type: application/json" \
 -d '{"title":"Buy milk","description":"2L","deadline":"2025-08-31"}'

# update
curl -X PUT http://localhost:5000/api/tasks/<ID> \
 -H "Content-Type: application/json" \
 -d '{"isCompleted":true}'

# delete
curl -X DELETE http://localhost:5000/api/tasks/<ID>
~~~

---

## 🗄️ Data Model

**Task (MongoDB/Mongoose)**

~~~js
{
  title: String,            // required
  description: String,      // optional
  deadline: Date | null,    // optional
  isCompleted: Boolean,     // default: false
  createdAt: Date,          // via timestamps
  updatedAt: Date
}
~~~

---

## 🖥️ UI Routes

- `/tasks` – main list (search, filters, toggle complete, delete)
- `/tasks/new` – create task form
- `/tasks/:id/edit` – edit task form
- `/history` – completed tasks with **Restore** + **Delete**

---

## 🧪 Manual Test Checklist

- Create task with title only
- Create task with title + description + deadline
- Toggle complete from the list
- Edit task and save changes
- Delete with confirm dialog
- Search and filters behave correctly
- History lists completed tasks newest first; **Restore** works
- API returns correct JSON; DB shows documents

---

## 🎨 Design Notes

- Tailwind for rapid, consistent styling
- Navbar + centered container for a product-like feel
- Cards with subtle shadows and status/due badges
- `react-hot-toast` for non-blocking feedback
- Confirm dialog for safer deletes
- Mobile: floating **Add** button

---

## 🐞 Troubleshooting

- **CORS error** → ensure `app.use(cors())` in `server/server.js`
- **API not reachable** → run backend on 5000; verify `API_URL` in `taskService.js`
- **Mongo fails to connect** → check `MONGO_URI`; if Atlas, whitelist your IP
- **Tailwind not applied** → verify content paths in `tailwind.config.js` and ensure `import './index.css'` is present in `src/index.js`
- **PUT 400 error** → server runs validators; ensure `title` present; `deadline` valid or `null`

---

## 📄 License

MIT – free to use in your portfolio and projects.
