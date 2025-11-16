# 🛍️ EMI Product Marketplace

A modern full-stack web application for purchasing products with flexible EMI plans backed by mutual funds.

## 🌟 Features

- 💳 Multiple EMI plans with 0% interest options
- 🎨 Beautiful, responsive UI with Tailwind CSS
- 🔄 Dynamic product pages with unique URLs
- 💰 Real-time price calculations
- 🎁 Cashback offers on selected plans
- 📱 Mobile-friendly design

## 🛠️ Tech Stack

**Frontend:**
- React 18
- React Router DOM
- Tailwind CSS
- Axios
- Vite

**Backend:**
- Node.js
- Express.js
- MongoDB
- CORS

**Deployment:**
- Frontend: Render
- Backend: Render
- Database: Mongodb Atlas

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18+)
- PostgreSQL or MongoDB
- Git

### Backend Setup

1. Clone the repository:
```bash
git clone 
cd emi-marketplace/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=5000
DATABASE_URL=your_database_url
FRONTEND_URL=http://localhost:5173
```

4. Initialize database:
```bash
# For PostgreSQL, run the schema.sql file
psql -U username -d emi_marketplace -f schema.sql
```

5. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend:
```bash
cd ../frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start development server:
```bash
npm run dev
```

5. Open browser at `http://localhost:5173`

## 🔌 API Endpoints

### GET /api/products
Retrieve all products with basic information.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "iPhone 17 Pro",
      "slug": "iphone-17-pro",
      "brand": "Apple",
      "category": "Smartphones",
      "base_price": 129900,
      "mrp": 134900,
      "rating": 4.8,
      "reviews_count": 2456,
      "variants": [...]
    }
  ]
}
```

### GET /api/products/:slug
Retrieve detailed information for a specific product.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "iPhone 17 Pro",
    "slug": "iphone-17-pro",
    "description": "The latest iPhone...",
    "base_price": 129900,
    "mrp": 134900,
    "variants": [
      {
        "id": 1,
        "variant_name": "Silver 256GB",
        "price_adjustment": 0,
        "image_url": "..."
      }
    ],
    "emiPlans": [
      {
        "id": 1,
        "tenure_months": 3,
        "interest_rate": 0,
        "monthly_payment": 42633,
        "total_amount": 129900,
        "cashback_amount": 2000
      }
    ]
  }
}
```

## 🗄️ Database Schema

### Products Table
- `id` (Primary Key)
- `name`, `slug`, `brand`, `category`
- `description`, `base_price`, `mrp`
- `rating`, `reviews_count`
- `created_at`, `updated_at`

### Product Variants Table
- `id` (Primary Key)
- `product_id` (Foreign Key)
- `variant_name`, `variant_type`
- `price_adjustment`, `stock_quantity`
- `image_url`, `is_available`

### EMI Plans Table
- `id` (Primary Key)
- `product_id` (Foreign Key)
- `tenure_months`, `interest_rate`
- `processing_fee`, `cashback_amount`
- `monthly_payment`, `total_amount`
- `fund_name`, `is_featured`

## 🌐 Live Demo

- **Frontend:** https://emi-marketplace-frontend.onrender.com
- **Backend API:** https://emi-marketplace.onrender.com
- **Demo Video:** https://drive.google.com/file/d/1ARMSdysFfW5zTAI_MInezmfl-T_5ZyFe/view?usp=drive_link

## 📸 Screenshots

[Add your screenshots here]

## 👤 Author

MUSKAN KUSHWAHA - https://github.com/Muskan3909

