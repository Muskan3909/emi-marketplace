import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
  variant_name: { type: String, required: true },
  variant_type: { type: String, required: true },
  price_adjustment: { type: Number, default: 0 },
  stock_quantity: { type: Number, default: 0 },
  image_url: String,
  is_available: { type: Boolean, default: true }
});

const emiPlanSchema = new mongoose.Schema({
  tenure_months: { type: Number, required: true },
  interest_rate: { type: Number, required: true },
  processing_fee: { type: Number, default: 0 },
  cashback_amount: { type: Number, default: 0 },
  cashback_description: String,
  monthly_payment: { type: Number, required: true },
  total_amount: { type: Number, required: true },
  mutual_fund_backed: { type: Boolean, default: true },
  fund_name: String,
  is_featured: { type: Boolean, default: false }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  description: String,
  base_price: { type: Number, required: true },
  mrp: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  reviews_count: { type: Number, default: 0 },
  variants: [variantSchema],
  emiPlans: [emiPlanSchema]
}, { timestamps: true });

export default mongoose.model('Product', productSchema);