# 🦷 Dental Center Management Dashboard (Frontend Only)

A fully responsive, role-based Dental Center Management system built with *React*, designed as a technical assignment for ENTNT. This system simulates patient and appointment management functionalities using localStorage, with separate access views for *Admin (Dentist)* and *Patient* users.

---

## 🚀 Live Demo

🌐 *Deployed Link:* [View Application] (https://dental-center-management-frontend.vercel.app/)
💻 *GitHub Repository:* [View Code] (https://github.com/Jaypatel0924/Dental-Center-Management-Frontend)

---

## 🔐 Login Credentials (Simulated Auth)

| Role    | Email              | Password    |
|---------|--------------------|-------------|
| Admin   | admin@entnt.in     | admin123    |
| Patient | john@entnt.in      | patient123  |

---

## 🧩 Features

### 🔑 Authentication (Simulated)
- Hardcoded users (Admin & Patient) with role-based login
- Session persistence with localStorage
- Protected routes using React Router

### 👩‍⚕ Admin Dashboard
- *Patient Management:* View/Add/Edit/Delete patients with full profile
- *Incident/Appointment Management:* 
  - Manage multiple incidents per patient
  - Fields: title, description, date/time, cost, status, treatment, next visit, and file uploads
- *Calendar View:* Weekly/Monthly overview of all appointments
- *KPI Dashboard:* Upcoming appointments, top patients, revenue, and treatment status

### 👤 Patient Dashboard
- View *only their own* appointments and treatment history
- File previews and treatment cost visibility

### 📦 Data Handling
- All data persisted using localStorage
- File uploads stored as base64/blob URLs

### 💡 UI/UX
- Responsive design for all screen sizes
- TailwindCSS for clean styling
- Custom components & form validation

---

## 🛠 Tech Stack

- *Frontend:* React (Functional Components)
- *Routing:* React Router v6
- *State Management:* React Context API
- *Styling:* TailwindCSS
- *Data Persistence:* Browser localStorage
- *Utilities:* Custom Hooks, Reusable Components, Form Validation

---

## ✅ Completed Checklist

* [x] Admin & Patient login system
* [x] Role-based route protection
* [x] Patient CRUD
* [x] Appointment management with file uploads
* [x] KPI Dashboard
* [x] Calendar view
* [x] Patient-only view
* [x] Fully responsive layout
* [x] Deployed on Vercel/Netlify
* [x] GitHub repo with meaningful commits

---

## ✨ Bonus Ideas (Optional Enhancements)

* Search & filter in patient/appointment lists
* Pagination or infinite scroll
* Light/Dark mode toggle
* Drag-and-drop calendar appointments

---

## 🧠 Technical Decisions

* Used **Context API** over Redux for simplicity and local-only state
* Stored data structures in `localStorage` with unique IDs
* File uploads stored as base64/Blob URLs to comply with no-backend constraint
* Separated logic into custom hooks and reusable components

---

## ⚠ Limitations

* No backend integration (as per requirement)
* No real authentication or encryption
* Data resets on browser clear

---


## 👨‍💻 Developed By

**Jay Patel**
[GitHub] (https://github.com/Jaypatel0924)

---


## 🚀 Getting Started

### 1. Clone Repo

bash
git clone https://github.com/Jaypatel0924/Dental-Center-Management-Frontend.git
cd Dental-dashboard


### 2. Install Dependencies

bash
npm install


### 3. Run Locally

bash
npm run dev


---

> 🔒 *Note: This is a technical assessment project and not intended for production use.*



---


