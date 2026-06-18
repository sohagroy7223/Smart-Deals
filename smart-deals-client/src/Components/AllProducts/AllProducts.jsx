import { useLoaderData } from "react-router";
import Products from "../Page/Products";

const AllProducts = () => {
  const allProducts = useLoaderData();
  // console.log(allProducts);
  return (
    <div>
      <h3 className=" text-3xl text-center p-6 font-bold">
        All <span className="text-primary">Products</span> is here
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allProducts.map((products) => (
          <Products key={products._id} products={products}></Products>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
