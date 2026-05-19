import { use } from "react";
import Product from "../Product/Product";

const LatestProducts = ({ latestProductsPromise }) => {
  const products = use(latestProductsPromise);
  console.log(products);
  return (
    <div className="text-center mt-5">
      <h3 className="text-3xl font-bold">
        Latest <span className="text-primary">Products</span>
        {products.map((product) => (
          <Product product={product}></Product>
        ))}
      </h3>
    </div>
  );
};

export default LatestProducts;
