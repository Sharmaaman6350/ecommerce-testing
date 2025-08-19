// import React, { useEffect, useState } from "react";
// import { useUser } from "../../context/UserContext";
// import { getMyOrders } from "../../api"; // adjust path if needed

// const MyOrders = () => {
//   const { user, userLoading } = useUser();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       if (!user) return;

//       try {
//         const res = await getMyOrders(); // ✅ use centralized API
//         setOrders(res.data.orders);
//         console.log("✅ Orders fetched:", res.data.orders);
//       } catch (error) {
//         console.error("❌ Error fetching orders:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [user]);

//   if (userLoading || loading) {
//     return (
//       <div className="text-center py-16 text-gray-600 text-lg">
//         Loading orders...
//       </div>
//     );
//   }

//   if (!user?._id) {
//     return (
//       <div className="text-center py-16 text-red-500 font-medium text-lg">
//         ⚠️ Please log in to view your orders.
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 md:p-8">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">My Orders</h2>
//       {orders.length === 0 ? (
//         <p className="text-gray-600">You haven't placed any orders yet.</p>
//       ) : (
//         <div className="space-y-6">
//           {orders.map((order) => (
//             <div key={order._id} className="border p-4 rounded-lg shadow-sm">
//               <p className="text-sm text-gray-500 mb-2">
//                 Order ID: <span className="font-medium">{order._id}</span>
//               </p>
//               <p className="text-sm text-gray-500 mb-2">
//                 Payment ID:{" "}
//                 <span className="font-medium">
//                   {order.razorpayPaymentId ||
//                     order.paymentInfo?.razorpay_payment_id ||
//                     "N/A"}
//                 </span>
//               </p>

//               <p className="text-sm text-gray-500 mb-4">
//                 Total Amount: ₹{order.totalAmount}
//               </p>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {order.items.map((item, index) => (
//                   <div
//                     key={index}
//                     className="flex gap-4 items-center border p-3 rounded"
//                   >
//                     <img
//                       src={item.productId?.image || item.image}
//                       alt={item.productId?.title || item.title}
//                       className="w-16 h-16 object-cover rounded"
//                     />
//                     <div>
//                       <h3 className="font-medium text-gray-800">
//                         {item.productId?.title || item.title}
//                       </h3>
//                       <p className="text-sm text-gray-500">
//                         Price: ₹{item.productId?.price || item.price}
//                       </p>
//                       <p className="text-sm text-gray-500">
//                         Quantity: {item.quantity}
//                       </p>
//                       {item.size && (
//                         <p className="text-sm text-gray-500">
//                           Size:{" "}
//                           {Array.isArray(item.size)
//                             ? item.size.join(", ")
//                             : item.size}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyOrders;

// import { useEffect, useState } from "react";
// import { useUser } from "../../context/UserContext";
// import { getMyOrders } from "../../api";

// const STATUS_STEPS = [
//   "Placed",
//   "Confirmed ",
//   "Shipped",
//   "Delivered",
//   "Cancelled",
//   "Returned",
// ];

// const MyOrders = () => {
//   const { user, userLoading } = useUser();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       if (!user) return;
//       try {
//         const res = await getMyOrders();
//         setOrders(res.data.orders);
//         console.log("✅ Orders fetched:", res.data.orders);
//       } catch (error) {
//         console.error("❌ Error fetching orders:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, [user]);

//   if (userLoading || loading) {
//     return (
//       <div className="text-center py-16 text-gray-600 text-lg">
//         Loading orders...
//       </div>
//     );
//   }

//   if (!user?._id) {
//     return (
//       <div className="text-center py-16 text-red-500 font-medium text-lg">
//         ⚠️ Please log in to view your orders.
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 md:p-8 space-y-10 bg-gray-50 min-h-screen">
//       <h2 className="text-3xl font-extrabold mb-6 text-gray-900">My Orders</h2>

//       {orders.length === 0 ? (
//         <p className="text-gray-600 text-lg">
//           You haven't placed any orders yet.
//         </p>
//       ) : (
//         <div className="space-y-8">
//           {orders.map((order) => {
//             const currentStep = STATUS_STEPS.indexOf(order.status);

//             return (
//               <div
//                 key={order._id}
//                 className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow"
//               >
//                 {/* Header */}
//                 <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
//                   <div>
//                     <p className="text-sm text-gray-500 mb-1">
//                       Order ID: <span className="font-medium">{order._id}</span>
//                     </p>
//                     <p className="text-sm text-gray-500 mb-1">
//                       Payment ID:{" "}
//                       <span className="font-medium">
//                         {order.razorpayPaymentId ||
//                           order.paymentInfo?.razorpay_payment_id ||
//                           "N/A"}
//                       </span>
//                     </p>
//                     <p className="text-lg font-semibold text-gray-800">
//                       Total Amount: ₹{order.totalAmount}
//                     </p>
//                   </div>
//                   <span
//                     className={`px-3 py-1 rounded-full font-medium text-sm ${
//                       order.status === "Delivered"
//                         ? "bg-green-100 text-green-800"
//                         : order.status === "Shipped"
//                         ? "bg-yellow-100 text-yellow-800"
//                         : order.status === "Confirmed"
//                         ? "bg-blue-100 text-blue-800"
//                         : "bg-gray-100 text-gray-800"
//                     }`}
//                   >
//                     {order.status}
//                   </span>
//                 </div>

//                 {/* Order Items */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                   {order.items.map((item, idx) => (
//                     <div
//                       key={idx}
//                       className="flex gap-4 items-center border p-3 rounded hover:bg-gray-50 transition"
//                     >
//                       <img
//                         src={item.productId?.image || item.image}
//                         alt={item.productId?.title || item.title}
//                         className="w-16 h-16 object-cover rounded"
//                       />
//                       <div>
//                         <h3 className="font-medium text-gray-800">
//                           {item.productId?.title || item.title}
//                         </h3>
//                         <p className="text-sm text-gray-500">
//                           Price: ₹{item.productId?.price || item.price}
//                         </p>
//                         <p className="text-sm text-gray-500">
//                           Quantity: {item.quantity}
//                         </p>
//                         {item.size && (
//                           <p className="text-sm text-gray-500">
//                             Size:{" "}
//                             {Array.isArray(item.size)
//                               ? item.size.join(", ")
//                               : item.size}
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Meesho-style Order Tracker */}
//                 <div className="flex items-center justify-between relative mt-6">
//                   {STATUS_STEPS.map((step, index) => (
//                     <div
//                       key={index}
//                       className="flex-1 flex flex-col items-center relative"
//                     >
//                       {/* Circle */}
//                       <div
//                         className={`w-6 h-6 rounded-full flex items-center justify-center text-white z-10 ${
//                           index <= currentStep ? "bg-blue-500" : "bg-gray-300"
//                         }`}
//                       >
//                         {index <= currentStep ? "✓" : index + 1}
//                       </div>
//                       {/* Line */}
//                       {index < STATUS_STEPS.length - 1 && (
//                         <div
//                           className={`absolute top-2.5 left-1/2 w-full h-1 -translate-x-1/2 z-0 ${
//                             index < currentStep ? "bg-blue-500" : "bg-gray-300"
//                           }`}
//                         ></div>
//                       )}
//                       <span className="text-xs mt-2 text-gray-600">{step}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyOrders;



// import { useEffect, useState } from "react";
// import { useUser } from "../../context/UserContext";
// import { getMyOrders } from "../../api";

// const STATUS_STEPS = ["Placed", "Confirmed", "Shipped", "Delivered"];

// const MyOrders = () => {
//   const { user, userLoading } = useUser();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       if (!user) return;
//       try {
//         const res = await getMyOrders();
//         setOrders(res.data.orders);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, [user]);

//   if (userLoading || loading)
//     return (
//       <div className="text-center py-16 text-gray-600 text-lg">
//         Loading orders...
//       </div>
//     );

//   if (!user?._id)
//     return (
//       <div className="text-center py-16 text-red-500 font-medium text-lg">
//         ⚠️ Please log in to view your orders.
//       </div>
//     );

//   return (
//     <div className="p-4 md:p-8 space-y-10 bg-gray-50 min-h-screen">
//       <h2 className="text-3xl font-extrabold mb-6 text-gray-900">My Orders</h2>

//       {orders.length === 0 ? (
//         <p className="text-gray-600 text-lg">
//           You haven't placed any orders yet.
//         </p>
//       ) : (
//         <div className="space-y-8">
//           {orders.map((order) => {
//             const currentStep = STATUS_STEPS.indexOf(order.status);

//             return (
//               <div
//                 key={order._id}
//                 className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow"
//               >
//                 {/* Header */}
//                 <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
//                   <div>
//                     <p className="text-sm text-gray-500 mb-1">
//                       Order ID: <span className="font-medium">{order._id}</span>
//                     </p>
//                     <p className="text-lg font-semibold text-gray-800">
//                       Total: ₹{order.totalAmount}
//                     </p>
//                   </div>
//                   <span
//                     className={`px-3 py-1 rounded-full font-medium text-sm ${
//                       order.status === "Delivered"
//                         ? "bg-green-100 text-green-800"
//                         : order.status === "Shipped"
//                         ? "bg-yellow-100 text-yellow-800"
//                         : order.status === "Cancelled" || order.status === "Returned"
//                         ? "bg-red-100 text-red-800"
//                         : "bg-blue-100 text-blue-800"
//                     }`}
//                   >
//                     {order.status}
//                   </span>
//                 </div>

//                 {/* Order Items */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                   {order.items.map((item, idx) => (
//                     <div
//                       key={idx}
//                       className="flex gap-4 items-center border p-3 rounded hover:bg-gray-50 transition"
//                     >
//                       <img
//                         src={item.productId?.image || item.image}
//                         alt={item.productId?.title || item.title}
//                         className="w-16 h-16 object-cover rounded"
//                       />
//                       <div>
//                         <h3 className="font-medium text-gray-800">
//                           {item.productId?.title || item.title}
//                         </h3>
//                         <p className="text-sm text-gray-500">
//                           Price: ₹{item.productId?.price || item.price}
//                         </p>
//                         <p className="text-sm text-gray-500">
//                           Qty: {item.quantity}
//                         </p>
//                         {item.size && (
//                           <p className="text-sm text-gray-500">
//                             Size: {Array.isArray(item.size) ? item.size.join(", ") : item.size}
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Meesho-style Tracker */}
//                 <div className="flex items-center justify-between relative mt-6">
//                   {STATUS_STEPS.map((step, index) => (
//                     <div key={index} className="flex-1 flex flex-col items-center relative">
//                       {/* Circle */}
//                       <div
//                         className={`w-8 h-8 rounded-full flex items-center justify-center text-white z-10 text-sm font-semibold transition ${
//                           index < currentStep
//                             ? "bg-blue-500"
//                             : index === currentStep
//                             ? "bg-blue-500 scale-110 shadow-lg"
//                             : "bg-gray-300"
//                         }`}
//                       >
//                         {index < currentStep ? "✓" : index + 1}
//                       </div>

//                       {/* Line */}
//                       {index < STATUS_STEPS.length - 1 && (
//                         <div
//                           className={`absolute top-3.5 left-1/2 w-full h-1 -translate-x-1/2 z-0 ${
//                             index < currentStep ? "bg-blue-500" : "bg-gray-300"
//                           }`}
//                         ></div>
//                       )}

//                       <span
//                         className={`text-xs mt-2 font-medium ${
//                           index <= currentStep ? "text-gray-900" : "text-gray-400"
//                         }`}
//                       >
//                         {step}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyOrders;


import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { getMyOrders } from "../../api";

const STATUS_STEPS = ["Placed", "Confirmed", "Shipped", "Delivered"];

const STEP_COLORS = {
  Placed: "bg-blue-500",
  Confirmed: "bg-green-500",
  Shipped: "bg-yellow-500",
  Delivered: "bg-green-900",
};

const MyOrders = () => {
  const { user, userLoading } = useUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        const res = await getMyOrders();
        setOrders(res.data.orders);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (userLoading || loading)
    return (
      <div className="text-center py-16 text-gray-600 text-lg">
        Loading orders...
      </div>
    );

  if (!user?._id)
    return (
      <div className="text-center py-16 text-red-500 font-medium text-lg">
        ⚠️ Please log in to view your orders.
      </div>
    );

  return (
    <div className="p-4 md:p-8 space-y-12 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-extrabold mb-8 text-gray-900 tracking-wide">
        My Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-gray-600 text-lg italic">
          You haven't placed any orders yet.
        </p>
      ) : (
        <div className="space-y-10">
          {orders.map((order) => {
            const isCancelledOrReturned =
              order.status === "Cancelled" || order.status === "Returned";
            const currentStep = isCancelledOrReturned
              ? -1
              : STATUS_STEPS.indexOf(order.status);

            return (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-xl p-6 transition-transform hover:-translate-y-1 hover:shadow-2xl duration-300"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Order ID: <span className="font-medium">{order._id}</span>
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                      Total: ₹{order.totalAmount}
                    </p>
                  </div>
                  <span
                    className={`px-4 py-1 rounded-full font-semibold text-sm shadow-md ${
                      order.status === "Delivered"
                        ? "bg-gradient-to-r from-green-400 to-green-700 text-white"
                        : order.status === "Shipped"
                        ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900"
                        : order.status === "Cancelled" || order.status === "Returned"
                        ? "bg-gradient-to-r from-red-400 to-red-600 text-white"
                        : order.status === "Confirmed"
                        ? "bg-gradient-to-r from-indigo-400 to-indigo-600 text-white"
                        : "bg-gradient-to-r from-blue-400 to-blue-600 text-white"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Order Items */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 items-center border border-gray-200 rounded-lg p-3 hover:shadow-md hover:scale-105 transition-transform duration-200"
                    >
                      <img
                        src={item.productId?.image || item.image}
                        alt={item.productId?.title || item.title}
                        className="w-20 h-20 object-cover rounded-lg shadow-sm"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900 text-lg">
                          {item.productId?.title || item.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Price: ₹{item.productId?.price || item.price}
                        </p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                        {item.size && (
                          <p className="text-sm text-gray-500">
                            Size:{" "}
                            {Array.isArray(item.size) ? item.size.join(", ") : item.size}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tracker */}
                <div className="relative flex items-center justify-between mt-6">
                  {isCancelledOrReturned ? (
                    <div className="flex-1 flex flex-col items-center relative">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white z-10 text-sm font-bold shadow-lg bg-red-500">
                        !
                      </div>
                      <span className="text-xs mt-2 font-medium text-red-600">
                        {order.status}
                      </span>
                    </div>
                  ) : (
                    STATUS_STEPS.map((step, index) => (
                      <div
                        key={index}
                        className="flex-1 flex flex-col items-center relative"
                      >
                        {/* Line */}
                        {index < STATUS_STEPS.length - 1 && (
                          <div
                            className={`absolute top-4 left-1/2 w-full h-1 -translate-x-1/2 z-0 rounded ${
                              index < currentStep ? STEP_COLORS[step] : "bg-gray-300"
                            }`}
                          ></div>
                        )}
                        {/* Circle */}
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-white z-10 text-sm font-bold transition-all duration-300 shadow-lg ${
                            index < currentStep
                              ? STEP_COLORS[step]
                              : index === currentStep
                              ? STEP_COLORS[step] + " scale-125 shadow-2xl"
                              : "bg-gray-300"
                          }`}
                        >
                          {index < currentStep ? "✓" : index + 1}
                        </div>
                        {/* Step Label */}
                        <span
                          className={`text-xs mt-2 font-medium text-center ${
                            index <= currentStep ? "text-gray-900" : "text-gray-400"
                          }`}
                        >
                          {step}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrders;

