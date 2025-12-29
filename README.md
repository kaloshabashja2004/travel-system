# ✈️ Travel Booking System

Travel Booking System is a complete web application built using **React** that allows users to explore, search, and book travel trips with ease.

---

## 📌 Overview

The system supports **two roles**:
- **Users**
- **Admins**

It simulates a real-world travel booking platform with full booking logic, role-based access, and persistent data using **localStorage**.

---

## 👤 User Features

Users can:
- Explore and search available trips
- Register and log in
- View and manage their profile
- Book one or more tickets per trip
- Manage bookings through a dedicated **My Bookings** page
- Cancel or update ticket quantities

All user data and bookings are stored in **localStorage**, ensuring session persistence even after refreshing the page.

---

## 🛠️ Admin Features

Admins have access to a **protected dashboard** where they can:
- View full system statistics (users, trips, bookings)
- Add new trips
- Edit or delete existing trips
- Monitor total and available seats per trip
- Cancel user bookings
- View detailed information about all registered users

Only users with the **admin role** can access the dashboard.

---

## 🎨 UI & Design

- Modern **card-based** trip layout
- Landing page with a **background image**
- Smooth and simple **animations**
- Fully **responsive design**
- Clean and user-friendly interface

---

## 🧠 Technologies Used

- **React** (Vite)
- **JavaScript (ES6)**
- **CSS3**
- **LocalStorage** for data persistence

---

## 🎯 Purpose

This project was developed as part of a **university assignment** to demonstrate:
- Front-end architecture
- State management
- Role-based access control
- Real-world application logic using React

---

## 🚀 How to Run the Project

```bash
npm install
npm run dev
```

Then open your browser at:

```
http://localhost:5173
```

---

## 📁 Project Structure (Simplified)

```
src/
├── assets
├── components
├── data
├── styles
├── views
├── App.jsx
└── main.jsx
```
