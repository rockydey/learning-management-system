# 🎓 Learning Management System (LMS)

A full-stack Learning Management System built with **Next.js**, **TypeScript**, **Express.js**, and **MongoDB**.  
This system features two main panels:
- 🧑‍💼 **Admin Dashboard** – for managing courses, modules, and lectures.
- 👩‍🎓 **User Panel** – for viewing and tracking course progress.

---

## 🚀 Tech Stack

| Layer       | Technology                            |
|-------------|----------------------------------------|
| Frontend    | Next.js (TypeScript), Tailwind CSS     |
| Backend     | Express.js (Node.js)                   |
| Database    | MongoDB with Mongoose ODM              |
| Architecture| MVC (Model-View-Controller)            |
| Package Manager | Yarn                              |

---

## ✨ Features

This website provides the following functionalities:

---

### 🧑‍💼 Admin Dashboard

🔐 **Authentication Required**

#### 📚 Course Management
- Upload new courses with:
  - ✅ Thumbnail (image)
  - ✅ Title
  - ✅ Price
  - ✅ Description
- ✅ Display courses in a grid layout with thumbnails and basic info
- ✅ Dynamic routing: Clicking on a course navigates to its Module & Lecture Management page

#### 🧩 Module & Lecture Management
- ✅ Create modules with:
  - Title
  - Auto-incremented Module Number
- ✅ Add lectures under modules with:
  - Title
  - YouTube Video URL support
  - Multiple PDF notes (upload supported)
- ✅ Full CRUD operations for both modules and lectures

---

### 👩‍🎓 User Panel

#### 📘 Course Details Page
- ✅ Display full course information:
  - Thumbnail
  - Title
  - Price
  - Description
- ✅ Additional static sections:
  - Instructor information
  - Reviews

#### 🎥 Lecture Page
- ✅ Numbered modules with expandable lecture lists
- ✅ Search bar to filter lectures by title
- ✅ Sequential unlocking:
  - Only the next lecture is unlocked after the current one is completed
- ✅ Embedded video streaming support via YouTube
- ✅ PDF Notes available for download/view (multiple files per lecture)
- ✅ Progress tracking using checkmarks or progress bar

---

### 📱 Responsive Design

- ✅ Fully responsive across all screen sizes (mobile, tablet, desktop)
- ✅ Built using Tailwind CSS with a modern and clean UI

---

### 🧱 Backend Architecture

- ✅ Follows **MVC Architecture**:
  - `routes/` – Handles endpoints
  - `controllers/` – Contains route logic
  - `models/` – MongoDB schemas (via Mongoose)
  - `services/` – Business logic and utilities

---

### 🔄 Dynamic Content

- ✅ All user-facing content (courses, modules, lectures) is fully dynamic and reflects real-time data added from the admin panel

---

## 🧪 Test Credentials

| Role  | Email                     | Password  |
|-------|---------------------------|-----------|
| Admin | `admin@gmail.com`         | `admin123`|
| User  | `rockydey23@gmail.com`    | `12345678`|

---

## 📦 Getting Started

```bash
# Install dependencies
yarn install

# Run frontend (Next.js)
yarn dev

# Run backend (Express)
cd server
yarn install
yarn dev
