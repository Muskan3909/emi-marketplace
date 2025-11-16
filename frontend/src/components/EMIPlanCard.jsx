import { Check, Gift, TrendingUp } from "lucide-react";

const EMIPlanCard = ({ plan, isSelected, onSelect, productPrice }) => {
  const isFeatured = plan.is_featured;
  const hasCashback = plan.cashback_amount > 0;

  return (
    <div
      onClick={onSelect}
      className={`relative p-4 sm:p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 h-full
        ${isSelected ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 shadow-lg scale-105" : "border-gray-200 hover:border-indigo-300 hover:shadow-md"}
        ${isFeatured ? "ring-2 ring-yellow-400" : ""}`}
    >
      {isFeatured && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
            ⭐ MOST POPULAR
          </span>
        </div>
      )}

      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold">
            ₹{plan.monthly_payment.toLocaleString("en-IN")}
            <span className="text-sm font-normal">/month</span>
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">for {plan.tenure_months} months</p>
        </div>

        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? "border-indigo-600 bg-indigo-600" : "border-gray-300"}`}>
          {isSelected && <Check className="w-4 h-4 text-white" />}
        </div>
      </div>

      <div className="space-y-2 mb-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-300">Interest Rate</span>
          <span className="font-semibold">
            {plan.interest_rate === 0 ? <span className="text-green-600 font-bold">0% Interest 🎉</span> : `${plan.interest_rate}% p.a.`}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-300">Total Amount</span>
          <span className="font-semibold">₹{plan.total_amount.toLocaleString("en-IN")}</span>
        </div>

        {plan.processing_fee > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-300">Processing Fee</span>
            <span className="font-semibold">₹{plan.processing_fee.toLocaleString("en-IN")}</span>
          </div>
        )}
      </div>

      {hasCashback && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm font-semibold text-green-800">{plan.cashback_description}</p>
              <p className="text-xs text-green-600">Effective price: ₹{(productPrice - plan.cashback_amount).toLocaleString("en-IN")}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center text-xs text-gray-500 dark:text-gray-300 gap-2">
        <TrendingUp className="w-4 h-4 text-indigo-600" />
        <span>Backed by {plan.fund_name}</span>
      </div>
    </div>
  );
};

export default EMIPlanCard;
