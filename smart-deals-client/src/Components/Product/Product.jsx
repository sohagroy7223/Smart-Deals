const Product = ({ product }) => {
  console.log(product);
  const { title, price_min, price_max, usage, image } = product;
  return (
    <div className="border text-start p-1 bg-gray-50 rounded-lg">
      <img
        className="h-60 max-w-full mx-auto p-3 rounded-2xl bg-cover"
        src={image}
        alt=""
      />
      <h3 className=" text-xl font-bold">
        {title}-[{usage}]
      </h3>
      <p className="font-medium">
        price:{price_min}-{price_max}
      </p>
    </div>
  );
};

export default Product;
