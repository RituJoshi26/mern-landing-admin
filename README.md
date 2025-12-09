# MERN Landing Page with Admin Dashboard

A full-stack MERN (MongoDB, Express, React, Node.js) application that provides a modern, responsive landing page along with an Admin Dashboard to manage projects, clients, contact messages, and newsletter subscribers.

---

## 🚀 Features

### Frontend (React + Vite)
- Beautiful, responsive landing page
- Projects showcase section
- Client testimonials
- Contact form with message support
- Newsletter subscription form
- Admin dashboard interface

### Backend (Node.js + Express + MongoDB)
- REST API for:
  - Projects
  - Clients
  - Contacts
  - Newsletter Subscribers
- Image upload using Multer
- MongoDB Atlas / Local MongoDB support

---

## 📁 Project Structure

mern-landing-admin/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── uploads/
│ ├── server.js
│ └── .env
├── frontend/
│ ├── src/
│ ├── public/
│ └── .env
└── README.md

yaml
Copy code

---

## ⚙️ Prerequisites

Install the following before running the project:
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account or Local MongoDB

---

## 🔧 Backend Setup (Step-by-step)

1. Open terminal and move into backend folder:

```bash
cd backend
Install dependencies:

bash
Copy code
npm install
Create a .env file inside the backend folder with this content:

env
Copy code
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>?retryWrites=true&w=majority
BASE_URL=http://localhost:5000
Start the backend server:

bash
Copy code
npm run dev
✅ Backend will run at:

arduino
Copy code
http://localhost:5000
🎨 Frontend Setup (Step-by-step)
Open a new terminal and go to frontend folder:

bash
Copy code
cd frontend
Install dependencies:

bash
Copy code
npm install
Create a .env file inside frontend folder:

env
Copy code
VITE_API_URL=http://localhost:5000
Start frontend:

bash
Copy code
npm run dev
✅ Frontend will run at:

arduino
Copy code
http://localhost:5173
🧪 Demo Data for Admin Panel
Use this to test your admin panel:

Sample Project
pgsql
Copy code
Project Name: E-Commerce Website
Description: A fully responsive online store with payments and admin control.
Image: Upload any project image (jpg/png)

Sample Client
vbnet
Copy code
Name: Priya Sharma
Designation: Marketing Manager, TechSpark
Description: Amazing experience working with this team. Highly recommended!
Image: Upload a profile picture
