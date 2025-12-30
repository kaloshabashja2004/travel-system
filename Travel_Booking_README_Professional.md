# Travel Booking System

## Overview
The **Travel Booking System** is a single-page web application built with **React** that allows users to browse trips, book tickets, manage profiles, and track bookings.  
It also includes a fully functional **Admin Dashboard** for managing users, trips, bookings, and analytics.

The application is designed as a front-end–focused project using **LocalStorage** as a mock database, making it suitable for academic projects, demos, and learning purposes.

---

## Technologies Used
- **React.js** (Functional Components & Hooks)
- **JavaScript (ES6+)**
- **CSS (Custom Design System)**
- **LocalStorage** (Client-side persistence)
- **Vite** (Development server & build tool)

---

## Application Architecture
The app follows a **component-based architecture** with centralized state management at the `App.jsx` level.

- `App.jsx` controls:
  - Page navigation
  - Authentication state
  - Role-based access
- Views are rendered conditionally instead of using React Router.
- Data persistence is handled via `localStorage`.

---

## Main Features

### 1. User Features
- User registration and login
- Browse available trips
- Search, filter, and paginate trips
- Book trips with ticket selection
- Wishlist functionality
- Profile management (edit personal data)
- View and manage personal bookings

### 2. Admin Features
- Role-based access control
- User management (ban / unban users)
- Trip management (add, approve, delete trips)
- Booking management (edit or cancel any booking)
- Trip analytics (tickets sold, revenue, occupancy)

---

## Core Pages & Components

### App.jsx
- Central application controller
- Handles:
  - Page switching
  - Authentication state
  - Persistent user session
- Renders all views conditionally

---

### TripList.jsx
- Displays all **approved trips**
- Features:
  - Search by title or location
  - Filters (price, duration, availability)
  - Pagination
  - Booking logic
  - Wishlist integration

---

### ProfilePage.jsx
- Displays logged-in user data
- Supports:
  - Edit profile
  - Save changes to LocalStorage
  - Navigate to bookings
  - Logout

---

### MyBookings.jsx
- Shows all bookings for the logged-in user
- Allows:
  - Increase or decrease tickets
  - Cancel bookings
- Automatically updates trips availability

---

### AdminDashboard.jsx
- Restricted to admin users only
- Sections:
  - User Management
  - Trip Analytics
  - Add Trip
  - Trips Management
  - Bookings Management
- All admin actions sync directly with LocalStorage

---

## State Management
- `useState` is used for local component state
- `useEffect` synchronizes data with LocalStorage
- Authentication and navigation state are lifted to `App.jsx`

---

## Data Storage (LocalStorage)
The application stores data locally under these keys:
- `users`
- `currentUser`
- `trips`
- `bookings`
- `wishlist`

This approach simulates a backend for educational purposes.

---

## Project Structure
```
src/
│── components/
│   └── Navbar.jsx
│
│── views/
│   ├── LandingPage.jsx
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── TripList.jsx
│   ├── ProfilePage.jsx
│   ├── MyBookings.jsx
│   └── AdminDashboard.jsx
│
│── data/
│   └── trips.js
│
│── styles/
│   └── main.css
│
│── App.jsx
│── main.jsx
```

---

## How to Run the Project
1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open the browser at:
```
http://localhost:5173
```

---

## Notes
- This project does **not** use a real backend.
- All data resets when LocalStorage is cleared.
- Designed for learning React fundamentals, state handling, and UI structuring.

---

## Author
Developed as an academic and learning project for practicing **React**, **UI design**, and **application architecture**.
