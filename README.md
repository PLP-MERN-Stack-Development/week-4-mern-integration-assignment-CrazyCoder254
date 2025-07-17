# MERN Blog Platform 📝

A full-stack blog application built with the **MERN** (MongoDB, Express, React, Node.js) stack. It allows users to create, read, update, and delete blog posts, leave comments, categorize content, upload images, and search posts.

---

## 🚀 Features

- User authentication (JWT-based)
- Create, update, delete blog posts
- Image upload with Multer
- Add comments to posts
- Search posts by title or content
- Categories & tags support
- RESTful API with Express
- MongoDB with Mongoose ODM

---

## 📁 Project Structure

```
mern-blog/
├── client/                 # React frontend
│   └── src/
│       ├── components/     # UI components
│       ├── pages/          # Route pages
│       ├── api/            # Axios API functions
│       └── App.js
├── server/                 # Express backend
│   ├── controllers/        # Route handlers
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API route definitions
│   ├── middleware/         # Auth and upload middleware
│   ├── uploads/            # Image upload directory
│   ├── .env                # Environment variables
│   └── server.js           # Entry point
├── README.md               # This file
```

---

## ⚙️ Technologies

### Frontend
- React
- Axios
- React Router
- Tailwind CSS (optional)

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- Multer (for file uploads)
- JSON Web Token (JWT)
- Dotenv

---

## 🧑‍💻 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/mern-blog.git
cd mern-blog
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-blog
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm run dev
```

### 3. Set up the frontend

```bash
cd ../client
npm install
npm start
```

---

## 🔐 Authentication

- Auth uses JWT. After login/register, the token should be saved to localStorage.
- Protected routes require `Authorization: Bearer <token>` in headers.

---

## 📡 API Endpoints

### Auth
- `POST /api/auth/register` — Register user
- `POST /api/auth/login` — Login user

### Posts
- `GET /api/posts` — Get all posts
- `GET /api/posts/:id` — Get single post
- `POST /api/posts` — Create post (auth)
- `PUT /api/posts/:id` — Update post (auth)
- `DELETE /api/posts/:id` — Delete post (auth)

### Comments
- `POST /api/posts/:id/comments` — Add comment to a post
- `GET /api/posts/:id/comments` — Get all comments (if implemented)

### Categories
- `GET /api/categories` — List all categories
- `POST /api/categories` — Create a category

### Search
- `GET /api/posts/search?q=keyword` — Search posts by title/content

---

## 📸 Image Upload

- Uses Multer to handle file uploads.
- Endpoint: `POST /api/posts` with `multipart/form-data`
- Form field: `image`
- File size limit: 5MB
- Saved under: `server/uploads/`

---

## 🧪 Example Post Payload

```json
{
  "title": "React Server Components",
  "content": "React Server Components allow...",
  "excerpt": "Learn what server components are.",
  "category": "60fa8bc14c8b4c2e4c8e5abc",
  "tags": ["react", "server", "components"],
  "isPublished": true
}
```

---

## 🗃️ Sample Comment Payload

```json
{
  "text": "Great article! Very informative."
}
```

---

## 🛠 Scripts

### Backend

```bash
npm run dev     # Start backend with nodemon
```

### Frontend

```bash
npm start       # Start React dev server
```

---

## ❗ Notes

- Ensure MongoDB is running locally or via Atlas.
- Image uploads require a `uploads/` folder in `server/`.
- Make sure to seed or manually create categories before using them.

---

## 📜 License

MIT License

---

## 👤 Author

**CrazyCoder254**  
MERN Stack Developer  
[GitHub](https://github.com/CrazyCoder254)
