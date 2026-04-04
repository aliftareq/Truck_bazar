import React from 'react';
import truckImg from '../../../Assets/NewsLetter-images/truckletter_image_inverse.jpg'
import truckletter from '../../../Assets/NewsLetter-images/TruckLetter_black.svg'

const NewsLetter = () => {
    return (
        <section className='flex justify-around'>
            <div className='flex justify-center items-center'>
                <div className='p-10 lg:p-0'>
                    <div className='my-5'>
                        <img className='w-48' src={truckletter} alt="" />
                    </div>
                    <div className='my-5'>
                        <h3 className='font-bold'>TruckLetter</h3>
                        <p>News from TruckBazar – register now and stay informed.</p>
                    </div>
                    <div className='my-5'>
                        <button className='btn bg-orange-500 hover:bg-orange-600 border-none'>Subscribe To Truck-Letter →</button>
                    </div>
                </div>
            </div>
            <div className='hidden lg:block'>
                <img src={truckImg} alt="" />
            </div>
        </section>
    );
};

export default NewsLetter;