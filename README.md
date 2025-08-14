# 🛍️ Full-Stack E-Commerce Website

A **fully functional, responsive, and secure E-Commerce platform** built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js).  
It offers **seamless product browsing, shopping cart, wishlist, secure checkout, OTP authentication**, and a **dedicated admin panel** for inventory & order management.

---

## ✨ Features

### 🧑‍💻 **User Features**
- **Account Management**
  - Signup with OTP verification via email.
  - Secure login with JWT authentication.
  - Session persistence (auto-login until logout).
  - **Editable Account Page** – Users can update profile information such as name, contact number, and address.
- **Product Browsing**
  - Search products by name/category.
  - Filter products by price, category, etc.
  - Responsive product grid with images and details.
- **Shopping Cart**
  - Add/remove products.
  - Update product quantities.
  - View total price dynamically.
- **Wishlist**
  - Save favorite products for later.
  - Remove items anytime.
- **Order Management**
  - Secure checkout process.
  - Order confirmation & tracking.
  - **Cancel orders before shipment.**
  - **Request return for delivered orders.**

---

### 👨‍💼 **Admin Features**
- **Product Management**
  - Add, edit, and delete products.
  - View products in a **4-column grid**.
- **Inventory Control**
  - Manage stock availability.
- **Order Management**
  - View all customer orders.
  - Approve/reject cancellations & returns.
  - Update order statuses.
- **Access Control**
  - Role-based routing (only admins can access admin panel).
  - Protected backend APIs.

---

### 🎨 **UI/UX**
- Fully **responsive** across mobile, tablet, and desktop.
- Clean, modern layout with consistent theming.
- Dynamic navigation menu.
- No unnecessary reloads (SPA).

---

### 🔐 **Security**
- **JWT-based authentication** for secure API access.
- **Role-based access control** for admin and user routes.
- **OTP verification** for signup to prevent fake accounts.

---

## 🛠 Tech Stack

**Frontend**
- React.js (Vite + TailwindCSS)
- CSS (Custom styling)
- React Router DOM
- Context API + `useReducer` for cart & wishlist state

**Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Nodemailer (for OTP emails)

**Database**
- MongoDB Atlas (Cloud-hosted)

---

## 📂 Project Structure
ecommerce-website/
│
├── backend/
│ ├── controllers/ # Controller files - handle API logic separately from routes
│ ├── models/ # Mongoose models (User, Product, Order, etc.)
│ ├── routes/ # API routes (auth, products, cart, wishlist, admin, orders)
│ ├── middleware/ # Authentication & role-based access control
│ ├── utils/ # Helper functions (e.g., OTP generation)
│ ├── server.js # Entry point
│
├── frontend/
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Pages (Home, Shop, Cart, Wishlist, Account, Admin, Orders)
│ │ ├── context/ # Cart & Wishlist Contexts
│ │ ├── App.js
│ │ ├── index.js
│
├── package.json
├── README.md

---

🔒 Authentication Flow

**Signup**
User enters details → OTP sent via email → OTP verified → Account created.

**Login**
JWT token generated → stored in localStorage.

**Protected Routes**
Checked via backend middleware before granting access.
