# 📚 Personal Library Tracker

**Personal Library Tracker** is a modern full-stack web application designed to help book lovers manage their personal collections effortlessly. Add, edit, search, and track your books’ reading status — all in one place, with secure user authentication and a sleek, responsive UI.

---

## 🚀 Features

- **Secure User Authentication:** Register, log in, and manage your profile with JWT-based authentication.  
- **Password Visibility Toggle:** Easily show or hide your password with a convenient eye icon during login and registration.  
- **Comprehensive Book Management:** Add, edit, and delete books, including cover images, genres, and custom reading statuses (To Read, Reading, Read).  
- **Powerful Search & Filters:** Search your collection by title, author, genre, or reading status.  
- **Personalized Dashboard:** Track your reading progress and get insights through dynamic stats and filters.  
- **Responsive UI:** Designed with Tailwind CSS to look great on both desktop and mobile devices.  

---

## 🛠 Technology Stack

| Layer       | Technologies                    |
|-------------|--------------------------------|
| Frontend    | React, Vite, Tailwind CSS      |
| Backend     | Node.js, Express.js            |
| Database    | MongoDB                        |
| Authentication | JWT (JSON Web Tokens)       |

---

## 📋 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) v16 or higher  
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)  
- [MongoDB](https://www.mongodb.com/) (local installation or MongoDB Atlas)

---
##📁Folder-Structure
-personal-lib-tracker/
  backend/      # Express API, models, controllers, routes, uploads
  frontend/     # React app, components, pages, context, assets

---
API Endpoints
-User
-POST /api/users/register — Register a new user
-POST /api/users/login — Login and receive JWT
-Books
-GET /api/books — Get all books
-POST /api/books — Add a new book
-PUT /api/books/:id — Edit a book
-DELETE /api/books/:id — Delete a book
> All book routes require authentication (JWT in the Authorization header).

---
🤝 Contributing
Contributions are welcome! Please follow these steps:

-Fork the repository

-Create your feature branch (git checkout -b feature/my-feature)

-Commit your changes (git commit -m 'Add my feature')

-Push to the branch (git push origin feature/my-feature)

-Open a Pull Request

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.
