import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/database.js';
import productRoutes from './routes/products.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ---------------------------------------------------
// ⭐ FINAL CORS CONFIG FOR VERCEL + RENDER
// ---------------------------------------------------
const allowedOrigins = [
  "http://localhost:5173",
  "https://emi-marketplace.vercel.app",   // FRONTEND ON VERCEL
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Allow mobile apps, Postman
      if (allowedOrigins.includes(origin)) return callback(null, true);

      console.log("❌ CORS BLOCKED:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());

// ---------------------------------------------------
// Database Connection
// ---------------------------------------------------
connectDB();

// ---------------------------------------------------
// API ROUTES
// ---------------------------------------------------
app.use('/api/products', productRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server running properly 🚀' });
});

// ---------------------------------------------------
// SERVE FRONTEND (only if hosted together — optional)
// ---------------------------------------------------
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../frontend/dist');
  app.use(express.static(frontendPath));

  app.use((req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

// ----------
