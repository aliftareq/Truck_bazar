import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineLocationMarker, HiOutlineCalendar } from "react-icons/hi";

const SingelProduct = ({ product }) => {
  const { _id, img, name, resale_Price, location, Year_of_Purchase } = product;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden border border-orange-100">
      <img src={img} alt={name} className="w-full h-56 object-cover" />

      <div className="p-5 space-y-3">
        <h2 className="text-xl font-bold text-gray-800">{name}</h2>

        <p className="text-orange-500 text-lg font-bold">৳ {resale_Price}</p>

        <p className="flex items-center text-gray-600 text-sm">
          <HiOutlineLocationMarker className="mr-2 text-orange-500 text-lg" />
          {location}
        </p>

        <p className="flex items-center text-gray-600 text-sm">
          <HiOutlineCalendar className="mr-2 text-orange-500 text-lg" />
          Year of Purchase: {Year_of_Purchase}
        </p>

        <Link to={`/product/${_id}`}>
          <button className="btn w-full bg-orange-400 hover:bg-orange-500 border-none text-white mt-3">
            See Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SingelProduct;
