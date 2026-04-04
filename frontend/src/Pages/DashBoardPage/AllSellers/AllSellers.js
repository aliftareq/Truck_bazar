import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';

const AllSellers = () => {

    //loading data using useQuery
    const { data: users, isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch(`https://truckbazar-server-side.vercel.app/sellers`, {
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

    //1. for making user varifed
    const handleVarifyUser = id => {
        fetch(`https://truckbazar-server-side.vercel.app/users/verify/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('user-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success('User varified Successfully')
                    refetch()
                }
                refetch()
            })
    }

    //2. for making admin
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

    //3. for delete from user list
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
                        toast.warn('Remove From database Successfully')
                    }
                    refetch()
                })
        }

    }
    return (
        <section className='px-10'>
            <div>
                <h1 className='text-3xl'>All Sellers</h1>
            </div>
            <div className="overflow-x-auto mt-5">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>SL No.</th>
                            <th>Name</th>
                            <th>email</th>
                            <th>Status</th>
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
                                        {user?.seller_verification
                                            ?
                                            <p className='text-blue-400 font-semibold'>Varified</p>
                                            :
                                            <button onClick={() => handleVarifyUser(user._id)} className='btn btn-xs btn-primary'>
                                                Varify_him
                                            </button>
                                        }
                                    </td>
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

export default AllSellers;