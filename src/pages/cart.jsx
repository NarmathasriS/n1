import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart, 
} from "../Redux/cartSlice";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import Footer from "../component/footer";

export default function Cart() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "card",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showResultScreen, setShowResultScreen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fakePaymentGateway = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const success = Math.random() > 0.2; // 80% success chance
        resolve({
          status: success ? "success" : "failed",
          transactionId: "TXN" + Date.now(),
        });
      }, 2000);
    });
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    setMessage("");
    setShowPaymentModal(true);
  };

  const processPayment = async () => {
    setLoading(true);
    setShowPaymentModal(false);

    try {
      const response = await fakePaymentGateway();
      setIsSuccess(response.status === "success");
      setMessage(
        response.status === "success"
          ? `Payment Successful! Transaction ID: ${response.transactionId}`
          : "Payment Failed! Please try again."
      );

      setShowResultScreen(true);

      
      setTimeout(() => {
        setShowResultScreen(false);

        if (response.status === "success") {
          dispatch(clearCart()); 
          setFormData({
            name: "",
            email: "",
            address: "",
            paymentMethod: "card",
          });
        }
      }, 3000);
    } catch (error) {
      setMessage("Payment error occurred.");
      setIsSuccess(false);
      setShowResultScreen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10 bg-gray-50 min-h-screen">
        <div className="bg-white border rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-green-600 mb-6">Your Cart</h1>
          {items.length === 0 ? (
            <p className="text-gray-600 text-lg">Your cart is empty.</p>
          ) : (
            <>
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center bg-gray-100 rounded-lg p-4 shadow-sm"
                  >
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {item.title}
                      </h2>
                      <p className="text-green-600 font-medium">
                        ₹{item.price}
                      </p>
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() => dispatch(decrementQuantity(item.id))}
                          className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 transition"
                        >
                          -
                        </button>
                        <span className="text-lg font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => dispatch(incrementQuantity(item.id))}
                          className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 transition"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="bg-red-500 text-white p-2 rounded hover:bg-red-600 flex items-center justify-center transition"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                ))}
              </div>
              <h2 className="text-2xl font-bold mt-6 text-gray-800">
                Total: <span className="text-green-600">₹{totalPrice}</span>
              </h2>
            </>
          )}
        </div>

        
        <div className="bg-white border rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-green-600">Checkout</h2>
          {items.length === 0 ? (
            <p className="text-gray-500">Add items to your cart to checkout.</p>
          ) : (
            <form onSubmit={handleCheckout} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <textarea
                name="address"
                placeholder="Shipping Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="card">Credit/Debit Card</option>
                <option value="cod">Cash on Delivery</option>
              </select>
              <div className="font-bold text-lg text-gray-700">
                Total Amount:{" "}
                <span className="text-green-600">₹{totalPrice}</span>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                disabled={loading}
              >
                {loading ? "Processing..." : "Place Order"}
              </button>
            </form>
          )}
        </div>

        
        <AnimatePresence>
          {showPaymentModal && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white p-6 rounded-lg shadow-lg w-96 text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <h2 className="text-xl font-bold mb-4 text-gray-800">
                  Confirm Payment
                </h2>
                <p className="mb-6 text-gray-600">
                  Pay{" "}
                  <span className="text-green-600 font-semibold">
                    ₹{totalPrice}
                  </span>{" "}
                  using {formData.paymentMethod}
                </p>
                <div className="flex justify-between">
                  <button
                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                    onClick={() => setShowPaymentModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    onClick={processPayment}
                  >
                    Confirm
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        
        {loading && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40">
            <motion.div className="w-16 h-16 border-4 border-white border-t-green-500 rounded-full animate-spin"></motion.div>
          </div>
        )}

      
        <AnimatePresence>
          {showResultScreen && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white p-8 rounded-lg shadow-lg text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                {isSuccess ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-green-500 text-5xl mb-4"
                  >
                    ✅
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-red-500 text-5xl mb-4"
                  >
                    ❌
                  </motion.div>
                )}
                <p className="text-lg font-bold text-gray-800">{message}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    <Footer />
    </>
  );
}
