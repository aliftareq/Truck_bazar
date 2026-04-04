import { useNavigate } from "react-router-dom";

const AdvertiseItem = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col rounded-xl overflow-hidden shadow-lg 
                    border border-gray-400 
                    hover:border-orange-400 hover:ring-1 hover:ring-orange-400 
                    hover:shadow-2xl hover:-translate-y-1 
                    transition-all duration-300 bg-gray-800">

      {/* Image */}
      <div className="overflow-hidden">
        <img
          alt=""
          className="object-cover w-full h-52 hover:scale-105 transition duration-300"
          src={product.img}
        />
      </div>

      {/* Content (SOFT CONTRAST) */}
      <div className="flex flex-col flex-1 p-5 bg-gray-700">
        
        {/* Price */}
        <p className="text-xl font-bold text-yellow-400">
          ৳{product.resale_Price}
        </p>

        {/* Title */}
        <h3 className="flex-1 py-2 text-lg font-semibold text-white">
          {product.name}
        </h3>

        {/* Meta */}
        <div className="flex justify-between text-xs text-gray-300 mt-2">
          <span>{product.time_of_post}</span>
          <span>{Math.floor(Math.random() * 5000)} views</span>
        </div>

        {/* Button */}
        <button
          onClick={() => navigate(`/product/${product._id}`)}
          className="mt-4 bg-orange-400 hover:bg-orange-500 text-white py-2 rounded-md font-semibold transition"
        >
          BOOK NOW
        </button>
      </div>
    </div>
  );
};

export default AdvertiseItem;