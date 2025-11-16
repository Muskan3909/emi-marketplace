import { useEffect, useState } from "react";
import { productAPI } from "../services/api";
import ProductCard from "../components/ProductCard";
import { Loader2, Search, SlidersHorizontal } from "lucide-react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // detect dark mode from <html> and listen for changes
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));
  useEffect(() => {
    const obs = new MutationObserver(() => setIsDark(document.documentElement.classList.contains("dark")));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, selectedCategory, products]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await productAPI.getAllProducts();
      const data = res?.data?.data ?? res?.data ?? [];
      setProducts(data);
      setFilteredProducts(data);
      setError(null);
    } catch (err) {
      console.error("fetchProducts error:", err);
      setError("Failed to load products. Please try again later.");
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter((p) => {
        const name = (p?.name || "").toString().toLowerCase();
        const brand = (p?.brand || "").toString().toLowerCase();
        return name.includes(q) || brand.includes(q);
      });
    }
    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter((p) => (p?.category || "") === selectedCategory);
    }
    setFilteredProducts(filtered);
  };

  const categories = ["All", ...Array.from(new Set(products.map((p) => p?.category || "").filter(Boolean)))];

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button onClick={fetchProducts} className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      {/* HERO */}
      <div className="relative w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-6xl mx-auto px-6 pt-28 sm:pt-32 pb-24 text-center flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg">
            Buy Now, Pay Later with 0% EMI
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mt-4 opacity-90 leading-relaxed">
            Get your favorite products with flexible EMI plans backed by mutual funds.
            <br /> No credit card required! 💳
          </p>

          <div className="w-full max-w-xl sm:max-w-2xl mt-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 w-5 h-5" />
              <input
                aria-label="Search products"
                type="text"
                placeholder="Search for products, brands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 sm:py-4 pl-14 pr-4 rounded-2xl bg-white text-gray-900 shadow-xl placeholder-gray-500
                           focus:ring-4 focus:ring-white/60 focus:outline-none transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12 w-full px-4">
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-5 shadow-xl border border-white/30">
              <p className="text-3xl sm:text-4xl font-bold">0%</p>
              <p className="text-sm sm:text-base mt-2">Interest Rate</p>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-5 shadow-xl border border-white/30">
              <p className="text-3xl sm:text-4xl font-bold">3–12</p>
              <p className="text-sm sm:text-base mt-2">Months EMI</p>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-5 shadow-xl border border-white/30">
              <p className="text-3xl sm:text-4xl font-bold">100%</p>
              <p className="text-sm sm:text-base mt-2">Secure</p>
            </div>
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 -mt-6">
        <div className={`rounded-xl shadow-md p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between ${isDark ? "bg-gray-800" : "bg-white"}`}>
          <div className="flex items-center gap-3 px-2">
            <SlidersHorizontal className="w-5 h-5 text-indigo-600" />
            <span className="text-lg font-semibold">Filter by Category:</span>
          </div>

          <div className="mt-3 sm:mt-0 flex flex-wrap gap-3 px-2">
            {categories.length === 1 && <span className="text-sm text-gray-500">No categories</span>}
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-semibold text-sm ${
                  selectedCategory === category
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-800 dark:text-gray-300 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-1">Featured Products</h2>
        <p className={`text-sm mb-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} available
        </p>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-stretch">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id ?? product.id} product={product} darkMode={isDark} />
            ))}
          </div>
        )}
      </div>

      {/* Trust Badges */}
      <div className={`py-12 ${isDark ? "bg-gray-800" : "bg-white"}`}>
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
          <h3 className={`text-2xl font-bold text-center mb-8 ${isDark ? "text-white" : "text-gray-800"}`}>
            Why Choose Us?
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <h4 className={`font-bold mb-2 ${isDark ? "text-white" : "text-gray-800"}`}>100% Secure</h4>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Bank-level encryption</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚀</span>
              </div>
              <h4 className={`font-bold mb-2 ${isDark ? "text-white" : "text-gray-800"}`}>Instant Approval</h4>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Get approved in minutes</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💰</span>
              </div>
              <h4 className={`font-bold mb-2 ${isDark ? "text-white" : "text-gray-800"}`}>0% Interest</h4>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>No hidden charges</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎁</span>
              </div>
              <h4 className={`font-bold mb-2 ${isDark ? "text-white" : "text-gray-800"}`}>Cashback Offers</h4>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Earn while you buy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
