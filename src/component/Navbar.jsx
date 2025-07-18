import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
  const cartCount = useSelector((state) => state.cart.items.length); 

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-10 py-4 bg-white shadow-md">
      
    
       <Link to="/" className="flex items-baseline justify-center mb-6">
        <h1 className="text-3xl font-bold text-green-600">BOOK</h1>
        <h3 className="text-xl font-semibold text-green-500 ml-2">store</h3>
      </Link>

      
      <div className="flex space-x-8 text-gray-700 font-medium">
        <Link to="/" className="hover:text-green-500">Home</Link>
        <Link to="/shop" className="hover:text-green-500">Shop</Link>
        <Link to="/cart" className="hover:text-green-500">
          Cart ({cartCount})
        </Link>
        <Link to="/contact" className="hover:text-green-500">Contact</Link>
      </div>
    </nav>
  );
}
