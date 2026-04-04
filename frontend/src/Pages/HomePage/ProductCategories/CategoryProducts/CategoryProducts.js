import React from "react";
import { useLoaderData } from "react-router-dom";
import SingelProduct from "../SingelProduct/SingelProduct";

const CategoryProducts = () => {
  const products = useLoaderData();

  return (
    <section className="bg-white my-10">
      <div>
        <h1 className="text-black text-lg lg:text-3xl text-center mt-5 font-bold">
          Available Products for{" "}
          {products[0]?.CategoryName ? (
            <span className="text-3xl lg:text-5xl text-amber-400 uppercase">
              {products[0]?.CategoryName}
            </span>
          ) : (
            ""
          )}{" "}
          Category
        </h1>
      </div>

      <div className="mx-5 lg:mx-10 my-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product) => (
          <SingelProduct key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default CategoryProducts;
