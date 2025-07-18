export default function Footer() {
  return (
    <footer className="bg-green-600 text-white py-8">
      <div className="container mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        
       
        <div>
          <h2 className="text-2xl font-bold mb-4">BookStore</h2>
          <p className="text-green-100 text-sm">
            Your one-stop destination for books that inspire, educate, and entertain.
          </p>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/shop" className="hover:underline">Shop</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p className="text-green-100">📞 +91 98765 43210</p>
          <p className="text-green-100">📧 support@bookstore.com</p>
          <p className="text-green-100">📍 Chennai, India</p>
        </div>
      </div>

      
      <div className="mt-8 border-t border-green-400 pt-4 text-center text-green-100 text-sm">
        © {new Date().getFullYear()} BookStore. All rights reserved.
      </div>
    </footer>
  );
}
