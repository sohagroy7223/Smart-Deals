import { use } from "react";
import Product from "../Product/Product";
import { useNavigate } from "react-router";

const LatestProducts = ({ latestProductsPromise }) => {
  const products = use(latestProductsPromise);
  const navigate = useNavigate();

  const showAllProduct = () => {
    navigate("AllProducts");
  };
  // console.log(products);
  return (
    <div className="text-center mt-15 ">
      <h3 className="text-3xl font-bold">
        Latest <span className="text-primary">Products</span>
      </h3>
      <div className="gap-6 rounded-2xl grid md:grid-cols-2 lg:grid-cols-3 mt-7">
        {products.map((product) => (
          <Product key={product._id} product={product}></Product>
        ))}
      </div>
      <button
        onClick={showAllProduct}
        className="btn bg-primary text-white mt-10"
      >
        Show All
      </button>
    </div>
  );
};

export default LatestProducts;
