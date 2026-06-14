const CreateProduct = () => {
  return (
    <div className="card-body ">
      <fieldset className="fieldset">
        <div className="flex gap-6 ">
          <div className="w-6/12">
            <input
              type="text"
              className="input rounded-2xl bg-white "
              placeholder="Product Title"
            />
          </div>

          <select
            className="w-5/12 round-2xl bg-white rounded-2xl p-3"
            id="category "
          >
            <option className="required " value="">
              Select a Category{" "}
            </option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Books">Books</option>
            <option value="Sports">Sports</option>
            <option value="Sports">other</option>
          </select>
        </div>

        <input
          type="text "
          className="input rounded-2xl bg-white"
          required
          placeholder="Min Price You Want to Sale ($)"
        />
        <input
          type="text"
          className="input rounded-2xl bg-white"
          required
          placeholder="Max Price You Want to Sale ($)"
        />
        <div className="flex items-center gap-96">
          <div>
            <h3 className="text-xl">Product Condition</h3>
            <div className="mt-5">
              <label className="flex items-center text-xl gap-3 ">
                <input
                  className="w-5 h-5 "
                  required
                  type="radio"
                  name="condition"
                  value="new"
                />
                Brand new
              </label>
            </div>

            <div>
              <label className="flex items-center text-xl gap-3 ">
                <input
                  className="w-5 h-5"
                  required
                  type="radio"
                  name="condition"
                  value="used"
                />
                used
              </label>
            </div>
          </div>
          <div>
            <h3 className="text-lg mb-3">Product using time</h3>
            <input
              className="input rounded-2xl bg-white"
              type="text"
              name=""
              placeholder="e.g. 1 year 3 month "
            />
          </div>
        </div>
        <div className="mt-5">
          <h3 className="text-lg">Your Product Image URL</h3>
          <input
            className=" w-full h-10 p-2 text-lg rounded-2xl bg-white"
            type="text"
            name=""
            placeholder="https://..."
          />
        </div>
        <div className="mt-5">
          <div className="flex w-full justify-between gap-3">
            <div className="flex flex-col w-full ">
              <label className="text-lg">Seller Name</label>
              <input
                className="h-10 p-3 text-lg rounded-2xl bg-white"
                type="text"
                name="name"
                placeholder="seller name"
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="text-lg">Seller Email</label>
              <input
                className="h-10 p-3 text-lg rounded-2xl bg-white"
                type="email"
                name="email"
                placeholder="seller email"
              />
            </div>
          </div>
          <div className="flex w-full justify-between gap-3 mt-5">
            <div className="flex flex-col w-full ">
              <label className="text-lg">Seller Contact</label>
              <input
                className="h-10 p-3 text-lg rounded-2xl bg-white"
                type="text"
                name="contact"
                placeholder="e.g. +1-555-1234"
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="text-lg">Seller image</label>
              <input
                className="h-10 p-3 text-lg rounded-2xl bg-white"
                type="text"
                name="image"
                placeholder="https://..."
              />
            </div>
          </div>
          <div className="mt-5">
            <h3 className="text-lg">Location</h3>
            <input
              className=" w-full h-10 p-2 text-lg rounded-2xl bg-white"
              type="text"
              name=""
              placeholder="City, Country"
            />
          </div>
        </div>
        <div className="mt-5">
          <h3 className="text-lg">Simple Description About Your Product</h3>
          <textarea
            className=" w-full h-10 p-2 text-lg rounded-2xl bg-white"
            name=""
            id=""
          >
            <input
              type="text"
              name="description"
              placeholder="e.g. I bought this product 3 month ago. did not used more than 1/2 time. actually learning
 guitar is so tough..... "
            />
          </textarea>
        </div>
        <button className="btn btn-neutral bg-primary mt-4 rounded-2xl">
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default CreateProduct;
