const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product'); 
const adminRoutes = require('./routes/admin');
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");     
const wishlistRoutes = require("./routes/wishlist");

const app = express();

// Middleware
app.use(express.json());

// ✅ CORS setup: allow both local dev + deployed frontend
const allowedOrigins = [
  "http://localhost:5173", // React local dev
  "https://smart-basket-frontend.vercel.app" // Deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);  
app.use("/api/admin", adminRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/wishlist", wishlistRoutes);

// MongoDB Connection & Start Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch(err => console.error('❌ MongoDB connection failed:', err));
