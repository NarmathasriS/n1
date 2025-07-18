import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cartSlice";

export default function FeaturedBooks() {
  const books = [
    { title: "Atomic Habits", price: 349, image: "featured/atomichabits.png" },
    { title: "The Alchemist", price: 299, image: "featured/alchemist.png" },
    { title: "Rich Dad Poor Dad", price: 399, image: "featured/richdad.png" },
  ];

  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const handleAddToCart = (book) => {
    dispatch(addToCart(book));
    setMessage(`"${book.title}" has been added to the cart!`);
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="relative">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10">
        Featured Books
      </h2>

      {message && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-50 border border-green-500 text-green-700 px-6 py-3 rounded shadow-lg animate-bounce">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {books.map((book, index) => (
          <div
            key={index}
            className="border rounded-lg p-6 shadow-md hover:shadow-xl transition bg-white text-center"
          >
            <img
              src={book.image}
              alt={book.title}
              className="h-56 mx-auto mb-4 object-contain"
            />
            <h3 className="text-xl font-bold mb-2 text-gray-800">{book.title}</h3>
            <p className="text-green-600 text-lg font-semibold mb-4">
              ₹{book.price}
            </p>
            <button
              onClick={() => handleAddToCart(book)}
              className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
