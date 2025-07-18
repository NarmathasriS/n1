import Hero from "../component/Hero";
import FeaturedCategories from "../component/FeaturedCategories";
import FeaturedBooks from "../component/FeaturedBooks";
import Footer from "../component/footer";

export default function Home() {
  return (
    <div className="bg-white">
      
      <Hero />

      <section className="bg-gray-50 py-16 px-6 md:px-20">
        <FeaturedCategories />
      </section>

      <section className="py-16 px-6 md:px-20">
        <FeaturedBooks />
      </section>
      <Footer />
    </div>
  );
}
