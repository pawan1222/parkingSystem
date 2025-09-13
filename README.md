# 🚗 Parking System

A modern, full-stack Parking Slot Reservation System built with **React**, **Node.js**, and **Express**. Users can book parking slots, manage lots, and view booking history with a clean, responsive interface.

---

## ✨ Features

- **User Authentication:** Secure registration & login with JWT.
- **Role-Based Access:** Admin and user dashboards.
- **Parking Lot Management:** Add, edit, and view lots and slots.
- **Slot Booking:** Real-time slot availability and booking.
- **Booking History:** View and manage past reservations.
- **Responsive UI:** Built with Tailwind CSS for mobile and desktop.
- **RESTful API:** Clean separation of frontend and backend.

---

## 🗂️ Frontend Structure (`frontend/`)

```
frontend/
│
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── context/
│   ├── pages/
│   │   ├── AddLots.jsx
│   │   ├── Booking.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Lots.jsx
│   │   ├── Navbar.jsx
│   │   ├── Register.jsx
│   │   ├── Slots.jsx
│   │   ├── TicketHistory.jsx
│   │   ├── ViewLots.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
```

---

## 🗂️ Backend Structure (`backend/`)

```
backend/
│
├── controllers/
│   ├── booking.controller.js
│   ├── parkingLot.controller.js
│   ├── slot.controller.js
│   ├── user.controller.js
│   └── vehicle.controller.js
├── db/
│   └── index.js
├── middleware/
│   ├── admin.middleware.js
│   └── user.middleware.js
├── models/
│   ├── booking.model.js
│   ├── parkingLot.model.js
│   ├── slot.model.js
│   ├── user.model.js
│   └── vehicle.model.js
├── node_modules/
├── routes/
│   ├── booking.route.js
│   ├── parkingLot.route.js
│   ├── slot.route.js
│   ├── user.route.js
│   └── vehicle.route.js
├── utils/
│   └── generateToken.js
├── .env
├── app.js
├── package-lock.json
├── package.json
└── server.js
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/ParkingSystem-main.git
cd ParkingSystem-main
```

### 2. Backend Setup

```sh
cd backend
npm install
# Create a .env file with your environment variables
npm run dev
```

### 3. Frontend Setup

```sh
cd frontend
npm install
npm run dev
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
```
PORT=4000
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=your_jwt_secret
DB_URI=your_mongodb_uri
```

### Frontend (`frontend/.env`)
```
VITE_BASE_URL=http://localhost:4000
```

---

## 🌐 Deployment on Render

1. **Build the Frontend:**
   ```sh
   cd frontend
   npm run build
   ```
2. **Push your code to GitHub.**
3. **Create a new Web Service on Render:**
   - Root directory: `backend`
   - Start command: `npm start`
   - Set environment variables (`PORT`, `CORS_ORIGIN`, `JWT_SECRET`, etc.)
4. **Backend will serve the frontend build automatically in production.**

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB
- **Authentication:** JWT
- **Deployment:** Render

---

