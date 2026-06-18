import { use } from "react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";

const MyProducts = () => {
  const [myProducts, setMyProducts] = useState([]);
  const { user } = use(AuthContext);
  // console.log(user);
  useEffect(() => {
    fetch(`http://localhost:3000/myProducts?email=${user.email}`, {
      headers: {
        authorization: `bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("after fetching", data);
        setMyProducts(data);
      });
  }, [user]);

  const handelDeleteProduct = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/myProducts/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your product has been deleted.",
                icon: "success",
              });
            }
            const remainingMyProducts = myProducts.filter(
              (myProduct) => myProduct._id !== _id,
            );
            setMyProducts(remainingMyProducts);
          });
      }
    });
  };

  return (
    <div>
      <h3>
        my products all is here
        <span className="text-primary font-bold"> {myProducts.length}</span>
      </h3>
      <span className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Products Image</th>
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
                  <div className="avatar">
                    <div className="h-12 w-12">
                      <img src={product.productImg} alt="" />
                    </div>
                  </div>
                </td>

                <td>
                  <h3 className="font-bold">{product.category}</h3>
                </td>

                <td>
                  {product.seller_name}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {product.seller_email}
                  </span>
                </td>

                <td>{product.maxPrice}</td>

                <td>
                  {product.status === "pending" ? (
                    <span className="badge badge-warning badge-outline">
                      {product.status}
                    </span>
                  ) : (
                    <span className="badge badge-success badge-outline">
                      Success
                    </span>
                  )}
                </td>

                <td>
                  <div className="flex gap-2">
                    <button className="badge badge-info cursor-pointer">
                      Edit
                    </button>

                    <button
                      onClick={() => handelDeleteProduct(product._id)}
                      className="badge badge-warning cursor-pointer"
                    >
                      Delete
                    </button>

                    <button className="badge badge-success cursor-pointer">
                      Make Sold
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </span>
    </div>
  );
};

export default MyProducts;
