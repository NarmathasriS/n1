import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { addToCart } from "../Redux/cartSlice";
import { motion, AnimatePresence } from "framer-motion"; 
import Footer from "../component/footer";
import { title } from "framer-motion/client";

const books = [
  { id: 1, 
    title: "The Power of Habit", 
    price: 299, category: "Self Help", 
    image: "categories/thepower.png", 
    description: "Learn how habits work and how to change them for a better life." 
  },
  { id: 2, 
    title: "Atomic Habits", 
    price: 349, 
    category: "Self Help", 
    image: "featured/atomichabits.png", 
    description: "Practical strategies to build good habits and break bad ones." 
  },
  { id: 3, 
    title: "Harry Potter", 
    price: 499, 
    category: "Fiction", 
    image: "categories/harry.png", 
    description: "A magical journey into the wizarding world of Harry Potter." 
  },
  { id: 4, 
    title: "Rich Dad Poor Dad", 
    price: 399, 
    category: "Finance", 
    image: "featured/richdad.png",
    description: "Learn financial wisdom and how money really works." 
  },
  { id: 5, 
    title: "The Alchemist", 
    price: 299, 
    category: "Fiction", 
    image: "featured/alchemist.png", 
    description: "A philosophical story about following your dreams." 
  },
  { id: 6, 
    title: "The Art of Letting Go", 
    price: 349, 
    category: "Self Help", 
    image: "categories/theartofgo.png", 
    description: "A guide to finding peace by releasing control." 
  },
  { id: 7, 
    title: "Stop Overthinking", 
    price: 250, 
    category: "Self Help", 
    image: "categories/stopover.png", 
    description: "Techniques to calm your mind and focus on what matters." 
  },
  { id: 8, 
    title: "Think And Grow Rich", 
    price: 150, 
    category: "Finance", 
    image: "categories/think&grow.png", 
    description: "Classic book on building wealth and achieving success." 
  },
  { id: 9, 
    title: "Money Works", 
    price: 399, 
    category: "Finance", 
    image: "categories/moneyworks.png", 
    description: "A practical approach to managing and multiplying money." 
  },
  { id: 10, 
    title: "The Enemy", 
    price: 299, 
    category: "Fiction", 
    image: "categories/theenemy.png", 
    description: "A thrilling tale of courage and friendship in dark times."
   },
  { id: 11, 
    title: "Days at the Morisaki Bookshop", 
    price: 399, 
    category: "Fiction", 
    image: "categories/daysatthemorisaki.png", 
    description: "A heartwarming story about books, love, and self-discovery."
   },
  { id: 12, 
    title: "The Indian Stock Market Simplified", 
    price: 399, 
    category: "Finance", 
    image: "categories/indianstock.png", 
    description: "A simple guide to the Indian stock market for smart investing and wealth building." 
  },
  { id: 13,
    title: "THINK STRAIGHT", 
    price: 250, 
    category: "Self Help", 
    image: "categories/thinkstraight.png", 
    description: "A practical guide to clear thinking, helping you cut through mental clutter and make better decisions." 
  },
  { id: 14, 
    title: "Never Lie", 
    price: 550, 
    category: "Fiction", 
    image: "categories/neverlie.png", 
    description: "A gripping psychological thriller where secrets, lies, and suspense collide in a deadly game of truth." 
  },
   { id: 15, 
    title: "All the Light We Cannot See", 
    price: 462, 
    category: "Fiction", 
    image: "categories/allthelight.png", 
    description: "A WWII story of a blind girl and a German boy connected by fate"
   },
   { id: 16, 
    title: "Public Finance", 
    price: 650, 
    category: "Finance", 
    image: "categories/publicfinance.png", 
    description: "Management of government income, spending, and debt."
   },
  
];

export default function Shop() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("category");
    if (cat) setCategory(cat);
  }, [location.search]);

  const categories = ["All", "Self Help", "Fiction", "Finance"];

  const filteredBooks = books.filter(
    (book) =>
      (category === "All" || book.category === category) &&
      book.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddToCart = (book) => {
    dispatch(addToCart(book));
    setMessage(`"${book.title}" has been added to the cart!`);
    setTimeout(() => setMessage(""), 1000);
  };

  return (
    <>
      <div className="p-6 md:p-10 bg-gray-50 min-h-screen relative">
        
        
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.4 }}
              className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg text-center font-semibold flex items-center gap-3"
            >
              ✅ {message}
            </motion.div>
          )}
        </AnimatePresence>

        
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search books..."
            className="border border-gray-300 px-4 py-3 rounded-lg w-full md:w-1/2 focus:ring-2 focus:ring-green-500 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        
        <div className="flex flex-wrap justify-center gap-3 mb-8 sticky top-16 bg-gray-50 py-3 z-30">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                category === cat
                  ? "bg-green-500 text-white shadow-md"
                  : "bg-white border hover:bg-green-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white border rounded-lg shadow hover:shadow-xl transition duration-300 p-4 flex flex-col"
            >
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-64 object-contain mb-4 rounded bg-gray-100"
              />
              <h2 className="text-lg font-bold mb-2 text-gray-800">{book.title}</h2>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{book.description}</p>
              <p className="text-green-600 font-semibold mb-4 text-lg">₹{book.price}</p>
              <button
                onClick={() => handleAddToCart(book)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition mt-auto"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      
      <Footer />
    </>
  );
}
