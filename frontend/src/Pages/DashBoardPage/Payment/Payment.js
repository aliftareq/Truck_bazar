import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckOutForm from './CheckOutForm';


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
console.log(stripePromise);

const Payment = () => {
    //hooks
    const booking = useLoaderData()

    //destructured data
    const { product_name, product_owner, product_price } = booking


    return (
        <div className='mx-10'>
            <div>
                <h1 className='text-lg lg:text-3xl font-bold'>
                    Payment for <span className='text-yellow-400'>{product_name}</span>
                </h1>
                <p className='text-sm lg:text-xl mt-5'>
                    Please Pay <strong>BDT : {product_price}</strong> for your product to <span className='font-bold'>{product_owner}</span>
                </p>
            </div>
            <div className='border boreder-2 border-green-400 w-64 lg:w-96 p-5 my-5'>
                <Elements stripe={stripePromise}>
                    <CheckOutForm booking={booking} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;