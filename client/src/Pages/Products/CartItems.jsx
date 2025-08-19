import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import ShippingAddressSidebar from "./Checkout";
import { toast } from "react-toastify";

const CartItems = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ✅ Safe price parser
  const parsePrice = (priceStr) => {
    if (typeof priceStr === "number") return priceStr;
    if (typeof priceStr !== "string") return 0;
    const num = Number(priceStr.replace(/[^\d]/g, ""));
    return isNaN(num) ? 0 : num;
  };

  const total = cartItems.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.quantity,
    0
  );

  useEffect(() => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
    }
  }, [cartItems.length]);

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-24">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Your cart is empty!
        </h2>
        <Link
          to="/"
          className="inline-block bg-red-800 text-white px-6 py-2 rounded hover:bg-red-600 transition"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-center text-pink-600">
          Shopping Cart
        </h1>

        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row gap-4 border border-gray-200 p-4 rounded-xl shadow-sm bg-white"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-28 h-28 object-cover rounded-md border"
              />

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h2>
                  <p className="text-pink-600 font-bold mt-1">₹{parsePrice(item.price)}</p>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <span className="text-sm text-gray-600">Qty:</span>

                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    disabled={item.quantity === 1}
                    className="w-8 h-8 text-lg bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
                  >
                    −
                  </button>

                  <span className="font-medium">{item.quantity}</span>

                  <button
                    onClick={() => increaseQuantity(item.id)}
                    disabled={item.quantity >= item.stock}
                    className="w-8 h-8 text-lg bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
                  >
                    +
                  </button>

                  <span className="text-xs text-gray-400 ml-2">
                    (Stock: {item.stock})
                  </span>
                </div>

                <p className="mt-2 text-sm text-red-500 font-medium">
                  Subtotal: ₹{parsePrice(item.price) * item.quantity}
                </p>
              </div>

              <button
                onClick={() => {
                  removeFromCart(item.id);
                  toast.warn(`Product removed from cart`);
                }}
                className="text-red-500 hover:text-red-600 font-semibold text-sm border border-red-200 px-3 py-1 rounded-md self-start md:self-center"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <hr className="my-8 border-t" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xl font-semibold">
            Total: <span className="text-pink-600">₹{total}</span>
          </div>

          <button
            onClick={() => setIsSidebarOpen(true)}
            className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

     {isSidebarOpen && (
  <ShippingAddressSidebar
    onClose={() => setIsSidebarOpen(false)}
    product={{ title: "Cart Items", price: total }}
  />
)}

    </>
  );
};

export default CartItems;
