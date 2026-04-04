import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Header.css'
import { Carousel } from 'react-responsive-carousel';
import pic1 from '../../../Assets/images/slider-img-1.jpg'
import pic2 from '../../../Assets/images/slider-img-2.jpg'
import pic3 from '../../../Assets/images/slider-img-3.jpg'
import pic4 from '../../../Assets/images/slider-image-4.jpg'

const Header = () => {
    return (
        <section className='bg-black border border-black'>
            <Carousel className='mx-10 lg:mx-24' autoPlay infiniteLoop>
                <div>
                    <img src={pic4} alt='pic1' />
                    <p className="legend hidden lg:block">Welcome</p>
                </div>
                <div>
                    <img src={pic3} alt='pic1' />
                    <p className="legend hidden lg:block">Explore More</p>
                </div>
                <div>
                    <img src={pic2} alt='pic1' />
                    <p className="legend hidden lg:block">Explore More</p>
                </div>
                <div>
                    <img src={pic1} alt='pic1' />
                    <p className="legend hidden lg:block">Explore More</p>
                </div>
            </Carousel>
        </section>
    );
};

export default Header;