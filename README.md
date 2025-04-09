# 🎓 Learning Management System (LMS)

A full-stack **Learning Management System** (LMS) built using **TypeScript**, **Next.js**, **Express.js**, and **MongoDB**. The application is divided into two main panels:

- 🧑‍💼 **Admin Dashboard** – For managing course content, modules, and lectures.
- 👩‍🎓 **User Panel** – For users to browse courses, watch lectures, and track their progress.

---

## 🚀 Tech Stack

| Layer     | Tech Stack                                |
|-----------|--------------------------------------------|
| Frontend  | Next.js (TypeScript), Tailwind CSS         |
| Backend   | Express.js with MVC Architecture           |
| Database  | MongoDB (Mongoose for ODM)                 |
| Package Manager | Yarn                                 |

---

## ✅ Features Implemented (Based on Given Requirements)

### 🧑‍💼 Admin Dashboard

> 🔐 Authentication Required

#### 📚 Course Management
- Upload new courses with:
  - ✅ Thumbnail (image)
  - ✅ Title
  - ✅ Price
  - ✅ Description
- ✅ Display courses in a grid layout with thumbnails and brief info.
- ✅ Dynamic routing: Clicking on a course opens its respective **Module & Lecture Management** page.

#### 🧩 Module & Lecture Management
- ✅ Add new modules with:
  - Title
  - Auto-incremented Module Number
- ✅ Add lectures under modules with:
  - Title
  - YouTube Video URL support
  - Multiple PDF notes (upload supported)
- ✅ Perform full CRUD operations for modules and lectures.

---

### 👩‍🎓 User Panel

#### 📘 Course Details Page
- ✅ Dynamically display course info:
  - Thumbnail
  - Title
  - Price
  - Description
- ✅ Additional sections (static): reviews, instructor details

#### 🎥 Lecture Page
- ✅ Display modules in numbered & expandable list
- ✅ Search bar to filter lectures by title
- ✅ Sequential unlocking of lectures:
  - Only after completing the current lecture, the next one is unlocked
- ✅ Video streaming support via embedded YouTube links
- ✅ PDF Notes (multiple per lecture) available for view/download
- ✅ Progress tracking with:
  - Checkmarks or visual progress bar

---

## 📱 Responsive UI

- ✅ Fully responsive across all screen sizes
- ✅ Built with Tailwind CSS using modern and polished UI/UX practices

---

## 🧱 Backend Architecture

- ✅ Follows **MVC pattern**:
  - `routes/` – All endpoints
  - `controllers/` – Logic for handling routes
  - `models/` – Mongoose schemas
  - `services/` – Business logic and helpers

---

## 🔄 Dynamic Content

- ✅ All user-facing content (courses, modules, lectures) is **fetched directly from admin uploads** ensuring real-time updates.

---

## 🔐 Test Credentials

| Role  | Email                  | Password   |
|-------|------------------------|------------|
| Admin | `admin@gmail.com`      | `admin123` |
| User  | `rockydey23@gmail.com` | `12345678` |

---

## 🛠 Installation & Running Locally

```bash
# Clone the repository
git clone https://github.com/your-username/learning-management-system.git

# Navigate into the project
cd learning-management-system

# Install dependencies
yarn install

# Run frontend (Next.js)
yarn dev

# Run backend (Express)
yarn server
