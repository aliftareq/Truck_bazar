import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { toast } from "react-toastify";
import BookingModal from "../BookingModal/BookingModal";

const ProductDetails = () => {
  const product = useLoaderData();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    _id,
    Year_of_Purchase,
    condition_Type,
    description,
    img,
    location,
    mobile_number,
    name,
    original_Price,
    resale_Price,
    seller_name,
    seller_verification,
    time_of_post,
    year_of_use,
  } = product;

  const handleReport = (id) => {
    fetch(
      `https://truckbazar-server-side.vercel.app/product/reportItems/${id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("user-token")}`,
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.info("This Product has been reported to admin");
        } else {
          toast.warn("This product has already been reported.");
        }
      });
  };

  return (
    <section className="bg-white py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white text-black rounded-2xl shadow-xl overflow-hidden border border-orange-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <img
                src={img}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 lg:p-8 space-y-4">
              <h1 className="text-2xl lg:text-4xl font-bold">{name}</h1>

              <p className="text-orange-500 text-2xl font-bold">
                ৳ {resale_Price}
              </p>

              <p>
                <span className="font-semibold">Original Price:</span> ৳{" "}
                {original_Price}
              </p>
              <p>
                <span className="font-semibold">Condition:</span>{" "}
                {condition_Type}
              </p>
              <p>
                <span className="font-semibold">Location:</span> {location}
              </p>
              <p>
                <span className="font-semibold">Year of Purchase:</span>{" "}
                {Year_of_Purchase}
              </p>
              <p>
                <span className="font-semibold">Year of Use:</span>{" "}
                {year_of_use} Years
              </p>
              <p>
                <span className="font-semibold">Posted On:</span> {time_of_post}
              </p>
              <p>
                <span className="font-semibold">Mobile Number:</span>{" "}
                {mobile_number}
              </p>

              <p className="flex items-center">
                <span className="font-semibold mr-2">Seller Name:</span>
                {seller_name}
                {seller_verification && (
                  <BsFillPatchCheckFill className="ml-2 text-blue-600" />
                )}
              </p>

              <p>
                <span className="font-semibold">Description:</span>{" "}
                {description}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <label
                  onClick={() => setSelectedProduct(product)}
                  htmlFor="booking-modal"
                  className="btn bg-orange-400 hover:bg-orange-500 border-none text-white"
                >
                  Book This Product
                </label>

                <button
                  onClick={() => handleReport(_id)}
                  className="btn bg-black hover:bg-gray-900 border-none text-white"
                >
                  Report this product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedProduct && (
        <BookingModal
          product={selectedProduct}
          setProduct={setSelectedProduct}
        />
      )}
    </section>
  );
};

export default ProductDetails;
