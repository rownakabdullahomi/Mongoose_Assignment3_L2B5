# ![Mongoose](https://i.ibb.co/Kjy5hYcY/mongoose.png)

# 📚 Library Management API (Express + Mongoose + TypeScript)

Welcome to the **Library Management System** backend! This project is built with **Express**, **Mongoose**, and **TypeScript**, and deployed on **Vercel**.

It supports operations for managing books and borrow records in a digital library setup, including **book creation**, **stock tracking**, and **borrowing summary**.

---

## 📁 Project Structure

```bash
├── .vercel
├── dist                # Compiled output
├── node_modules
├── src
│   ├── config          # Environment configurations
│   │   └── index.ts
│   ├── db              # MongoDB connection logic
│   │   └── db.ts
│   ├── modules
│   │   ├── book        # Book-related logic
│   │   │   ├── book.controller.ts
│   │   │   ├── book.interface.ts
│   │   │   ├── book.model.ts
│   │   │   └── book.routes.ts
│   │   └── borrow      # Borrow-related logic
│   │       ├── borrow.controller.ts
│   │       ├── borrow.interface.ts
│   │       ├── borrow.model.ts
│   │       └── borrow.routes.ts
│   ├── routes          # Entry point for all module routes
│   │   └── routes.ts
│   └── server.ts       # Main server entry point
├── .env                # Environment variables
├── .gitignore
├── app.ts
├── package.json
├── tsconfig.json       # TypeScript configuration
└── vercel.json         # Deployment config for Vercel
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/rownakabdullahomi/Mongoose_Assignment3_L2B5.git
cd library-management-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment

Create a `.env` file and add your MongoDB connection string:

```env
PORT=5000
MONGODB_URI=your_mongodb_uri_here
```

### 4. Start in Development

```bash
npm run dev
```

### 5. Build for Production

```bash
npm run build
npm start
```

---

## 📬 API Endpoints

### Base URL: `/api`

### 📚 Book Routes `/api/books`

| Method | Endpoint | Description                 |
| ------ | -------- | --------------------------- |
| POST   | `/`      | Create a new book           |
| GET    | `/`      | Get all books (filter/sort) |
| GET    | `/:id`   | Get a book by ID            |
| PATCH  | `/:id`   | Update a book by ID         |
| DELETE | `/:id`   | Delete a book by ID         |

> **Note**: You can filter books by genre using `?filter=GENRE` and sort by `?sortBy=title&sort=asc`

### 🔁 Borrow Routes `/api/borrow`

| Method | Endpoint | Description                        |
| ------ | -------- | ---------------------------------- |
| POST   | `/`      | Borrow books and update stock      |
| GET    | `/`      | View summary of all borrowed books |

---

## ✅ Features

* 📖 **Book Management** (CRUD)
* 📊 **Borrow Tracking** (Aggregation with `$group` and `$lookup`)
* ✅ **Genre Validation** with `.pre()` hook
* 📉 **Stock Update Logic** with custom static methods
* 📦 **TypeScript for Type Safety**
* ⚙️ **Modular Folder Structure**
* ☁️ **Deployed on Vercel**

---

## 💡 Tech Stack

* **Backend Framework**: Express.js
* **Database**: MongoDB with Mongoose
* **Language**: TypeScript
* **Deployment**: Vercel
* **Dev Tools**: ESLint, ts-node-dev

---

## 🧪 Sample JSON

### 📘 Create Book

```json
POST /api/books
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "genre": "non_fiction",
  "isbn": "9780132350884",
  "description": "A Handbook of Agile Software Craftsmanship",
  "copies": 5
}
```

### 🔁 Borrow Book

```json
POST /api/borrow
{
  "book": "<Book_ID>",
  "quantity": 2,
  "dueDate": "2025-12-31"
}
```

---

## ⚠️ Validation & Error Handling

* `genre` must be one of: FICTION, NON\_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY
* `copies` must be integer ≥ 0
* `dueDate` must be a future date
* If stock is insufficient, response: `409 Conflict`

---

## 📦 Deployment

This project is deployed on **Vercel**.

```
https://library-management-backend-teal.vercel.app
```

---

## 🙌 Contribution

Feel free to fork this repository, submit issues, or create PRs. Suggestions and improvements are always welcome.

---

## 📧 Contact

**Rownak Abdullah** — [rownakabdullahomi@gmail.com](rownakabdullahomi@gmail.com) 

---

> ⭐ If you found this helpful, don’t forget to star the repo!

---

## 🤝 Thank You!

Happy Coding 🚀
