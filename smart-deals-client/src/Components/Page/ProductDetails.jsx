import { useLoaderData } from "react-router";

const ProductDetails = () => {
  const data = useLoaderData();
  const {
    image,
    description,
    condition,
    usage,
    title,
    price_min,
    price_max,
    _id,
    created_at,
    seller_name,
    seller_image,
    email,
    location,
    seller_contact,
    status,
    category,
  } = data;
  console.log(data);
  return (
    <div className="mt-15 flex gap-3">
      {/* left side */}
      <div className="w-6/12">
        <img
          className="w-140 h-90 bg-cover rounded-xl p-2"
          src={image}
          alt=""
        />
        <div className="bg-white mt-6 space-y-5 p-3">
          <h3 className="text-3xl font-bold">Product Description </h3>
          <div className="font-bold flex justify-between">
            <p>
              <span className="text-primary ">Condition</span>: {condition}
            </p>
            <p>
              <span className="text-primary ">Usage Time</span>: {usage}
            </p>
          </div>
          <hr />
          <p className="text-[#969A9D]">{description}</p>
        </div>
      </div>
      {/* right side */}
      <div className=" mt-6 space-y-5 p-3 w-6/12">
        <h2 className="text-4xl font-bold">{title}</h2>
        <div className="bg-white p-3">
          <h3 className="text-green-600 text-xl font-bold">
            {price_min} - {price_max}
          </h3>
          <p>Price starts from </p>
        </div>

        <div className="bg-white p-3">
          <h3 className="text-2xl font-bold">Product Details</h3>
          <h3 className="text-lg">
            <b>category</b>: {category}
          </h3>
          <h3>
            <b>Product ID</b> : {_id}
          </h3>
          <h3>
            <b>Posted</b> : {new Date(created_at).toLocaleDateString()}
          </h3>
        </div>
        <div className="bg-white p-3">
          <h3 className="text-2xl font-bold">Seller Information</h3>
          <div className="flex gap-4 items-center mt-1.5">
            <img className="w-10 h-10" src={seller_image} alt="" />
            <div>
              <b>{seller_name}</b> <br />
              {email}
            </div>
          </div>
          <p>
            <b>Location:</b> {location}
          </p>
          <p>
            <b>Contact:</b> {seller_contact}
          </p>
          <p>
            <b>Status::</b> {status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
