import { Star, TrendingUp, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, darkMode = false }) => {
  const mrp = product.mrp || 0;
  const price = product.base_price || 0;
  const discount = mrp > 0 ? Math.round(((mrp - price) / mrp) * 100) : 0;
  const firstVariant = product.variants?.[0];

  return (
    <Link
      to={`/products/${product.slug}`}
      className={`block rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1 h-full
        ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}
    >
      <div className={`relative h-52 sm:h-60 md:h-64 flex items-center justify-center ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow">
            <Sparkles className="w-3 h-3 inline mr-1" />
            {discount}% OFF
          </div>
        )}

        {product.rating >= 4.7 && (
          <div className="absolute top-3 right-3 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold shadow">
            ⭐ Bestseller
          </div>
        )}

        <img
          src={firstVariant?.image_url || "https://via.placeholder.com/400"}
          alt={product.name}
          className="w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-105"
          onError={(e) => (e.target.src = "https://via.placeholder.com/400x400?text=Product")}
        />
      </div>

      <div className="p-4 flex flex-col justify-between h-[220px] sm:h-[230px] md:h-[240px]">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className={`text-xs font-semibold ${darkMode ? "text-indigo-300" : "text-indigo-600"}`}>{product.brand}</span>
            <span className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              {product.category}
            </span>
          </div>

          <h3 className={`text-sm sm:text-base font-semibold mb-2 line-clamp-2 min-h-[42px] ${darkMode ? "text-white" : "text-gray-900"}`}>
            {product.name}
          </h3>

          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center bg-green-600 text-white px-2 py-1 rounded-md text-xs font-bold">
              <span>{product.rating ?? "—"}</span>
              <Star className="w-3 h-3 ml-1 fill-current" />
            </div>
            <span className={`${darkMode ? "text-gray-400 text-xs" : "text-gray-600 text-xs"}`}>
              ({product.reviews_count?.toLocaleString() || "0"})
            </span>
          </div>

          <div className="mb-2">
            <div className="flex items-baseline gap-2">
              <span className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>₹{price.toLocaleString("en-IN")}</span>
              <span className="text-xs line-through text-gray-500">₹{mrp.toLocaleString("en-IN")}</span>
            </div>
            {mrp > price && <p className="text-xs text-green-600 font-semibold">Save ₹{(mrp - price).toLocaleString("en-IN")}</p>}
          </div>
        </div>

        <div className={`flex items-center justify-between p-2 rounded-lg ${darkMode ? "bg-gray-700 border border-gray-600" : "bg-indigo-50 border border-indigo-200"}`}>
          <div className="flex items-center gap-2">
            <TrendingUp className={`w-4 h-4 ${darkMode ? "text-indigo-300" : "text-indigo-700"}`} />
            <div>
              <p className={`text-xs ${darkMode ? "text-gray-300" : "text-gray-600"}`}>EMI from</p>
              <p className="text-sm font-bold">₹{Math.round(price / 12).toLocaleString("en-IN")}/mo</p>
            </div>
          </div>
          <span className={`text-xs font-bold ${darkMode ? "text-indigo-300" : "text-indigo-700"}`}>View →</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
