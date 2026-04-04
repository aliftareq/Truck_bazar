import React from 'react';
import mailTruck from '../../../Assets/images/mail-truck-removebg-preview.png'

const ContactUs = () => {
    return (
        <section>
            <div className="grid grid-cols-1 gap-8 px-8 py-16 mx-auto md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 bg-black text-gray-100">
                <div className="flex flex-col justify-between">
                    <div className="space-y-2">
                        <h2 className="text-4xl font-bold leading-tight lg:text-5xl">Contact Us!!!</h2>
                        <p className="text-gray-100">Let Know us your desired service and Product through this form</p>
                        <div className='w-64 lg:w-96'>
                            <img src={mailTruck} alt="" className="cover" />
                        </div>
                    </div>
                </div>
                <form noValidate="" className="space-y-6 ng-untouched ng-pristine ng-valid">
                    <div>
                        <label htmlFor="name" className="text-sm">Full name</label>
                        <input id="name" type="text" placeholder="" className="w-full border p-3 rounded bg-white text-black" />
                    </div>
                    <div>
                        <label htmlFor="email" className="text-sm">Email</label>
                        <input id="email" type="email" className="w-full border p-3 rounded bg-white text-black" />
                    </div>
                    <div>
                        <label htmlFor="message" className="text-sm">Message</label>
                        <textarea id="message" rows="3" className="w-full border p-3 rounded bg-white text-black"></textarea>
                    </div>
                    <button type="submit" className="w-full p-3 text-sm font-bold tracking-wide uppercase rounded bg-violet-400 text-gray-900">Send Message</button>
                </form>
            </div>
            <hr />
        </section>
    );
};

export default ContactUs;