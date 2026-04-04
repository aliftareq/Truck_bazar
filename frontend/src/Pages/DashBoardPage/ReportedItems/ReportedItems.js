import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';

const ReportedItems = () => {
    //states

    //loading doctors
    const { data: products, isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            const res = await fetch(`https://truckbazar-server-side.vercel.app/product/reportedItems`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('user-token')}`
                }
            })
            const data = await res.json()
            return data
        }
    })

    //handlers 
    const handleDeleteDoctor = (id, name) => {
        const ans = window.confirm('Are you Sure about to delete this product?')
        if (ans) {
            fetch(`https://truckbazar-server-side.vercel.app/deleteproduct/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `bearer ${localStorage.getItem('patient-token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount) {
                        toast.success(`${name} has been deleted from the product list`)
                        refetch()
                    }
                })
        }

    }

    if (isLoading) {
        <LoadingSpinner></LoadingSpinner>
    }
    return (
        <section className='px-10'>
            <div className='my-4'>
                <h1 className='text-xl lg:text-4xl'>This page is for manage Reported items</h1>
            </div>
            <div className="overflow-x-auto mt-5">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>SL No.</th>
                            <th>Product Image</th>
                            <th>Product Name</th>
                            <th>Product owner</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products?.map((product, idx) =>
                                <tr key={idx}>
                                    <th>{idx + 1}</th>
                                    <th>
                                        <img className='w-16' src={product.img} alt='productPic' />
                                    </th>
                                    <td>{product?.name}</td>
                                    <td>{product?.seller_name}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDeleteDoctor(product._id, product.name)}
                                            className="btn btn-xs btn-error">
                                            delete
                                        </button>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default ReportedItems;