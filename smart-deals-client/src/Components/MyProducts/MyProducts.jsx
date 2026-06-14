import { useEffect, useState } from "react";

const MyProducts = () => {
  const [myProducts, setMyProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/myProducts/")
      .then((res) => res.json())
      .then((data) => {
        console.log("after fetching", data);
        setMyProducts(data);
      });
  }, []);
  return (
    <div>
      <h3>
        my products all is here
        <span className="text-primary font-bold">{myProducts.length}</span>
      </h3>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Products Info</th>
              <th>category</th>
              <th>Seller Info</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {myProducts.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>
                  <div className=" items-center gap-3">
                    <div className="avatar">
                      <div className=" h-12 w-12">
                        <img src={product.productImg} alt="" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="font-bold">{product.category}</div>
                  </div>
                </td>
                <td>
                  {product.seller_name}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {product.seller_email}
                  </span>
                </td>
                <td>{product.maxPrice}</td>
                {product.status === "pending" ? (
                  <td className="badge-warning badge mt-6 badge-outline ">
                    {product.status}
                  </td>
                ) : (
                  <div className="badge badge-outline badge-success mt-6">
                    Success
                  </div>
                )}
                <th>
                  <div className="badge badge-outline cursor-pointer">
                    Remove Bid
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;
