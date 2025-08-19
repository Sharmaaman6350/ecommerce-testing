// // ✅ ShippingAddressSidebar.jsx
// import React, { useState } from "react";
// import { IoClose, IoLocationSharp, IoCallOutline } from "react-icons/io5";
// import { FaMapMarkerAlt } from "react-icons/fa";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const ShippingAddressSidebar = ({ onClose, product }) => {
//   const  navigate =useNavigate();
//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     house: "",
//     road: "",
//     pincode: "",
//     city: "",
//     state: "",
//     landmark: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//  const handleSubmit = async () => {
//   try {
//     const token = localStorage.getItem("token"); // or use context
//     if (!token) {
//       toast.error("Please login first.");
//       return;
//     }

//     const { data } = await axios.post(
//       `${import.meta.env.VITE_API_BASE_URL}/payment/create`,
//       {
//         amount: product.price * 100,
//         currency: "INR",
//         receipt: `order_rcptid_${Math.floor(Math.random() * 1000000)}`,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     const { order } = data;

//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY,
//       amount: order.amount,
//       currency: order.currency,
//       name: "Bazaarsell",
//       description: product.title,
//       image: "/logo.png",
//       order_id: order.id,
//       handler: function (response) {
//         toast.success("Payment Successful!");
//         console.log("Payment ID:", response.razorpay_payment_id);
//         navigate("/orders");
//       },
//       prefill: {
//         name: form.name,
//         phone: form.phone,
//       },
//       theme: {
//         color: "#ec4899",
//       },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//     onClose();
//   } catch (error) {
//     console.error("Payment Error:", error);
//     toast.error("Payment failed. Try again later.");
//   }
// };

//   return (
//     <div className="fixed inset-0 z-50 flex justify-end bg-white/30 backdrop-blur-md p-6 rounded-xl shadow-md bg-opacity-20">
//       <div className="w-full max-w-md bg-white h-full shadow-lg p-6 overflow-y-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-lg font-semibold">ADD DELIVERY ADDRESS</h2>
//           <button onClick={onClose}>
//             <IoClose className="text-2xl" />
//           </button>
//         </div>

//         <div>
//           <div className="flex justify-between items-center mb-3">
//             <h3 className="font-semibold text-gray-700 flex items-center gap-1">
//               <IoCallOutline className="text-pink-600" /> phone Details
//             </h3>
//             <button className="text-pink-600 border border-pink-600 text-sm px-3 py-1 rounded-full hover:bg-pink-50">
//               📍 Use My Location
//             </button>
//           </div>

//           <input name="name" type="text" placeholder="Name" value={form.name} onChange={handleChange} className="w-full border-b py-2 mb-4 focus:outline-none" />
//           <input name="phone" type="tel" placeholder="phone Number" value={form.phone} onChange={handleChange} className="w-full border-b py-2 mb-6 focus:outline-none" />
//         </div>

//         <div>
//           <h3 className="font-semibold text-gray-700 flex items-center gap-1 mb-3">
//             <FaMapMarkerAlt className="text-pink-600" /> Address
//           </h3>

//           <input name="house" type="text" placeholder="House no./ Building name" value={form.house} onChange={handleChange} className="w-full border-b py-2 mb-4 focus:outline-none" />
//           <input name="road" type="text" placeholder="Road name / Area / Colony" value={form.road} onChange={handleChange} className="w-full border-b py-2 mb-4 focus:outline-none" />
//           <input name="pincode" type="text" placeholder="Pincode" value={form.pincode} onChange={handleChange} className="w-full border-b py-2 mb-4 focus:outline-none" />

//           <div className="flex gap-4 mb-4">
//             <input name="city" type="text" placeholder="City" value={form.city} onChange={handleChange} className="flex-1 border-b py-2 focus:outline-none" />
//             <input name="state" type="text" placeholder="State" value={form.state} onChange={handleChange} className="flex-1 border-b py-2 focus:outline-none" />
//           </div>

//           <input name="landmark" type="text" placeholder="Nearby Famous Place/Shop/School, etc. (optional)" value={form.landmark} onChange={handleChange} className="w-full border-b py-2 mb-6 focus:outline-none" />
//         </div>

//         <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t">
//           <button
//             onClick={() => {
//               handleSubmit();
//               toast.success("Your Details successfully Submitted");
//             }}
//             className="w-full bg-pink-600 text-white py-3 rounded hover:bg-pink-700 transition"
//           >
//             Save Address and Continue
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShippingAddressSidebar;

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoClose, IoLocationSharp, IoCallOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { createRazorpayOrder, verifyAndSaveOrder } from "../../api.js";

const ShippingAddressSidebar = ({ product, onClose }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    house: "",
    road: "",
    pincode: "",
    city: "",
    state: "",
    landmark: "", // ✅ Fix: initialize to avoid uncontrolled warning
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    const requiredFields = [
      "name",
      "phone",
      "house",
      "road",
      "pincode",
      "city",
      "state",
    ];
    const emptyField = requiredFields.find((field) => !form[field]?.trim());

    if (emptyField) {
      toast.error(`Please fill out your ${emptyField}`);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first.");
        return;
      }

      const { data } = await createRazorpayOrder({
        amount: product.price,
        receipt: `receipt_${Date.now()}`,
        userId: localStorage.getItem("userId"),
        name: localStorage.getItem("userName"),
        email: localStorage.getItem("userEmail"),
      });

      const { order } = data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Bazaarsell",
        description: "Order Payment",
        order_id: order.id,
        handler: async function (response) {
          try {
            const itemPayload = {
              productId: product._id,
              title: product.title,
              image: product.image,
              quantity: product.quantity || 1,
              price: product.price,
              size: Array.isArray(product.size)
                ? product.size
                : [product.size || "Free Size"],
            };

            const cartItems = [itemPayload];
            const total = product.price;

            const shippingAddress = {
              name: form.name,
              phone: form.phone,
              house: form.house,
              road: form.road,
              pincode: form.pincode,
              city: form.city,
              state: form.state,
              landmark: form.landmark,
            };

            const userId = localStorage.getItem("userId"); // Optional if backend uses middleware

            await verifyAndSaveOrder({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              items: cartItems,
              totalAmount: total,
              shippingAddress,
              userId,
            });
            console.log("Cart Items sending to backend: ", cartItems);

            toast.success("Payment Successful! Order Placed.");
            navigate("/orders");
            onClose();
          } catch (error) {
            toast.error("Payment verification failed.");
            console.error("Verification error:", error?.response || error);
          }
        },

        prefill: {
          name: form.name,
          phone: form.phone,
          email: "", // Optional
        },
        theme: {
          color: "#f97316",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-white/30 backdrop-blur-md p-6 rounded-xl shadow-md bg-opacity-20">
      <div className="w-full max-w-md bg-white h-full shadow-lg p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">ADD DELIVERY ADDRESS</h2>
          <button onClick={onClose}>
            <IoClose className="text-2xl" />
          </button>
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-700 flex items-center gap-1">
              <IoCallOutline className="text-pink-600" /> phone Details
            </h3>
            <button className="text-pink-600 border border-pink-600 text-sm px-3 py-1 rounded-full hover:bg-pink-50">
              📍 Use My Location
            </button>
          </div>

          <input
            name="name"
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border-b py-2 mb-4 focus:outline-none"
          />
          <input
            name="phone"
            type="tel"
            placeholder="phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full border-b py-2 mb-6 focus:outline-none"
          />
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 flex items-center gap-1 mb-3">
            <FaMapMarkerAlt className="text-pink-600" /> Address
          </h3>

          <input
            name="house"
            type="text"
            placeholder="House no./ Building name"
            value={form.house}
            onChange={handleChange}
            className="w-full border-b py-2 mb-4 focus:outline-none"
          />
          <input
            name="road"
            type="text"
            placeholder="Road name / Area / Colony"
            value={form.road}
            onChange={handleChange}
            className="w-full border-b py-2 mb-4 focus:outline-none"
          />
          <input
            name="pincode"
            type="text"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
            className="w-full border-b py-2 mb-4 focus:outline-none"
          />

          <div className="flex gap-4 mb-4">
            <input
              name="city"
              type="text"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              className="flex-1 border-b py-2 focus:outline-none"
            />
            <input
              name="state"
              type="text"
              placeholder="State"
              value={form.state}
              onChange={handleChange}
              className="flex-1 border-b py-2 focus:outline-none"
            />
          </div>

          <input
            name="landmark"
            type="text"
            placeholder="Nearby Famous Place/Shop/School, etc. (optional)"
            value={form.landmark}
            onChange={handleChange}
            className="w-full border-b py-2 mb-6 focus:outline-none"
          />
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t">
          <button
            onClick={() => {
              handleSubmit();
              toast.success("Your Details successfully Submitted");
            }}
            className="w-full bg-pink-600 text-white py-3 rounded hover:bg-pink-700 transition"
          >
            Save Address and Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShippingAddressSidebar;
