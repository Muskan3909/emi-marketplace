import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productAPI } from "../services/api";
import EMIPlanCard from "../components/EMIPlanCard";
import { ArrowLeft, Star, ShoppingCart, Loader2, Package, Shield, Zap, X } from "lucide-react";

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // theme detection
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));
  useEffect(() => {
    const obs = new MutationObserver(() => setIsDark(document.documentElement.classList.contains("dark")));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await productAPI.getProductBySlug(slug);
      const data = res?.data?.data ?? res?.data ?? null;
      if (!data) throw new Error("No product found");
      setProduct(data);
      setSelectedVariant(data.variants?.[0] || null);
      setSelectedPlan(data.emiPlans?.find((p) => p.is_featured) || data.emiPlans?.[0] || null);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Product not found!");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={`flex flex-col items-center justify-center min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
        <p className="text-red-500 text-lg mb-4">{error}</p>
        <button onClick={() => navigate("/")} className="bg-indigo-600 text-white px-4 py-2 rounded-lg">Back to Home</button>
      </div>
    );
  }

  const currentPrice = product.base_price + (selectedVariant?.price_adjustment || 0);
  const discount = product.mrp > 0 ? Math.round(((product.mrp - currentPrice) / product.mrp) * 100) : 0;

  return (
    <div className={`${isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"} min-h-screen pb-32`}>
      {/* Sticky header */}
      <div className={`sticky top-0 z-20 ${isDark ? "bg-gray-800" : "bg-white"} shadow-sm`}>
        <div className="max-w-7xl mx-auto px-6 py-3">
          <button onClick={() => navigate("/")} className={`${isDark ? "text-gray-300" : "text-gray-600"} flex items-center gap-2`}>
            <ArrowLeft className="w-5 h-5" /> Back to Products
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Left */}
          <div className={`rounded-2xl p-6 ${isDark ? "bg-gray-800" : "bg-white"} shadow`}>
            <div className={`rounded-xl p-6 mb-5 flex items-center justify-center ${isDark ? "bg-gray-700" : "bg-gray-100"}`} style={{ minHeight: 420 }}>
              <img
                src={selectedVariant?.image_url}
                alt={product.name}
                className="max-w-full max-h-96 object-contain"
                onError={(e) => (e.target.src = "https://via.placeholder.com/400x400?text=Product")}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className={`text-center p-3 rounded-lg ${isDark ? "bg-blue-900/30" : "bg-blue-50"}`}>
                <Package className="w-5 h-5 mx-auto mb-2 text-blue-600" />
                <p className="text-xs">Free Delivery</p>
              </div>
              <div className={`text-center p-3 rounded-lg ${isDark ? "bg-green-900/30" : "bg-green-50"}`}>
                <Shield className="w-5 h-5 mx-auto mb-2 text-green-600" />
                <p className="text-xs">1 Year Warranty</p>
              </div>
              <div className={`text-center p-3 rounded-lg ${isDark ? "bg-purple-900/30" : "bg-purple-50"}`}>
                <Zap className="w-5 h-5 mx-auto mb-2 text-purple-600" />
                <p className="text-xs">Easy Returns</p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className={`rounded-2xl p-6 ${isDark ? "bg-gray-800" : "bg-white"} shadow`}>
            <p className="text-sm text-indigo-600 font-semibold mb-1">{product.brand}</p>
            <h1 className="text-2xl md:text-3xl font-bold mb-3">{product.name}</h1>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center bg-green-600 text-white px-2 py-1.5 rounded font-bold">
                <span>{product.rating ?? "—"}</span>
                <Star className="w-4 h-4 ml-1" />
              </div>
              <span className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>{product.reviews_count?.toLocaleString() ?? "0"} reviews</span>
            </div>

            <p className={`${isDark ? "text-gray-300" : "text-gray-600"} mb-6`}>{product.description}</p>

            <h3 className="text-lg font-semibold mb-3">Select Variant</h3>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {product.variants?.map((v) => (
                <button
                  key={v.id ?? v._id}
                  onClick={() => setSelectedVariant(v)}
                  className={`p-3 rounded-lg border transition ${
                    selectedVariant?._id === v._id || selectedVariant?.id === v.id
                      ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 shadow"
                      : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <p className="font-semibold text-sm">{v.variant_name}</p>
                  {v.price_adjustment > 0 && <p className="text-xs mt-1">+₹{v.price_adjustment.toLocaleString("en-IN")}</p>}
                </button>
              ))}
            </div>

            <div className="border-t border-b py-4 mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl font-bold">₹{currentPrice.toLocaleString("en-IN")}</span>
                <span className="text-lg line-through text-gray-400">₹{product.mrp.toLocaleString("en-IN")}</span>
                <span className="bg-green-200 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-bold">{discount}% OFF</span>
              </div>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Inclusive of all taxes</p>
            </div>

            <button onClick={() => setShowInvoice(true)} disabled={!selectedPlan} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-bold mb-2 disabled:opacity-60">
              <div className="flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" /> Proceed with Selected Plan
              </div>
            </button>
          </div>
        </div>

        {/* EMI PLANS */}
        <div className={`rounded-2xl p-6 ${isDark ? "bg-gray-800" : "bg-white"} shadow`}>
          <h2 className="text-2xl font-bold mb-2">Choose Your EMI Plan</h2>
          <p className={`mb-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}>All plans are backed by trusted mutual funds. Select the plan that works best for you.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {product.emiPlans?.map((plan) => (
              <EMIPlanCard
                key={plan.id ?? plan._id}
                plan={plan}
                isSelected={selectedPlan?._id === plan._id || selectedPlan?.id === plan.id}
                onSelect={() => setSelectedPlan(plan)}
                productPrice={currentPrice}
                isDark={isDark}
              />
            ))}
          </div>

          {selectedPlan && (
            <div className={`rounded-lg p-5 ${isDark ? "bg-indigo-900/20 border border-indigo-800" : "bg-indigo-50"}`}>
              <h3 className="text-lg font-bold mb-3">Payment Breakdown</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Monthly Payment</p>
                  <p className="text-xl font-bold">₹{selectedPlan.monthly_payment.toLocaleString("en-IN")}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Tenure</p>
                  <p className="text-xl font-bold">{selectedPlan.tenure_months} months</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Interest Rate</p>
                  <p className="text-xl font-bold">{selectedPlan.interest_rate}% p.a.</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Total Amount</p>
                  <p className="text-xl font-bold">₹{selectedPlan.total_amount.toLocaleString("en-IN")}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom sticky bar */}
      {!showInvoice && (
        <div className={`fixed bottom-0 left-0 right-0 z-40 ${isDark ? "bg-gray-800 border-t border-gray-700" : "bg-white border-t border-gray-300"} shadow-lg`}>
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
            <div>
              <p className="text-lg font-bold">₹{currentPrice.toLocaleString("en-IN")}</p>
              <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>EMI: ₹{selectedPlan?.monthly_payment?.toLocaleString("en-IN")}/mo</p>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setDrawerOpen(true)} className="px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 font-semibold">Add to Cart</button>
              <button onClick={() => setShowInvoice(true)} disabled={!selectedPlan} className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 disabled:opacity-60">Buy with EMI</button>
            </div>
          </div>
        </div>
      )}

      {/* Cart drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDrawerOpen(false)} />
          <div className={`absolute right-0 top-0 h-full w-80 p-6 shadow-2xl ${isDark ? "bg-gray-800 text-white" : "bg-white"}`}>
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-bold">Cart</h3>
              <button onClick={() => setDrawerOpen(false)} className="text-gray-400 hover:text-gray-700"><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 items-center">
                <img src={selectedVariant?.image_url} alt="" className="w-20 h-20 object-contain rounded-md bg-gray-100 dark:bg-gray-700" onError={(e) => (e.target.src = "https://via.placeholder.com/100")} />
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">{selectedVariant?.variant_name}</p>
                  <p className="font-bold mt-1">₹{currentPrice.toLocaleString("en-IN")}</p>
                </div>
              </div>

              <button onClick={() => alert("Item added to cart!")} className="w-full bg-yellow-400 hover:bg-yellow-500 py-3 rounded-lg font-bold">Confirm Add to Cart</button>
            </div>
          </div>
        </div>
      )}

      {/* Invoice modal */}
      {showInvoice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto ${isDark ? "bg-gray-800 text-white" : "bg-white"}`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Order Invoice</h2>
                <button onClick={() => setShowInvoice(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
              </div>

              <div className="space-y-5">
                <div className={`rounded-lg p-4 ${isDark ? "bg-indigo-900/20" : "bg-indigo-50"}`}>
                  <h3 className="font-bold mb-3">Order Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between"><span className="text-gray-600">Product</span><span className="font-semibold">{product.name}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Variant</span><span className="font-semibold">{selectedVariant?.variant_name}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Price</span><span className="font-semibold">₹{currentPrice.toLocaleString("en-IN")}</span></div>
                  </div>
                </div>

                <div className={`rounded-lg p-4 ${isDark ? "bg-gray-700" : "bg-gray-50"}`}>
                  <h3 className="font-bold mb-3">EMI Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between"><span className="text-gray-600">Monthly EMI</span><span className="font-bold text-indigo-600">₹{selectedPlan?.monthly_payment.toLocaleString("en-IN")}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Tenure</span><span>{selectedPlan?.tenure_months} months</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Total Amount</span><span className="font-bold">₹{selectedPlan?.total_amount.toLocaleString("en-IN")}</span></div>
                  </div>
                </div>

                <button onClick={() => { alert("Order Confirmed! 🎉"); setShowInvoice(false); }} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-bold">Confirm Order</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
