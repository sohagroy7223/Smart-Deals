import { Link } from "react-router";

const Products = ({ products }) => {
  const { _id, title, price_min, price_max, usage, image } = products;
  return (
    <div className="border text-start p-1 bg-gray-50 rounded-lg ">
      <img
        className="h-60 max-w-full mx-auto p-3 rounded-2xl bg-cover"
        src={image}
        alt=""
      />
      <h3 className=" text-xl font-bold px-3">
        {title}-[{usage}]
      </h3>
      <p className="font-medium  px-3">
        price:{price_min} - {price_max}
      </p>
      <Link to={`/productDetails/${_id}`}>
        <button className="w-full text-primary btn bg-white mt-3">
          View Details
        </button>
      </Link>
    </div>
  );
};

export default Products;
