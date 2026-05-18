import Hero from "../Page/Hero";
import LatestProducts from "../Page/LatestProducts";

const latestProductsPromise = fetch(
  "http://localhost:3000/latest-products",
).then((res) => res.json());

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <LatestProducts
        latestProductsPromise={latestProductsPromise}
      ></LatestProducts>
    </div>
  );
};

export default Home;
