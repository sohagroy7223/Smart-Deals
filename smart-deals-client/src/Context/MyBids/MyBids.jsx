import { use } from "react";
import { useEffect } from "react";
import { AuthContext } from "../AuthContext";
import { useState } from "react";
import Swal from "sweetalert2";

const MyBids = () => {
  const { user } = use(AuthContext);
  const [bids, setBids] = useState([]);

  // console.log(user);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/bids?email=${user.email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log("after fetching ", data);
          setBids(data);
        });
    }
  }, [user]);

  // useEffect(() => {
  //   if (user?.email) {
  //     fetch(`http://localhost:3000/bids?email=${user.email}`, {
  //       headers: {
  //         authorization: `bearer ${user.accessToken}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         // console.log("after fetching ", data);
  //         setBids(data);
  //       });
  //   }
  // }, [user]);

  const handelDeleteBid = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed)
        fetch(`http://localhost:3000/bids/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log("after delete", data);
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });

              const remainingBids = bids.filter((bid) => bid._id !== _id);
              setBids(remainingBids);
            }
          });
    });
  };

  return (
    <div>
      <h3>My bids {bids.length}</h3>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Products Info</th>
              <th>Seller Info</th>
              <th>Bid price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {bids.map((bid, index) => (
              <tr key={bid._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src="product img" alt="" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Product name</div>
                      <div className="text-sm opacity-50">product price</div>
                    </div>
                  </div>
                </td>
                <td>
                  Seller name
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {bid.buyer_email}
                  </span>
                </td>
                <td>{bid.bid_price}</td>
                {bid.status === "pending" ? (
                  <td className="badge-warning mt-10 md:mt-6.5 badge badge-outline">
                    {bid.status}
                  </td>
                ) : (
                  <div className="badge badge-outline badge-success">
                    Success
                  </div>
                )}
                <th>
                  <div
                    onClick={() => handelDeleteBid(bid._id)}
                    className="badge badge-outline cursor-pointer text-[12px] md:text-sm"
                  >
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

export default MyBids;
