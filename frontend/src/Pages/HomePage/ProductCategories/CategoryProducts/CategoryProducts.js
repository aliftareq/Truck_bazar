import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookingModal from '../BookingModal/BookingModal';
import SingelProduct from '../SingelProduct/SingelProduct';

const CategoryProducts = () => {
    //states
    const [product, setProduct] = useState({})

    //loading data
    const data = useLoaderData()
    const products = data
    console.log(products);
    return (
        <section className='bg-whtie my-10'>
            <div className=''>
                <h1 className='text-black text-lg lg:text-3xl text-center mt-5 font-bold'>
                    Available Products for {data[0]?.CategoryName ? <span className='text-3xl lg:text-5xl text-amber-400 uppercase'>{data[0]?.CategoryName}</span> : ''}  Category
                </h1>
            </div>
            <div className='mx-10 my-5 lg:my-10'>
                {
                    products.map(product => <SingelProduct
                        key={product._id}
                        product={product}
                        setProduct={setProduct}
                    ></SingelProduct>)
                }
            </div>
            {
                product &&
                <BookingModal
                    product={product}
                    setProduct={setProduct}
                ></BookingModal>
            }
        </section>
    );
};

export default CategoryProducts;