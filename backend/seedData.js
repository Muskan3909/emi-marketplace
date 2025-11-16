import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const products = [
  {
    name: 'iPhone 17',
    slug: 'iphone-17',
    brand: 'Apple',
    category: 'Smartphones',
    description:'tiPhone 17 256 GB: 15.93 cm (6.3″) Display with Promotion, A19 Chip, Center Stage Front Camera for Smarter Group Selfies, Improved Scratch Resistance, All-Day Battery Life',
    base_price: 153900,
    mrp: 154900,
    rating: 7.8,
    reviews_count: 2456,
    variants: [
      { variant_name: 'Lavender 256GB', variant_type: 'storage-color', price_adjustment: 0, stock_quantity: 45, image_url: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-17-finish-select-202509-lavender_GEO_EMEA?wid=5120&hei=2880&fmt=webp&qlt=90&.v=WGdCRlQ0YVlqbTdXTEkxRnVQb0oxbGoraU1aeXdWbEh0SUtyMmtxWGg5dXdPVU4zTkFIWDYzNXNHVU44cTk4ajhLcXQxZ1h0QThIT2dnUm5qbGk5OUJkSERIUjY1Wk1Od3FtNjF6NFZLVXNYajN1aGR4R3ZYZVBDQm8zSlNqanBycDg5NlprcjhNSkY3UURyM0Y2UGJn&traceId=1', is_available: true },
      { variant_name: 'Sage 256GB', variant_type: 'storage-color', price_adjustment: 0, stock_quantity: 32, image_url: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-17-finish-select-202509-sage_GEO_EMEA?wid=5120&hei=2880&fmt=webp&qlt=90&.v=WGdCRlQ0YVlqbTdXTEkxRnVQb0oxZ3VBTlNROXF1MzBwZUoyNEVtMWw3aDQ5VWNJbUZTSkFodDQ1anBXVUVnSk9MekhWSGZtV1pvV240QzNuTk80VS9jVTIwcEJjL3Axby9SNE1La0phb1h5eFgwZnUzK2o2NmxjekV1UHpBT2c&traceId=1', is_available: true },
      { variant_name: 'Mist Blue 512GB', variant_type: 'storage-color', price_adjustment: 10000, stock_quantity: 28, image_url: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-17-storage-select-202509-mistblue?wid=5120&hei=2880&fmt=webp&qlt=90&.v=cVgyTFRHeEI2NnFsOEV6aTB4OG83NFVVTEF4WTZKMHBlZ3U4MnlNZ3c1a2hVTjJxZVhnK25qc0FnY3V1UmtkNE9UVDVQbVhkcDIxQlRzeDZXVVpQSzYyL0ZSTzZrMWlpUU5CQlpuNHNUZy95d09CZVF0QlpTODFjYSttM2l5bU4&traceId=1', is_available: true },
      { variant_name: 'Black 512GB', variant_type: 'storage-color', price_adjustment: 10000, stock_quantity: 15, image_url: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-17-finish-select-202509-black_GEO_EMEA?wid=5120&hei=2880&fmt=webp&qlt=90&.v=WGdCRlQ0YVlqbTdXTEkxRnVQb0oxa3pYQjBteGp2cFFHL09TNGhVUUhxeWo2VUVzcmZ5OEgyS012Ry8yTDQ1bTBoUVhuTWlrY2hIK090ZGZZbk9HeEJWb1BiTjRORlc1Y1lKU3JWempySktjazd3VTl3TzZzZTVUZkZybC92M1hmbW94YnYxc1YvNXZ4emJGL0IxNFp3&traceId=1', is_available: true }
    ],
    emiPlans: [
      { tenure_months: 3, interest_rate: 0, processing_fee: 0, cashback_amount: 2000, cashback_description: 'Get ₹2000 cashback', monthly_payment: 42633, total_amount: 129900, fund_name: 'HDFC Liquid Fund', is_featured: true },
      { tenure_months: 6, interest_rate: 0, processing_fee: 499, cashback_amount: 1500, cashback_description: 'Get ₹1500 cashback', monthly_payment: 21650, total_amount: 129900, fund_name: 'ICICI Prudential Liquid Fund', is_featured: false },
      { tenure_months: 9, interest_rate: 8.5, processing_fee: 999, cashback_amount: 1000, cashback_description: 'Get ₹1000 cashback', monthly_payment: 15233, total_amount: 137097, fund_name: 'SBI Liquid Fund', is_featured: false },
      { tenure_months: 12, interest_rate: 10.5, processing_fee: 1499, cashback_amount: 0, cashback_description: null, monthly_payment: 11758, total_amount: 141096, fund_name: 'Axis Liquid Fund', is_featured: false }
    ]
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    slug: 'samsung-s24-ultra',
    brand: 'Samsung',
    category: 'Smartphones',
    description: 'Samsung Galaxy S24 Ultra 5G AI Smartphone with Galaxy AI (Titanium Gray, 12GB, 256GB Storage), Snapdragon 8 Gen 3, 200 MP Camera with ProVisual Engine and 5000mAh Battery',
    base_price: 109999,
    mrp: 134999,
    rating: 4.7,
    reviews_count: 1823,
    variants: [
      { variant_name: 'Titanium Gray 256GB', variant_type: 'storage-color', price_adjustment: 0, stock_quantity: 38, image_url: 'https://m.media-amazon.com/images/I/717Q2swzhBL._SX679_.jpg', is_available: true },
      { variant_name: 'Titanium Violet 256GB', variant_type: 'storage-color', price_adjustment: 0, stock_quantity: 41, image_url: 'https://m.media-amazon.com/images/I/81M4zm2+0FL._SX679_.jpg', is_available: true },
      { variant_name: 'Titanium Black 256GB', variant_type: 'storage-color', price_adjustment: 15000, stock_quantity: 22, image_url: 'https://m.media-amazon.com/images/I/41CDymsLqvL._SY300_SX300_QL70_FMwebp_.jpg', is_available: true }
    ],
    emiPlans: [
      { tenure_months: 3, interest_rate: 0, processing_fee: 0, cashback_amount: 2500, cashback_description: 'Get ₹2500 cashback', monthly_payment: 31165, total_amount: 109995, fund_name: 'HDFC Liquid Fund', is_featured: true },
      { tenure_months: 6, interest_rate: 0, processing_fee: 499, cashback_amount: 2000, cashback_description: 'Get ₹2000 cashback', monthly_payment: 15764, total_amount: 109995, fund_name: 'ICICI Prudential Liquid Fund', is_featured: false },
      { tenure_months: 9, interest_rate: 9.0, processing_fee: 999, cashback_amount: 1500, cashback_description: 'Get ₹1500 cashback', monthly_payment: 10519, total_amount: 86999, fund_name: 'SBI Liquid Fund', is_featured: false },
      { tenure_months: 12, interest_rate: 11.0, processing_fee: 1499, cashback_amount: 0, cashback_description: null, monthly_payment: 8932, total_amount: 84999, fund_name: 'Axis Liquid Fund', is_featured: false }
    ]
  },
  {
    name: 'MacBook Air M3',
    slug: 'macbook-air-m3',
    brand: 'Apple',
    category: 'Laptops',
    description: 'Apple 2025 MacBook Air (13-inch, Apple M4 chip with 10-core CPU and 8-core GPU, 16GB Unified Memory, 256GB) - Starlight',
    base_price: 91990,
    mrp: 99900,
    rating: 4.9,
    reviews_count: 3102,
    variants: [
      { variant_name: 'Starlight 256GB', variant_type: 'storage-color', price_adjustment: 0, stock_quantity: 52, image_url: 'https://m.media-amazon.com/images/I/71XIkqkx+KL._SX679_.jpg', is_available: true },
      { variant_name: 'Sky Blue 256GB', variant_type: 'storage-color', price_adjustment: 2300, stock_quantity: 52, image_url: 'https://m.media-amazon.com/images/I/71pKJ+Mjd8L._SX679_.jpg', is_available: true },
      { variant_name: 'Silver 256GB', variant_type: 'storage-color', price_adjustment: 4500, stock_quantity: 52, image_url: 'https://m.media-amazon.com/images/I/711NKCLZfaL._SX679_.jpg', is_available: true },
      { variant_name: 'Midnight 256GB', variant_type: 'storage-color', price_adjustment: 4500, stock_quantity: 52, image_url: 'https://m.media-amazon.com/images/I/71CjP9jmqZL._SL1500_.jpg', is_available: true }
    ],
    emiPlans: [
      { tenure_months: 3, interest_rate: 0, processing_fee: 0, cashback_amount: 3000, cashback_description: 'Get ₹3000 cashback', monthly_payment: 38300, total_amount: 91990, fund_name: 'HDFC Liquid Fund', is_featured: true },
      { tenure_months: 6, interest_rate: 0, processing_fee: 799, cashback_amount: 2500, cashback_description: 'Get ₹2500 cashback', monthly_payment: 19150, total_amount: 91990, fund_name: 'ICICI Prudential Liquid Fund', is_featured: false },
      { tenure_months: 9, interest_rate: 7.5, processing_fee: 1299, cashback_amount: 2000, cashback_description: 'Get ₹2000 cashback', monthly_payment: 13522, total_amount: 95990, fund_name: 'SBI Liquid Fund', is_featured: false },
      { tenure_months: 12, interest_rate: 9.5, processing_fee: 1799, cashback_amount: 0, cashback_description: null, monthly_payment: 10383, total_amount: 95990, fund_name: 'Axis Liquid Fund', is_featured: false }
    ]
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert new data
    await Product.insertMany(products);
    console.log('✅ Successfully seeded 3 products with variants and EMI plans');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();