# 🚀 GigFlow – Freelancer Marketplace

GigFlow is a full-stack freelance marketplace where clients can post projects and freelancers can submit proposals and get hired.

## ✨ Features

* 🔐 User registration & login
* 🔑 JWT authentication with HTTP-only cookies
* 📋 Create and browse freelance gigs
* 🔍 Search available projects
* 💼 Submit proposals with price & message
* 🤝 Hire freelancers
* 📊 Track gig and proposal status
* 📱 Responsive React UI

## 🛠️ Tech Stack

**Frontend**

* React
* TypeScript
* Vite
* Tailwind CSS
* Axios

**Backend**

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs

## 🏗️ Project Structure

```text
GigFlow/
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── App.tsx
│
└── README.md
```

## 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/Suraj2429/GigFlow_Freelancer_Platform.git
cd GigFlow_Freelancer_Platform
```

### Backend

```bash
cd backend
npm install
```

Create `.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Run backend:

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

Backend will run on:

```text
http://localhost:5000
```

## 🔄 Workflow

```text
Client → Create Gig
          ↓
Freelancers → Browse & Submit Proposals
          ↓
Client → Review Proposals
          ↓
Client → Hire Freelancer
          ↓
Gig → Assigned
```

## 📡 Main API Endpoints

| Method | Endpoint                | Description        |
| ------ | ----------------------- | ------------------ |
| POST   | `/api/auth/register`    | Register user      |
| POST   | `/api/auth/login`       | Login user         |
| GET    | `/api/gigs`             | Get available gigs |
| POST   | `/api/gigs`             | Create gig         |
| POST   | `/api/bids`             | Submit proposal    |
| GET    | `/api/bids/:gigId`      | Get proposals      |
| PATCH  | `/api/bids/:bidId/hire` | Hire freelancer    |

## 🎯 Purpose

GigFlow was built to demonstrate full-stack development using **React, TypeScript, Node.js, Express, MongoDB, REST APIs, and JWT authentication**.

## 👨‍💻 Author

**Suraj Patil**

[GitHub](https://github.com/Suraj2429)

[Project Repository](https://github.com/Suraj2429/GigFlow_Freelancer_Platform)
