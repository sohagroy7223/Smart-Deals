import { use } from "react";
import { useEffect } from "react";
import { AuthContext } from "../AuthContext";
import { useState } from "react";

const MyBids = () => {
  const { user } = use(AuthContext);
  const [bids, setBids] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/bids?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("after fetching ", data);
          setBids(data);
        });
    }
  }, [user.email]);

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
                    Seller email
                  </span>
                </td>
                <td>{bid.bid_price}</td>
                <td className="badge-warning mt-6 badge badge-outline">
                  {bid.status}
                </td>
                <th>
                  <div className="badge badge-outline">Remove Bid</div>
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
