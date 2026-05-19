import { FaSearch } from "react-icons/fa";

const Hero = () => {
  return (
    <div className="bg-[#EEF0F8]">
      <div className="py-4 w-full text-center space-y-4">
        <h2 className="text-6xl font-bold mx-auto max-w-xl">
          Deal your <span className="text-primary">Products</span> in a
          <span className="text-primary">Smart</span> way !
        </h2>
        <p className="text-[#627382]">
          SmartDeals helps you sell, resell, and shop from trusted local sellers
          — all in one place!
        </p>

        <div className="flex justify-center items-center relative">
          <input
            className="w-5/12 p-2 bg-white rounded-4xl"
            type="text"
            placeholder="search For Products, Categories..."
          />
          <button className="absolute md:ml-60 lg:ml-100 ml-42 bg-primary text-white p-3 rounded-2xl cursor-pointer">
            <FaSearch></FaSearch>
          </button>
        </div>
        <div className="flex justify-center gap-3">
          <button className="btn bg-primary text-white">
            Watch All Products
          </button>
          <button className="btn border-2 border-primary">
            Post an Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
