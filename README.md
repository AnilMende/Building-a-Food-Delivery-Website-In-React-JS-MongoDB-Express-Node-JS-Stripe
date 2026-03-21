# 🍔 Food Delivery Web Application

A full-stack food delivery platform that allows users to browse restaurants, place orders, and manage deliveries efficiently. Built with a focus on scalability, user experience, and real-world backend challenges.

---

##  Live Demo
Live Demo :  [ https://frontend-food-del-y3y9.onrender.com ]  
Admin Panel Url : [https://food-del-admin-ueg0.onrender.com]

 Demo Credentials:  
- User: test@user.com / password  
---

## 📌 Problem Statement

Food delivery systems require efficient handling of:
- High user traffic  
- Real-time order management  
- Secure payments and user authentication  

This project aims to simulate a real-world food delivery platform with optimized backend operations and a seamless user experience.

---

##  Features

###  User Authentication
- Secure login & registration (JWT-based)
- Protected routes
- User session management

---

### 🍽️ Food & Restaurant Browsing
- View restaurants and menus
- Search and filter food items
- Category-based navigation

---

### 🛒 Cart & Order Management
- Add/remove items from cart
- Dynamic cart updates
- Place orders with order summary

---

### 📦 Order Tracking (Basic / Extendable)
- View order history
- Track order status (Pending, Completed)

---

###  Admin Panel
- Add/edit/delete food items
- Manage orders
- Update order status

---

### Backend Features
- RESTful API design
- Input validation & error handling
- Middleware-based authentication
- Secure data handling

---

## Tech Stack

### Frontend
- React.js
- Tailwind CSS / CSS
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB (MongoDB Atlas)

### Tools & Deployment
- Git & GitHub
- Vercel / Netlify (Frontend)
- Render / Railway (Backend)

---

## System Design Overview

### Key Considerations:
- **Scalability:** Modular backend for handling increasing users  
- **Performance:** Efficient API calls and optimized database queries  
- **Data Integrity:** Ensures correct order processing and storage  

---

## API Endpoints (Sample)

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Food
- `GET /api/food`
- `POST /api/food` (Admin)
- `PUT /api/food/:id`
- `DELETE /api/food/:id`

### Cart
- `POST /api/cart`
- `GET /api/cart`
- `DELETE /api/cart/:id`

### Orders
- `POST /api/orders`
- `GET /api/orders/user`
- `PUT /api/orders/:id` (Admin)

---

## 📂 Folder Structure
/client → Frontend (React)
/server
├── controllers
├── routes
├── models
├── middleware
├── utils

## Future Improvements

- Real-time order tracking using WebSockets  
- Payment gateway integration (Stripe/Razorpay)  
- Location-based delivery tracking  
- Recommendation system using AI  

---

## What I Learned

- Building scalable REST APIs  
- Managing application state and user flows  
- Handling real-world scenarios like order lifecycle  
- Structuring full-stack applications professionally  

---

## Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/food-delivery-app.git

# Install dependencies
cd server
npm install

cd client
npm install

# Run application
npm run dev
