import { use } from "react";
import Product from "../Product/Product";

const LatestProducts = ({ latestProductsPromise }) => {
  const products = use(latestProductsPromise);
  console.log(products);
  return (
    <div className="text-center mt-5 ">
      <h3 className="text-3xl font-bold">
        Latest <span className="text-primary">Products</span>
      </h3>
      <div className="gap-3 rounded-2xl grid md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Product product={product}></Product>
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;
