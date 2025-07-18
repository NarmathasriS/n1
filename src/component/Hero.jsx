import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-green-50 to-white min-h-[90vh] flex flex-col md:flex-row justify-between items-center px-6 md:px-20">
     
      <div className="text-center md:text-left max-w-xl space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-snug">
          Read More. Learn More. <br />
          <span className="text-green-600">Discover Your Next Book!</span>
        </h1>
        <p className="text-gray-600 text-lg">
          Explore thousands of books across various categories and start your journey today.
        </p>
        <div className="flex justify-center md:justify-start space-x-4">
          <Link to="/shop">
            <button className="bg-green-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition duration-300">
              Shop Now
            </button>
          </Link>
          <Link to="/contact">
            <button className="bg-orange-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition duration-300">
              Contact Us
            </button>
          </Link>
        </div>
      </div>

      
      <div className="mt-10 md:mt-0">
        <img
          src="hero/homecol.png"
          alt="Books Collection"
          className="w-full max-w-lg md:max-w-2xl rounded-xl shadow-lg"
        />
      </div>
    </section>
  );
}
