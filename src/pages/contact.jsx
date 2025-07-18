import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../component/footer";

export default function Contact() {
  const [showPopup, setShowPopup] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);

  
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); 
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);

   
    setName("");
    setEmail("");
    setMessage("");

    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    { question: "1. How can I track my order?", answer: "You can track your order using the tracking link sent to your email after dispatch." },
    { question: "2. Can I return a product?", answer: "Yes, returns are accepted within 7 days of delivery. Please check our return policy." },
    { question: "3. Do you offer international shipping?", answer: "Currently, we ship only within India, but international shipping is coming soon." },
    { question: "4. How can I cancel my order?", answer: "Orders can be canceled within 24 hours of purchase through your account or by contacting support." },
    { question: "5. What payment methods are accepted?", answer: "We accept all major credit/debit cards, UPI, and wallets. Cash on Delivery is also available." },
    { question: "6. Can I change my shipping address?", answer: "Yes, you can update your address before the order is shipped by contacting our support team." }
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-7xl bg-white shadow-2xl p-8 md:p-12 rounded-2xl">
          <h1 className="text-5xl font-extrabold text-green-600 mb-6 text-center">
            Contact Us
          </h1>
          <p className="text-gray-600 text-center mb-12 text-lg">
            Have questions, suggestions, or need help? We’d love to hear from you!
          </p>

          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-center">
            {[{ title: "Phone", value: "+91 98765 43210" }, { title: "Email", value: "support@bookstore.com" }, { title: "Address", value: "123 Book Street, Chennai, India" }]
              .map((item, index) => (
                <div key={index} className="p-6 border rounded-lg bg-green-50 hover:shadow-lg transition">
                  <h2 className="text-2xl font-semibold text-green-600 mb-2">{item.title}</h2>
                  <p className="text-gray-700">{item.value}</p>
                </div>
              ))}
          </div>

          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-green-600 mb-2">
              Customer Support Hours
            </h2>
            <p className="text-gray-700 text-lg">Mon - Sat: 9:00 AM - 8:00 PM</p>
          </div>

          
          <section className="flex flex-col lg:flex-row gap-12">
           
            <form onSubmit={handleSubmit} className="space-y-6 w-full lg:w-1/2 bg-green-50 p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-green-700 mb-6">
                Send us a Message
              </h2>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-400 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-400 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea
                  placeholder="Your Message"
                  rows="5"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-400 outline-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition"
              >
                Send Message
              </button>
            </form>

            
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl font-bold text-green-700 mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="p-5 border rounded-lg bg-green-50 shadow hover:shadow-md cursor-pointer transition" onClick={() => toggleFAQ(index)}>
                    <h3 className="font-semibold text-lg text-gray-800 flex justify-between items-center">
                      {faq.question}
                      <span className="text-green-600 text-xl">{openFAQ === index ? "-" : "+"}</span>
                    </h3>
                    {openFAQ === index && <p className="text-gray-600 mt-2">{faq.answer}</p>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <AnimatePresence>
          {showPopup && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-sm"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <h2 className="text-3xl font-bold text-green-600 mb-4">
                  Message Sent!
                </h2>
                <p className="text-gray-600 text-lg">
                  Thank you for contacting us. We'll get back to you soon.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </>
  );
}
