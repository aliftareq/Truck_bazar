import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../Contexts/AuthProvider';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';

const MyProducts = () => {
    //context values
    const { user } = useContext(AuthContext)

    //use of query 
    const { data: products, isLoading, refetch } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://truckbazar-server-side.vercel.app/myproducts?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('user-token')}`
                }
            })
            const data = await res.json()
            console.log(data);
            return data;
        }
    })

    //handlers

    //1. for deleting product
    const handledeleteUser = id => {
        const ans = window.confirm('Are you Sure about to delete this product?')
        if (ans) {
            fetch(`https://truckbazar-server-side.vercel.app/deleteproduct/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `bearer ${localStorage.getItem('user-token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        toast.warn('Remove From database Successfully')
                    }
                    refetch()
                })
        }

    }
    //2. for updating advertise
    const handleadvertise = id => {
        fetch(`https://truckbazar-server-side.vercel.app/product/advertise/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('user-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success('product added to advertise section')
                }
                else {
                    toast.info('already added in advertise section')
                }
                refetch()
            })
    }

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <section className='px-10'>
            <div>
                <h1 className='text-3xl mt-3'>My Products</h1>
            </div>
            {
                products?.length === 0
                    ?
                    <p className='text-xl lg:text-4xl text-center text-yellow-400 mt-4'>
                        You have Not Added any Products Yet.
                    </p>
                    :
                    <div className="overflow-x-auto mt-5">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>SL No.</th>
                                    <th>Name</th>
                                    <th>Sale Status</th>
                                    <th>Price</th>
                                    <th>Action-1</th>
                                    <th>Action-2</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products?.map((product, idx) =>
                                        <tr key={idx}>
                                            <th>{idx + 1}</th>
                                            <td>{product.name}</td>
                                            <td>
                                                {product?.paid
                                                    ? 'Sold'
                                                    : 'Available'
                                                }
                                            </td>
                                            <td>{product.resale_Price}</td>
                                            <td>
                                                {product.paid
                                                    ?
                                                    <button className='btn btn-xs btn-primary' disabled>
                                                        Advertise
                                                    </button>
                                                    :
                                                    <button onClick={() => handleadvertise(product._id)} className='btn btn-xs btn-primary'>
                                                        Advertise
                                                    </button>

                                                }
                                            </td>
                                            <td>
                                                <button onClick={() => handledeleteUser(product._id)} className='btn btn-xs btn-error'>
                                                    delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
            }


        </section>
    );
};

export default MyProducts;