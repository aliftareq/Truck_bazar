import React from 'react';
import { BsFillPatchCheckFill } from "react-icons/bs";
import { toast } from 'react-toastify';

const SingelProduct = ({ product, setProduct }) => {
    const { Year_of_Purchase, condition_Type, description, img, location, mobile_number, name, original_Price, resale_Price, seller_name, seller_verification, time_of_post, year_of_use } = product

    //handlers
    const handleRepoert = (id) => {
        fetch(`https://truckbazar-server-side.vercel.app/product/reportItems/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('user-token')}`
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.info('This Product has been reported to admin')
                }
                else {
                    toast.warn('This product has been reported by someone already.')
                }
            })
    }
    return (
        <section>
            <div className="bg-white text-black my-10
                 container flex flex-col mx-auto lg:flex-row
                rounded-lg shadow-xl">
                <div className="w-full lg:w-3/5">
                    <img className='h-full rounded-lg' src={img} alt="" />
                </div>
                <div className="bg-gray-100 flex flex-col w-full p-6 lg:w-2/3 md:p-8 lg:p-12 space-y-1 lg:space-y-2">
                    <h1 className='text-xl lg:text-4xl'>
                        Name : <span className='font-bold italic'>{name}</span>
                    </h1>
                    <p className='text-lg'>
                        <span className='font-semibold'>Condition </span> : {condition_Type}
                    </p>
                    <p className='text-lg'>
                        <span className='font-semibold'>Location </span> : {location}
                    </p>
                    <div className='flex'>
                        <p className='text-lg'>
                            <span className='font-semibold'>Resale-Price </span>: <span className='font-extrabold text-xl'>{resale_Price}</span>
                        </p>
                        <p className='text-lg ml-4'>
                            <span className='font-semibold'>Original-Price</span> : {original_Price}
                        </p>
                    </div>
                    <div className='flex'>
                        <p className='text-lg'>
                            <span className='font-semibold'>Year of Purchase </span> : {Year_of_Purchase}
                        </p>
                        <p className='text-lg ml-4'>
                            <span className='font-semibold'>Year of use </span> : {year_of_use} Years
                        </p>
                    </div>
                    <div className=''>
                        <p className='text-lg flex'>
                            <span className='font-semibold'>Seller Name </span> :
                            <span className='flex items-center ml-2'>{seller_name}{seller_verification ? <BsFillPatchCheckFill className='ml-2 text-blue-600' /> : ''}</span>
                        </p>
                    </div>
                    <div>
                        <p className='text-lg'>
                            <span className='font-semibold'> Mobile Number </span> : {mobile_number}
                        </p>
                    </div>
                    <div>
                        <p className='text-lg'>
                            <span className='font-semibold'> Posted-On </span> : {time_of_post}
                        </p>
                        <p className='text-lg'>
                            <span className='font-semibold'> Description </span> : {description.slice(0, 100)}....<span className='font-bold'>See details</span>
                        </p>
                    </div>
                    <div className="card-actions">
                        <label
                            onClick={() => setProduct(product)}
                            htmlFor="booking-modal"
                            className="btn bg-orange-500
                         hover:bg-orange-400 border-none
                          text-white font-bold"
                        >
                            Book This Product
                        </label>
                        <button onClick={() => handleRepoert(product._id)} className='btn btn-error hover:bg-red-600'>
                            Report this product
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SingelProduct;