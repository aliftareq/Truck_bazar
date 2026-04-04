import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';

const MyOrders = () => {
    //context values
    const { user } = useContext(AuthContext)

    //use of query 
    const { data: bookings, isLoading } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://truckbazar-server-side.vercel.app/bookings?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('user-token')}`
                }
            })
            const data = await res.json()
            console.log(bookings);
            return data;
        }
    })

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <section className='px-10'>
            <div>
                <h1 className='text-3xl'>My Orders</h1>
            </div>
            {
                bookings?.length === 0
                    ?
                    <p className='text-xl lg:text-4xl mt-4 text-center font-bold'>
                        You have not booked or orederd any product yet.
                    </p>
                    :
                    <div className="overflow-x-auto mt-5">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>SL No.</th>
                                    <th>Image</th>
                                    <th>title</th>
                                    <th>Owner Email</th>
                                    <th>price</th>
                                    <th>Payment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    bookings?.map((booking, idx) =>
                                        <tr key={idx}>
                                            <th>{idx + 1}</th>
                                            <td>
                                                <img className='w-16' src={booking.product_img} alt="" />
                                            </td>
                                            <td>{booking.product_name}</td>
                                            <td>{booking.product_owner_email}</td>
                                            <td>{booking.product_price}</td>
                                            <td>
                                                {
                                                    booking.product_price && !booking.paid &&
                                                    <Link to={`/dashboard/payment/${booking._id}`}>
                                                        <button className='btn btn-primary btn-sm'>Pay</button>
                                                    </Link>
                                                }
                                                {
                                                    booking.product_price && booking.paid &&
                                                    <span className='text-green-400'>Paid</span>
                                                }
                                            </td>
                                        </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
            }

        </section>
    );
};

export default MyOrders;