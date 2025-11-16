// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import https from "https";
import connectDB from "./config/database.js";
import productRoutes from "./routes/products.js";

dotenv.config();

const app = express();

// ==========================================
// CORS Configuration
// ==========================================
app.use(cors({
  origin: function(origin, callback) {
    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://emi-marketplace.vercel.app",
      "https://emi-marketplace-frontend.onrender.com",
      "https://emi-marketplace.onrender.com"
    ];
    
    // Allow requests with no origin (Postman, server-to-server)
    if (!origin) return callback(null, true);
    
    // Allow any .vercel.app or .onrender.com subdomain
    if (origin.endsWith('.vercel.app') || origin.endsWith('.onrender.com')) {
      return callback(null, true);
    }
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('⚠️  Origin not allowed:', origin);
      callback(null, true); // Allow anyway for now
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: false,
  optionsSuccessStatus: 200
}));

// Body parser
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Database connection
connectDB();

// ==========================================
// Routes
// ==========================================
// Root route
app.get("/", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "EMI Marketplace API is running",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      products: "/api/products",
      productBySlug: "/api/products/:slug"
    }
  });
});

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "Server is running",
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Product Routes
app.use("/api/products", productRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('💥 Server Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// ==========================================
// Keep-Alive Function (Prevent Render Sleep)
// ==========================================
const keepAlive = () => {
  const RENDER_URL = process.env.RENDER_URL || 'https://emi-marketplace.onrender.com';
  
  setInterval(() => {
    https.get(`${RENDER_URL}/api/health`, (res) => {
      if (res.statusCode === 200) {
        console.log('✅ Keep-alive ping successful');
      }
    }).on('error', (err) => {
      console.error('❌ Keep-alive error:', err.message);
    });
  }, 14 * 60 * 1000); // Ping every 14 minutes
};

// ==========================================
// Start Server
// ==========================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  
  // Start keep-alive in production
  if (process.env.NODE_ENV === 'production') {
    console.log('⏰ Keep-alive service started (pings every 14 minutes)');
    keepAlive();
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received, shutting down gracefully');
  process.exit(0);
});

export default app;
