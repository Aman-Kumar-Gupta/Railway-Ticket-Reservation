# Railway Ticket Reservation

A mini project for CS2202: Database Systems, implementing a simplified Railway Reservation System using MySQL and a backend service. This project covers database design, ER modeling, and backend integration with SQL.

# Project Structure
📄 SQL_Schema.sql – MySQL schema with table creation and constraints

🧠 ER_Diagram.mwb – ER model (MySQL Workbench file)

📦 backend/ – Folder for backend implementation (Node.js/Flask/etc.)

📄 README.md – Project documentation (this file)

This repository contains a **full-stack web application** with:

- **Frontend:** React + Tailwind CSS
- **Backend:** Express.js + MySQL

## **Getting Started**

### **Prerequisites**

Ensure you have the following installed:

- Node.js (v18+ recommended)
- npm or yarn
- nodemon

---

## Backend Setup 

### **1.Navigate to backend**

```sh
cd backend
```

### 2.Install backend dependencies and start server

```sh
npm install
npx nodemon
```


## Frontend Setup

### **1.Navigate to frontend**

```sh
cd frontend
```

### 2.Install frontend dependencies and start server

```sh
npm install
npm run dev 
```

# Features
Add new passengers

Add trains, routes, and stations

Add different classes per train (e.g., Sleeper, AC)

Dynamic seat allocation per class

Book tickets (generates PNR)

View tickets using PNR

Calculate fares based on class

Track payment information

# Database Design
Key Entities:

Passenger

Train

Station

Route

Schedule

Class

Seat

Ticket

SeatAvailability

Payment

Concession