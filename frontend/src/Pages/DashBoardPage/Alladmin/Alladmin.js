import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';

const Alladmin = () => {

    //loading data using useQuery
    const { data: users, isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch(`https://truckbazar-server-side.vercel.app/admin`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('user-token')}`
                }
            })
            const data = await res.json()
            return data
        }
    })

    //using loading
    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    // handlers 

    //1. for making admin
    const handleRemoveFromAdmin = id => {
        fetch(`https://truckbazar-server-side.vercel.app/users/remove-from-admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('user-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success('Remove from admin successfully, & transeferred into buyers list.')
                }
                refetch()
            })
    }

    return (
        <section className='px-10'>
            <div>
                <h1 className='text-3xl'>All Admin</h1>
            </div>
            <div className="overflow-x-auto mt-5">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>SL No.</th>
                            <th>Name</th>
                            <th>email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, idx) =>
                                <tr key={idx}>
                                    <th>{idx + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button onClick={() => handleRemoveFromAdmin(user._id)} className='btn btn-xs btn-error'>
                                            Remove from admin
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default Alladmin;