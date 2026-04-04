import { format } from "date-fns";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../Contexts/AuthProvider";

const BookingModal = ({ product, setProduct }) => {
  const { _id, name, resale_Price, seller_name, seller_email, img } = product;
  const { user } = useContext(AuthContext);

  const date = new Date();
  const currentdate = format(date, "PP");

  const handleBooking = (e) => {
    e.preventDefault();
    const form = e.target;

    const booking = {
      buyer_Name: user?.displayName,
      buyer_email: user?.email,
      buyer_Number: form.phone.value,
      meeting_location: form.location.value,
      product_name: name,
      product_img: img,
      product_id: _id,
      product_price: resale_Price,
      product_owner: seller_name,
      product_owner_email: seller_email,
      booking_date: currentdate,
    };

    fetch(`https://truckbazar-server-side.vercel.app/bookings`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("user-token")}`,
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Product Booked Successfully");
        } else {
          toast.warn(data.message);
        }
        setProduct(null);
        form.reset();
      });
  };

  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />

      <div className="modal">
        <div className="modal-box relative max-w-2xl rounded-2xl bg-white text-black shadow-2xl border border-orange-200 p-0 overflow-hidden">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-4 top-4 bg-transparent hover:bg-orange-500 border-none text-white"
          >
            ✕
          </label>

          <div className="bg-gradient-to-r from-black to-gray-900 px-6 lg:px-8 py-6">
            <h3 className="text-xl lg:text-2xl font-bold text-white">
              Confirm Your Booking
            </h3>
            <p className="text-sm text-gray-300 mt-2">
              Fill in your details to book this truck quickly and securely.
            </p>
          </div>

          <div className="p-6 lg:p-8">
            <form onSubmit={handleBooking} className="grid grid-cols-1 gap-4">
              <input
                type="text"
                value={name}
                className="input input-bordered w-full font-bold bg-white text-black border-gray-300 disabled:bg-white disabled:text-black disabled:opacity-100"
                disabled
              />

              <input
                type="text"
                value={`Resale price : ${resale_Price}`}
                className="input input-bordered w-full font-bold bg-white text-black border-gray-300 disabled:bg-white disabled:text-black disabled:opacity-100"
                disabled
              />

              <input
                name="name"
                type="text"
                defaultValue={user?.displayName}
                className="input input-bordered w-full font-bold bg-white text-black border-gray-300 disabled:bg-white disabled:text-black disabled:opacity-100"
                disabled
              />

              <input
                name="email"
                type="email"
                defaultValue={user?.email}
                className="input input-bordered w-full font-bold bg-white text-black border-gray-300 disabled:bg-white disabled:text-black disabled:opacity-100"
                disabled
              />

              <input
                name="phone"
                type="text"
                placeholder="Phone Number"
                className="input input-bordered w-full bg-white text-black border-gray-300 focus:border-orange-400 focus:outline-none"
                required
              />

              <input
                name="location"
                type="text"
                placeholder="Meeting location"
                className="input input-bordered w-full bg-white text-black border-gray-300 focus:border-orange-400 focus:outline-none"
                required
              />

              <input
                type="submit"
                value="SUBMIT BOOKING"
                className="btn bg-orange-400 hover:bg-orange-500 border-none text-white w-full mt-2"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
