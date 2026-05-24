import { useLoaderData } from "react-router";

const ProductDetails = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <div>
      {/* left side */}
      <div></div>
      {/* right side */}
      <div></div>
    </div>
  );
};

export default ProductDetails;
