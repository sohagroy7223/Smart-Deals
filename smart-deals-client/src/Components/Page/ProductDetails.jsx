import { useLoaderData, useNavigate } from "react-router";
import { IoIosArrowRoundBack } from "react-icons/io";
import { use, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";

const ProductDetails = () => {
  const [bids, setBids] = useState([]);

  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const data = useLoaderData();
  const modelRef = useRef();
  const {
    image,
    description,
    condition,
    usage,
    title,
    price_min,
    price_max,
    _id: productId,
    created_at,
    seller_name,
    seller_image,
    email,
    location,
    seller_contact,
    status,
    category,
  } = data;
  // console.log(data);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/bids/${productId}`)
      .then((data) => {
        console.log(data.data);
        setBids(data.data);
      });
  }, [productId]);

  // useEffect(() => {
  //   fetch(`http://localhost:3000/products/bids/${productId}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // console.log("bids for this products", data);
  //       setBids(data);
  //     });
  // }, [productId]);

  const handelModalOpen = () => {
    modelRef.current.showModal();
  };

  const handelBidsSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const Bids = e.target.bids.value;
    // console.log(productId, name, email, Bids);
    const newBid = {
      product: productId,
      buyer_name: name,
      buyer_email: email,
      buyer_image: user?.photoURL,
      bid_price: Bids,
      status: "pending",
    };
    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after fetching data", data);
        modelRef.current.close();
        if (data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your bids has been placed",
            showConfirmButton: false,
            timer: 1500,
          });
          // add new bids in state
          newBid._id = data.insertedId;
          const newBids = [...bids, newBid];
          // console.log(newBids);
          newBids.sort((a, b) => b.bid_price - a.bid_price);
          setBids(newBids);
        }
      });
  };

  return (
    <div>
      <div className="mt-15 md:flex gap-3">
        {/* left side */}
        <div className="md:w-6/12">
          <img
            className="w-140 h-100 bg-cover rounded-xl p-2"
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
        <div className=" mt-6 space-y-5 p-3 md:w-6/12">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center cursor-pointer"
          >
            {" "}
            <IoIosArrowRoundBack size={26}></IoIosArrowRoundBack>{" "}
            <p>back to product</p>
          </button>
          <h2 className="text-4xl font-bold">{title}</h2>
          <div className="bg-white p-3 space-y-2">
            <h3 className="text-green-600 text-xl font-bold">
              {price_min} - {price_max}
            </h3>
            <p>Price starts from </p>
          </div>

          <div className="bg-white p-3 space-y-2">
            <h3 className="text-2xl font-bold">Product Details</h3>
            <h3 className="text-lg">
              <b>category</b>: {category}
            </h3>
            <h3>
              <b>Product ID</b> : {productId}
            </h3>
            <h3>
              <b>Posted</b> : {new Date(created_at).toLocaleDateString()}
            </h3>
          </div>
          <div className="bg-white p-3 space-y-2">
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
              <b>Status::</b>{" "}
              <span className="bg-amber-300 p-1.5 rounded-full">{status}</span>
            </p>
          </div>
          <div>
            <button
              onClick={handelModalOpen}
              className="btn-primary btn w-full"
            >
              I want to Buy this products
            </button>

            <dialog
              ref={modelRef}
              className="$$modal mx-auto md:w-96 mt-11 items-center $$modal-bottom sm:$$modal-middle"
            >
              <div className="$$modal-box p-2">
                <h3 className="font-bold text-lg text-center">
                  Give Seller Your Offer Price!
                </h3>

                <div className="$$modal-action  py-4">
                  <form onSubmit={handelBidsSubmit} className="fieldset">
                    <label className="label">Name</label>
                    <input
                      type="text"
                      className="input"
                      name="name"
                      readOnly
                      required
                      defaultValue={user?.displayName}
                    />
                    <label className="label">Email</label>
                    <input
                      type="email"
                      className="input"
                      name="email"
                      readOnly
                      required
                      defaultValue={user?.email}
                    />

                    <label className="label">your Bids</label>
                    <input
                      type="text"
                      className="input"
                      name="bids"
                      required
                      placeholder="your Bids"
                    />
                    <button className="btn  btn-neutral mt-4">
                      Please your Bids
                    </button>
                  </form>
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="$$btn btn w-full">cancel</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-3xl font-bold mt-10">
          Bids For This Products:{" "}
          <span className="text-primary">{bids.length}</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>SL No</th>
                <th>Buyer Name</th>
                <th>Buyer email</th>
                <th>Bids Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {/* row 1 */}
              {bids.map((bid, index) => (
                <tr key={bid._id}>
                  <th>
                    <label>{index + 1}</label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={
                              bid?.buyer_image ||
                              "https://img.icons8.com/?size=100&id=7819&format=png&color=000000"
                            }
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{bid.buyer_name}</div>
                        <div className="text-sm opacity-50">United States</div>
                      </div>
                    </div>
                  </td>
                  <td>{bid.buyer_email}</td>
                  <td>{bid.bid_price}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
