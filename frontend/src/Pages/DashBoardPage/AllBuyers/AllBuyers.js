import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';

const AllBuyers = () => {

    //loading data using useQuery
    const { data: users, isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch(`https://truckbazar-server-side.vercel.app/buyers`, {
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
    const handleMakeAdmin = id => {
        fetch(`https://truckbazar-server-side.vercel.app/users/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('user-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success('Updated his role as admin suceessfully, check admin route for be sure.')
                }
                refetch()
            })
    }

    //2. for deleting user
    const handledeleteUser = id => {
        const ans = window.confirm('Are you Sure about to delete this user?')
        if (ans) {
            fetch(`https://truckbazar-server-side.vercel.app/users/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `bearer ${localStorage.getItem('user-token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        toast.warn('Removed from database and buyer list successfully')
                    }
                    refetch()
                })
        }

    }
    return (
        <section className='px-10'>
            <div>
                <h1 className='text-3xl'>All Buyers</h1>
            </div>
            <div className="overflow-x-auto mt-5">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>SL No.</th>
                            <th>Name</th>
                            <th>email</th>
                            <th>Action-1</th>
                            <th>Action-2</th>
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
                                        {user?.role !== 'admin'
                                            ? <button onClick={() => handleMakeAdmin(user._id)} className='btn btn-xs btn-primary'>
                                                Make Admin
                                            </button>
                                            : 'admin'}
                                    </td>
                                    <td>
                                        <button onClick={() => handledeleteUser(user._id)} className='btn btn-xs btn-error'>
                                            delete
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

export default AllBuyers;