import React from "react";
import { useCart } from "../../Context/CartContext"; // adjust if needed
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  const parsePrice = (price) => {
    const number = parseInt(price.replace(/[^\d]/g, ""));
    return isNaN(number) ? 0 : number;
  };

  const total = cartItems.reduce(
    (sum, item) => sum + parsePrice(item.price),
    0
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {cartItems.length === 0 ? (
        // 🛒 Empty Cart UI
        <div className="flex flex-col items-center justify-center text-center">
          <img
            src="https://media.istockphoto.com/id/1987775073/vector/shopping-cart-black-line-drawing-icon.webp?a=1&b=1&s=612x612&w=0&k=20&c=xLcMX1XSGReYazS7g1NETJ6W2xBRXxV_v-vywNZ5YkA="
            alt="Empty Cart"
            className="w-64 h-64 object-contain mb-6"
          />
          <h2 className="text-4xl text-black font-extrabold">Your Cart is Empty</h2>
          <p className="mt-2 text-gray-600">
            Just relax, let us help you find some first-class products
          </p>
          <Link to="/">
            <button className="mt-4 bg-red-950 text-white px-5 py-3 rounded font-bold hover:shadow-lg hover:shadow-orange-700">
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        // 🧺 Cart Items UI
        <>
          <h1 className="text-3xl font-bold text-pink-700 mb-6 text-center">
            Your Cart
          </h1>

          <div className="grid gap-4 mb-6">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border p-4 rounded-lg shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-lg border"
                />
                <div className="flex-1">
                  <p className="font-semibold text-lg">{item.title}</p>
                  <p className="text-pink-600 font-bold mt-1">{item.price}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 font-semibold border border-red-300 px-3 py-1 rounded-lg text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Total Section */}
          <div className="text-right border-t pt-4">
            <p className="text-xl font-semibold">
              Total: <span className="text-pink-600">₹{total}</span>
            </p>
            <button className="mt-4 px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
