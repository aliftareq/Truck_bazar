import axios from "axios";
import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Contexts/AuthProvider";

const AddProducts = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [extraError, setExtraError] = useState("");

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://truckbazar-server-side.vercel.app/user?email=${user?.email}`,
      )
      .then((data) => {
        setCurrentUser(data.data);
      });
  }, [user?.email]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddProduct = (data) => {
    setExtraError("");

    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);

    if (data.resalePrice.includes(",")) {
      setExtraError(
        "Resale price should be a number. Don't use comma or special characters.",
      );
      return;
    }

    if (parseInt(data.resalePrice) >= 1000000) {
      setExtraError(
        "Price can't be higher than 1000000 to avoid payment error issue.",
      );
      return;
    }

    const currentDate = format(new Date(), "PP");

    fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imageBB_key}`,
      {
        method: "POST",
        body: formData,
      },
    )
      .then((res) => res.json())
      .then((imgdata) => {
        if (imgdata.success) {
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
            description: data.description,
          };

          fetch(`https://truckbazar-server-side.vercel.app/addproduct`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem("user-token")}`,
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((addproductData) => {
              if (addproductData.insertedId) {
                toast.success("Product data added successfully");
                navigate(`/category/${data.category}`);
              }
            });
        }
      });
  };

  return (
    <section className="py-8 px-3">
      <div className="p-5">
        <h1 className="text-2xl lg:text-5xl text-center font-bold text-white">
          Add Your Product Here
        </h1>
        <p className="text-center text-gray-400 mt-3 text-sm lg:text-base">
          Fill in all product details carefully and make your listing look
          professional.
        </p>
      </div>

      <section className="w-full max-w-6xl mx-auto rounded-2xl bg-[#0f172a] p-4 sm:p-6 shadow-2xl border border-slate-700">
        <form onSubmit={handleSubmit(handleAddProduct)}>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 bg-[#0b1324] rounded-2xl p-6 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-4">
                Product Information
              </h2>
              <p className="text-gray-400 leading-7 text-sm">
                Add your product information carefully with full details. Try
                not to provide any false information.
              </p>
            </div>

            <div className="lg:col-span-3 bg-[#0b1324] rounded-2xl p-6 border border-slate-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="product-owner" className="form-label">
                    Product Owner Name
                  </label>
                  <input
                    id="product-owner"
                    type="text"
                    defaultValue={user?.displayName}
                    className="form-input bg-slate-700 text-slate-200 cursor-not-allowed"
                    readOnly
                  />
                </div>

                <div>
                  <label htmlFor="owner-email" className="form-label">
                    Email
                  </label>
                  <input
                    id="owner-email"
                    type="email"
                    defaultValue={user?.email}
                    className="form-input bg-slate-700 text-slate-200 cursor-not-allowed"
                    readOnly
                  />
                </div>

                <div>
                  <label htmlFor="mobile-number" className="form-label">
                    Mobile Number
                  </label>
                  <input
                    id="mobile-number"
                    type="text"
                    placeholder="Enter mobile number"
                    className="form-input"
                    {...register("mobileNumber", {
                      required: "Mobile number is required",
                    })}
                  />
                  {errors.mobileNumber && (
                    <p className="form-error">{errors.mobileNumber.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="productName" className="form-label">
                    Product Name
                  </label>
                  <input
                    id="productName"
                    type="text"
                    placeholder="Enter product name"
                    className="form-input"
                    {...register("productName", {
                      required: "Product name is required",
                    })}
                  />
                  {errors.productName && (
                    <p className="form-error">{errors.productName.message}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select
                    id="category"
                    className="form-input"
                    defaultValue=""
                    {...register("category", {
                      required: "Category option is required",
                    })}
                  >
                    <option value="" disabled>
                      Please Select a Category
                    </option>
                    <option value="pick-up">Pick-up</option>
                    <option value="trucks&cover-van">Trucks & Cover Van</option>
                    <option value="trailer-truck">Trailer Truck</option>
                  </select>
                  {errors.category && (
                    <p className="form-error">{errors.category.message}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="location" className="form-label">
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    placeholder="Enter location"
                    className="form-input"
                    {...register("location", {
                      required: "Location is required",
                    })}
                  />
                  {errors.location && (
                    <p className="form-error">{errors.location.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="resalePrice" className="form-label">
                    Resale Price
                  </label>
                  <input
                    id="resalePrice"
                    type="text"
                    placeholder="Enter resale price"
                    className="form-input"
                    {...register("resalePrice", {
                      required: "Resale price is required",
                    })}
                  />
                  {errors.resalePrice && (
                    <p className="form-error">{errors.resalePrice.message}</p>
                  )}
                  {extraError && <p className="form-error">{extraError}</p>}
                </div>

                <div>
                  <label htmlFor="originalPrice" className="form-label">
                    Original Price
                  </label>
                  <input
                    id="originalPrice"
                    type="text"
                    placeholder="Enter original price"
                    className="form-input"
                    {...register("originalPrice", {
                      required: "Original price is required",
                    })}
                  />
                  {errors.originalPrice && (
                    <p className="form-error">{errors.originalPrice.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="condition" className="form-label">
                    Condition
                  </label>
                  <select
                    id="condition"
                    className="form-input"
                    defaultValue=""
                    {...register("conditon", {
                      required: "Condition option is required",
                    })}
                  >
                    <option value="" disabled>
                      Please Select Condition
                    </option>
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                  </select>
                  {errors.conditon && (
                    <p className="form-error">{errors.conditon.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="yearofPusrchase" className="form-label">
                    Year of Purchase
                  </label>
                  <input
                    id="yearofPusrchase"
                    type="text"
                    placeholder="Enter purchase year"
                    className="form-input"
                    {...register("yearofPusrchase", {
                      required: "Year of purchase is required",
                    })}
                  />
                  {errors.yearofPusrchase && (
                    <p className="form-error">
                      {errors.yearofPusrchase.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="yearofUse" className="form-label">
                    Year of Use
                  </label>
                  <input
                    id="yearofUse"
                    type="text"
                    placeholder="Enter years of use"
                    className="form-input"
                    {...register("yearofUse", {
                      required: "Year of use is required",
                    })}
                  />
                  {errors.yearofUse && (
                    <p className="form-error">{errors.yearofUse.message}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows="5"
                    placeholder="Write product description"
                    className="form-input resize-none"
                    {...register("description", {
                      required: "Description is required",
                    })}
                  ></textarea>
                  {errors.description && (
                    <p className="form-error">{errors.description.message}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="image" className="form-label">
                    Product Image
                  </label>
                  <input
                    id="image"
                    type="file"
                    className="block w-full rounded-xl border border-slate-600 bg-slate-800 text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-orange-500 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-orange-600"
                    {...register("image", {
                      required: "Image is required",
                    })}
                  />
                  {errors.image && (
                    <p className="form-error">{errors.image.message}</p>
                  )}
                </div>

                <div className="md:col-span-2 pt-2">
                  <input
                    className="w-full rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white shadow-lg transition duration-200 hover:bg-orange-600 cursor-pointer"
                    value="Add To List"
                    type="submit"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AddProducts;
