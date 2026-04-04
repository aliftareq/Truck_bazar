import React from 'react';

const AdvertiseItem = ({ product }) => {
    return (
        <div className="flex flex-col shadow-xl rounded">
            <div>
                <img alt="" className="object-cover w-full h-52 dark:bg-gray-500" src={product.img} />
            </div>
            <div className="flex flex-col flex-1 p-6">
                <p className="text-lg font-bold tracking-wider uppercase hover:underline dark:text-violet-400">
                    ৳{product.resale_Price}
                </p>
                <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">
                    {product.name}
                </h3>
                <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-400">
                    <span>{product.time_of_post}</span>
                    <span>2.1K views</span>
                </div>
                <button className='btn uppercase bg-orange-400 hover:bg-orange-500 mt-4 border-none'>
                    Book Now
                </button>
            </div>
        </div>
    );
};

export default AdvertiseItem;