import { format } from 'date-fns';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../../Contexts/AuthProvider';

const BookingModal = ({ product, setProduct }) => {
    const { _id, name, resale_Price, seller_name, seller_email, img } = product

    //context values
    const { user } = useContext(AuthContext)

    //date
    const date = new Date()
    const currentdate = format(date, 'PP')
    //console.log(currentdate);

    //handlers
    const handleBooking = (e) => {
        e.preventDefault()
        const form = e.target
        const buyer_Number = form.phone.value
        const meeting_location = form.location.value
        const buyer_Name = user?.displayName
        const buyer_email = user?.email
        const product_name = name
        const product_img = img
        const product_id = _id
        const product_price = resale_Price
        const product_owner = seller_name
        const product_owner_email = seller_email
        const booking_date = currentdate

        const booking = {
            buyer_Name,
            buyer_email,
            buyer_Number,
            meeting_location,
            product_name,
            product_img,
            product_id,
            product_price,
            product_owner,
            product_owner_email,
            booking_date,
        }
        // console.log(date, name, email, phone, slot);
        console.log(booking);


        //sending data to server
        fetch(`https://truckbazar-server-side.vercel.app/bookings`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('user-token')}`
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    toast.success('Product Booked Successfully')
                }
                else {
                    toast.warn(data.message)
                }
                setProduct(null)
                form.reset()
            })
    }
    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Confirm Your Booking filling this Information</h3>
                    <div className=''>
                        <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10' >
                            <input type="text" value={name} className="input input-bordered w-full font-semibold" disabled />
                            <input type="text" value={`Resale price : ${resale_Price}`} className="input input-bordered w-full font-semibold" disabled />
                            <input name='name' type="text" defaultValue={user?.displayName} placeholder="Full Name" className="input input-bordered w-full" disabled />
                            <input name='email' type="email" defaultValue={user?.email} className="input input-bordered w-full" disabled />
                            <input name='phone' type="text" placeholder="Phone Number" className="input input-bordered w-full" required />
                            <input name='location' type="text" placeholder="Meeting location" className="input input-bordered w-full" required />
                            <br />
                            <input type="submit" value="Submit" className="btn bg-orange-400 hover:bg-orange-500 border-none input w-full" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookingModal;