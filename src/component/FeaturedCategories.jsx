import { useNavigate } from "react-router-dom";

export default function FeaturedCategories() {
  const navigate = useNavigate();
  const categories = [
    { name: "Fiction", color: "bg-green-100 text-green-700" },
    { name: "Self Help", color: "bg-yellow-100 text-yellow-700" },
    { name: "Finance", color: "bg-blue-100 text-blue-700" },
  ];

  const handleCategoryClick = (category) => {
    navigate(`/shop?category=${category}`);
  };

  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10">
        Browse by Category
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => handleCategoryClick(cat.name)}
            className={`p-8 rounded-xl shadow-lg ${cat.color} text-center hover:scale-105 transform transition font-semibold text-xl`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
