import axios from 'axios';
import { format } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../Contexts/AuthProvider';

const AddProducts = () => {
    //states
    const [currentUser, setCurrentUser] = useState({})
    const [extraError, setExtraError] = useState('')

    //context value 
    const { user } = useContext(AuthContext)

    //loading data 
    //getting this seller info -1
    useEffect(() => {
        axios.get(`https://truckbazar-server-side.vercel.app/user?email=${user?.email}`)
            .then(data => {
                //console.log(data.data)
                setCurrentUser(data.data)
            })
    }, [user?.email])

    //navigation 
    const navigate = useNavigate()

    //react form hook
    const { register, handleSubmit, formState: { errors } } = useForm()

    //handlers 
    const handleAddProduct = data => {

        const image = data.image[0]
        const formData = new FormData();
        formData.append('image', image)



        //verification 
        if ((data.resalePrice.includes(','))) {
            setExtraError("resale Price should be a number, don't use comma or any special character")
            return;
        }

        if (parseInt(data.resalePrice) >= 1000000) {
            setExtraError("Price can't be higher than 1000000 to avoid payment error isssue.")
            return;
        }



        //date
        const date = new Date()
        const currentDate = format(date, "PP")

        fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imageBB_key}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgdata => {
                if (imgdata.success) {
                    //console.log(imgdata.data.url);
                    const product = {
                        CategoryName: data.category,
                        img: imgdata.data.url,
                        name: data.productName,
                        location: data.location,
                        resale_Price: data.resalePrice,
                        original_Price: data.originalPrice,
                        year_of_use: data.yearofUse,
                        time_of_post: currentDate,
                        seller_name: user?.displayName,
                        seller_email: user?.email,
                        seller_verification: currentUser?.seller_verification || false,
                        condition_Type: data.conditon,
                        mobile_number: data.mobileNumber,
                        Year_of_Purchase: data.yearofPusrchase,
                        description: data.description
                    }
                    console.log(product);
                    //save product info to database
                    fetch(`https://truckbazar-server-side.vercel.app/addproduct`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('user-token')}`
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(addproductData => {
                            console.log(addproductData);
                            if (addproductData.insertedId) {
                                toast.success('Product data added successfully')
                                navigate(`/category/${data.category}`)
                            }

                        })
                }
            })
    }
    return (
        <section>
            <div className='p-5'>
                <h1 className='text-2xl lg:text-5xl text-center'>Add Your Product Here.</h1>
            </div>
            <section className="p-6 w-64 mx-auto lg:w-4/5
             lg:mx-auto bg-gray-800 text-gray-50
             rounded-xl">
                <form onSubmit={handleSubmit(handleAddProduct)} className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
                    <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-900">
                        <div className="space-y-2 col-span-full lg:col-span-1">
                            <p className="font-medium">Product Inormation</p>
                            <p className="text-xs">Add Your Product infromation Carefully with full details, please try to not giving any false information!</p>
                        </div>
                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="product-owner" className="text-sm">Product owner Name</label>
                                <input id="product-owner" type="text" defaultValue={user?.displayName} className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 px-2" readOnly />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="owner-email" className="text-sm">Email</label>
                                <input id="owner-email" type="email" defaultValue={user?.email} className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 px-2" readOnly />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="mobile-number" className="text-sm">Mobile Number</label>
                                <input id="mobile-number" type="text" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 px-2"
                                    {...register("mobileNumber", {
                                        required: 'mobileNumber is required'
                                    })}
                                />
                                {errors.mobileNumber && <p className='text-red-400' role="alert">{errors.mobileNumber?.message}</p>}
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="productName" className="text-sm">Product name</label>
                                <input id="productName" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 px-2"
                                    {...register("productName", {
                                        required: 'Product Name is required'
                                    })}
                                />
                                {errors.productName && <p className='text-red-400' role="alert">{errors.productName?.message}</p>}
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="category" className="text-sm">Category</label>
                                <select className="select select-primary w-full
                                rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                    {...register("category", {
                                        required: 'category option is required'
                                    })}
                                >
                                    <option disabled selected>Please Select a Category</option>
                                    <option value='pick-up'>pick-up</option>
                                    <option value='trucks&cover-van'>trucks&cover-van</option>
                                    <option value='trailer-truck'>trailer-truck</option>
                                </select>
                                {errors.category && <p className='text-red-400' role="alert">{errors.category?.message}</p>}
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="location" className="text-sm">location</label>
                                <input id="location" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 px-2"
                                    {...register("location", {
                                        required: 'location option is required'
                                    })}
                                />
                                {errors.location && <p className='text-red-400' role="alert">{errors.location?.message}</p>}
                            </div>
                            <div className="col-span-full sm:col-span-2">
                                <label htmlFor="city" className="text-sm">Resale Price</label>
                                <input id="city" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 px-2"
                                    {...register("resalePrice", {
                                        required: 'resalePrice option is required'
                                    })}
                                />
                                {errors.resalePrice && <p className='text-red-400' role="alert">{errors.resalePrice?.message}</p>}
                                {extraError &&
                                    <p className='text-red-400' role="alert">{extraError}</p>
                                }
                            </div>
                            <div className="col-span-full sm:col-span-2">
                                <label htmlFor="state" className="text-sm">Original Price</label>
                                <input id="state" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 px-2"
                                    {...register("originalPrice", {
                                        required: 'original Price option is required'
                                    })}
                                />
                                {errors.originalPrice && <p className='text-red-400' role="alert">{errors.originalPrice?.message}</p>}
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="zip" className="text-sm">Condition</label>
                                <select className="select select-primary w-full
                                rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900"
                                    {...register("conditon", {
                                        required: 'conditon option is required'
                                    })}
                                >
                                    <option disabled selected>Please Select a Category</option>
                                    <option value='excellent'>excellent</option>
                                    <option value='good'>good</option>
                                    <option value='fair'>fair</option>
                                </select>
                                {errors.conditon && <p className='text-red-400' role="alert">{errors.conditon?.message}</p>}
                            </div>
                            <div className="col-span-full sm:col-span-2">
                                <label htmlFor="zip" className="text-sm">Year of Purchase</label>
                                <input id="zip" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 px-2"
                                    {...register("yearofPusrchase", {
                                        required: 'year of Pusrchase option is required'
                                    })}
                                />
                                {errors.yearofPusrchase && <p className='text-red-400' role="alert">{errors.yearofPusrchase?.message}</p>}
                            </div>
                            <div className="col-span-full sm:col-span-2">
                                <label htmlFor="zip" className="text-sm">Year of use</label>
                                <input id="zip" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 px-2"
                                    {...register("yearofUse", {
                                        required: 'year of Use option is required'
                                    })}
                                />
                                {errors.yearofUse && <p className='text-red-400' role="alert">{errors.yearofUse?.message}</p>}
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="description" className="text-sm">Description</label>
                                <textarea id="description" type="text" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 px-1"
                                    {...register("description", {
                                        required: 'description is required'
                                    })}
                                ></textarea>
                                {errors.description && <p className='text-red-400' role="alert">{errors.description?.message}</p>}
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="image" className="text-sm">Product Image</label> <br />
                                <input id="image" type="file"
                                    className="file-input file-input-bordered w-full max-w-xs text-black"
                                    {...register("image", {
                                        required: 'image is required'
                                    })} />
                                {errors.image && <p className='text-red-400' role="alert">{errors.image?.message}</p>}
                            </div>
                            <div className="col-span-full">
                                <input className="px-4 py-2
                                 rounded-md w-full bg-orange-500 hover:bg-orange-600"
                                    value='Add To List' type="submit" />
                            </div>
                        </div>
                    </fieldset>
                </form>
            </section>
        </section>
    );
};

export default AddProducts;