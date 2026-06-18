import { use } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";

const CreateProduct = () => {
  const { user } = use(AuthContext);
  // console.log(user);
  const handelCreateProduct = (e) => {
    e.preventDefault();
    const title = e.target.productTitle.value;
    const category = e.target.category.value;
    const minPrice = e.target.minPrice.value;
    const maxPrice = e.target.maxPrice.value;
    const condition = e.target.condition.value;
    const useTime = e.target.useTime.value;
    const productImg = e.target.productImg.value;
    const name = e.target.name.value;
    const email = e.target.email.value;
    const contact = e.target.contact.value;
    const sellerImg = e.target.image.value;
    const location = e.target.location.value;
    const description = e.target.description.value;
    // console.log(
    //   title,
    //   category,
    //   minPrice,
    //   maxPrice,
    //   condition,
    //   useTime,
    //   productImg,
    //   name,
    //   email,
    //   contact,
    //   sellerImg,
    //   location,
    //   description,
    // );
    const newProduct = {
      title: title,
      category: category,
      minPrice: minPrice,
      maxPrice: maxPrice,
      condition: condition,
      useTime: useTime,
      productImg: productImg,
      seller_name: name,
      seller_email: email,
      contact: contact,
      seller_Image: sellerImg,
      location: location,
      description: description,
      status: "pending",
    };

    fetch(`http://localhost:3000/myProducts?email=${email}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("after fetching", data);
        if (data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your product create has been success",
            showConfirmButton: false,
            timer: 1500,
          });
          e.target.reset();
        }
      });
  };

  return (
    <div className="card-body ">
      <form onSubmit={handelCreateProduct} className="fieldset">
        <div className="md:flex gap-6 space-y-2">
          <div className="w-6/12">
            <input
              type="text"
              required
              className="input rounded-2xl bg-white"
              name="productTitle"
              placeholder="Product Title"
            />
          </div>

          <select
            className="w-5/12 round-2xl bg-white rounded-2xl p-3"
            name="category"
            required
          >
            <option value="">Select a Category :</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Books">Books</option>
            <option value="Sports">Sports</option>
            <option value="Sports">other</option>
          </select>
        </div>

        <input
          type="number"
          name="minPrice"
          required
          className="input rounded-2xl bg-white"
          placeholder="Min Price You Want to Sale ($)"
        />
        <input
          type="number"
          name="maxPrice"
          required
          className="input rounded-2xl bg-white"
          placeholder="Max Price You Want to Sale ($)"
        />
        <div className="md:flex items-center gap-96">
          <div>
            <h3 className="text-xl">Product Condition : </h3>
            <div className="mt-5">
              <label className="md:flex items-center text-xl gap-3 ">
                <input
                  className="w-5 h-5 "
                  type="radio"
                  name="condition"
                  value="new"
                />
                Brand new
              </label>
            </div>

            <div>
              <label className="md:flex items-center text-xl gap-3 ">
                <input
                  className="w-5 h-5"
                  type="radio"
                  name="condition"
                  value="used"
                />
                used
              </label>
            </div>
          </div>
          <div>
            <h3 className="text-lg mb-3">Product using time : </h3>
            <input
              className="input rounded-2xl bg-white"
              type="text"
              name="useTime"
              required
              placeholder="e.g. 1 year 3 month "
            />
          </div>
        </div>
        <div className="mt-5">
          <h3 className="text-lg">Your Product Image URL : </h3>
          <input
            className=" w-full h-10 p-2 text-lg rounded-2xl bg-white"
            type="text"
            required
            name="productImg"
            placeholder="https://..."
          />
        </div>
        <div className="mt-5">
          <div className="md:flex w-full justify-between gap-3 space-y-2">
            <div className="md:flex flex-col w-full ">
              <label className="text-lg">Seller Name : </label>
              <input
                className="h-10 p-3 text-lg rounded-2xl bg-white"
                type="text"
                name="name"
                readOnly
                defaultValue={user.displayName}
              />
            </div>
            <div className="md:flex flex-col w-full">
              <label className="text-lg">Seller Email : </label>
              <input
                className="h-10 p-3 text-lg rounded-2xl bg-white"
                type="email"
                name="email"
                readOnly
                defaultValue={user.email}
              />
            </div>
          </div>
          <div className="md:flex w-full justify-between gap-3 mt-5 space-y-2">
            <div className="flex flex-col w-full ">
              <label className="text-lg">Seller Contact : </label>
              <input
                className="h-10 p-3 text-lg rounded-2xl bg-white"
                type="number"
                required
                name="contact"
                placeholder="e.g. +1-555-1234"
              />
            </div>
            <div className="md:flex flex-col w-full">
              <label className="text-lg">Seller image : </label>
              <input
                className="h-10 p-3 text-lg rounded-2xl bg-white"
                type="text"
                required
                name="image"
                placeholder="https://..."
              />
            </div>
          </div>
          <div className="mt-5">
            <h3 className="text-lg">Location : </h3>
            <input
              className=" w-full h-10 p-2 text-lg rounded-2xl bg-white"
              required
              type="text"
              name="location"
              placeholder="City, Country"
            />
          </div>
        </div>
        <div className="mt-5">
          <h3 className="text-lg">Simple Description About Your Product : </h3>
          <textarea
            className=" w-full h-10 p-2 text-lg rounded-2xl bg-white"
            name="description"
            required
          ></textarea>
        </div>
        <button className="btn btn-neutral bg-primary mt-4 rounded-2xl">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
