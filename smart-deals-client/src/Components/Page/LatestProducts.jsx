import { use } from "react";

const LatestProducts = ({ latestProductsPromise }) => {
  const products = use(latestProductsPromise);
  console.log(products);
  return (
    <div>
      <h3></h3>
    </div>
  );
};

export default LatestProducts;
