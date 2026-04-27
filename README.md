# content-broadcasting-system

# 📘 Content Broadcasting System (Backend)

## 🚀 Overview

The **Content Broadcasting System** is a backend application designed to manage, approve, schedule, and distribute educational content.

### 👥 Roles:

* **Teacher** → Uploads content
* **Principal** → Approves/Rejects & Schedules content
* **Student/Public** → Views approved content

The system ensures:

* Controlled content workflow
* Time-based broadcasting
* Conflict-free scheduling

---

# 🏗️ Tech Stack

* Node.js
* Express.js
* MySQL
* Prisma ORM
* JWT Authentication
* Multer (File Uploads)

---

# 📂 Project Structure

```id="b2m9fk"
src/
  config/
    prisma.js
    multer.js

  controllers/
    auth/
    content.controller.js
    schedule.controller.js

  services/
    auth/
    content.service.js
    schedule.service.js

  routes/
    auth/
    content.routes.js
    schedule.routes.js

  middlewares/
    auth.middleware.js
    role.middleware.js
    error.middleware.js

  utils/
    response.js

  app.js
  server.js
```

---

# 🔐 Authentication & Roles

### Roles:

* `TEACHER`
* `PRINCIPAL`

### Auth Flow:

1. Register
2. Login → Get JWT Token
3. Use token in headers:

```id="l9o9mw"
Authorization: Bearer <TOKEN>
```

---

# 📤 Content Workflow

1. Teacher uploads → `PENDING`
2. Principal:

   * Approves → `APPROVED`
   * Rejects → `REJECTED`
3. Only **APPROVED content**:

   * Can be scheduled
   * Is visible to students

---

# 📅 Scheduling Logic

* Only approved content allowed
* No overlapping schedules
* Subject-based scheduling
* Rotation order maintained
* Time-based display using:

  * `start_time`
  * `end_time`

---

# 🔁 Core Features

## ✅ Content Upload

* File upload using multer
* Supports PDF, image, video
* Stored locally

---

## ✅ Approval System

* Approve / Reject APIs
* Tracks:

  * approved_by
  * approved_at
  * rejection_reason
* Prevents re-approval or re-rejection

---

## ✅ Scheduling System

* Create schedules
* Prevent time conflicts
* Maintain rotation order
* Fetch current content
* View schedules

---

## ✅ Public Content Access

* Fetch only approved content
* Optional subject filtering

---

# 🌐 API Endpoints

---

## 🔐 Auth

### Register

POST /auth/register

### Login

POST /auth/login

---

## 📤 Content

### Upload Content (Teacher)

POST /content/upload

### Approve Content (Principal)

PATCH /content/approve/:id


### Reject Content (Principal)

PATCH /content/reject/:id


### Get Content by Status (Principal)

GET /content/status/:status

### Get Approved Content (Public / Students)

GET /content/approved
GET /content/approved?subject=Math

---

## 📅 Scheduling

### Create Schedule (Principal)

POST /schedule/create

### Get Current Content

GET /schedule/current?subject=Math

### Get All Schedules (Principal)

GET /schedule/all

### Get Schedules by Subject (Principal)

GET /schedule/by-subject?subject=Math

---

# 🧪 Sample Request

## Create Schedule

```json id="v0cw0o"
{
  "contentId": 1,
  "subject": "Math",
  "duration": 30,
  "startTime": "2026-04-27T10:00:00Z",
  "endTime": "2026-04-27T10:30:00Z"
}
```

---

# 📥 Sample Response

```json id="7b4k2w"
{
  "success": true,
  "message": "Schedule created",
  "data": {
    "id": 1,
    "subject": "Math"
  }
}
```

---

# ⚠️ Business Rules & Validations

* Only `PENDING` content can be approved/rejected
* Only `APPROVED` content can be scheduled
* Prevent duplicate scheduling of same content per subject
* Prevent time overlap conflicts
* Validate required fields
* Subject is required in schedule APIs

---

# 📦 Environment Variables

Create `.env` file:

```id="czl4g8"
PORT=5000
DATABASE_URL="mysql://user:password@localhost:3306/content_broadcast_db"
JWT_SECRET=your_secret_key
```

---

# ▶️ Run Project

```bash id="4t7u6r"
npm install
npx prisma migrate dev
npx prisma generate
npx nodemon src/server.js
```

---

# 🧠 Key Design Decisions

* **Service Layer Architecture** → separates business logic
* **Middleware-based auth** → reusable security
* **Prisma ORM** → clean database interaction
* **Structured API responses** → consistent frontend integration
* **Time-based querying** → real-world scheduling logic

---

# 🎯 What This Project Demonstrates

* Backend architecture design
* Role-based access control
* File upload handling
* Workflow management system
* Conflict resolution logic
* Time-based content delivery

---

# 🏁 Conclusion

This project represents a **real-world backend system** with:

* clean architecture
* strong business logic
* secure APIs
* scalable design