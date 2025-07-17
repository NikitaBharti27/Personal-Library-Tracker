📚 Personal Library Tracker

A full-stack web application to help you manage your personal book collection. Easily add, edit, search, and track the status of books you own, are reading, or want to read. Includes user authentication and a modern, responsive UI.

✨ Features
🔐 User Authentication: Register and log in securely.

👁 Password Visibility Toggle: Show/hide password using an eye icon in forms.

➕ Add/Edit/Delete Books: Manage your library with details like cover images, genres, and reading status.

🔍 Search Books: Quickly find books by title, author, or status.

📊 Dashboard: View your reading stats and filter books easily.

📱 Responsive Design: Fully optimized for both desktop and mobile devices.

🛠 Tech Stack
Frontend: React, Tailwind CSS, Vite
Backend: Node.js, Express.js, MongoDB
Authentication: JWT-based authentication with protected routes

🚀 Getting Started
✅ Prerequisites
Node.js (v16+ recommended)

npm or yarn

MongoDB (local or Atlas)

📦 Installation
Clone the repository

bash
Copy
Edit
git clone https://github.com/your-username/personal-lib-tracker.git
cd personal-lib-tracker
Install dependencies

Backend:

bash
Copy
Edit
cd backend
npm install
Frontend:

bash
Copy
Edit
cd ../frontend
npm install
Set up environment variables

Create a .env file in the backend directory with:

ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

🏃 Run the App
Start the backend server

bash
Copy
Edit
cd backend
npm run dev
Start the frontend dev server

bash
Copy
Edit
cd ../frontend
npm run dev
Open your browser and visit:
http://localhost:5173

📁 Folder Structure
arduino
Copy
Edit
personal-lib-tracker/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── App.jsx
│   └── main.jsx


🤝 Contributing
Pull requests are welcome!



