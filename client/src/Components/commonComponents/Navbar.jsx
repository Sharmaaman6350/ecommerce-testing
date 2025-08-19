// import React, { useState } from "react";
// import { FaSearch } from "react-icons/fa";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";
// import { useCart } from "../../Context/CartContext";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const { cartItems } = useCart();

//   const user = localStorage.getItem("user")
//     ? JSON.parse(localStorage.getItem("user"))
//     : null;

//   const username = user?.name;

//   return (
//     <nav className="bg-white shadow-md w-full">
//       <div className="max-w-[1440px] mx-auto px-6 py-3 flex justify-between items-center">
//         {/* Logo */}
//         <Link to="/" className="text-3xl font-bold text-red-950">
//           Bazaarflick
//         </Link>

//         {/* Desktop Search Bar */}
//         <div className="relative flex-1 mx-4 hidden md:block max-w-md">
//           <input
//             type="text"
//             placeholder="Search for products"
//             className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-700"
//           />
//           <button
//             type="submit"
//             className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//           >
//             <FaSearch />
//           </button>
//         </div>

//           <div className="text-amber-950">Welcome  <span className="text-xl font-bold text-black">{username}</span> </div>
//         {/* Desktop Icons */}
//         <div className="hidden md:flex space-x-6 items-center relative">
//           {/* Profile Icon */}
//           <Link to={user ? "/profile" : "/auth"}>
//             <FontAwesomeIcon
//               icon={faUser}
//               className="cursor-pointer text-gray-700 text-xl"
//               title={user ? "Profile" : "Login"}
//             />
//           </Link>

//           {/* Cart Icon */}
//           <Link to="/cart" className="relative">
//             <FontAwesomeIcon
//               icon={faCartShopping}
//               className="text-gray-700 text-xl"
//             />
//             {cartItems.length > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//                 {cartItems.length}
//               </span>
//             )}
//           </Link>
//         </div>

//         {/* Mobile Hamburger */}
//         <div className="md:hidden">
//           <button onClick={() => setMenuOpen(!menuOpen)}>
//             <svg
//               className="w-6 h-6 text-gray-700"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Mobile Dropdown Menu */}
//       {menuOpen && (
//         <div className="md:hidden px-6 pb-4 space-y-3">
//           {/* Mobile Search */}
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search for products"
//               className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-700"
//             />
//             <button
//               type="submit"
//               className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//             >
//               <FaSearch />
//             </button>
//           </div>

//           {/* Mobile Links */}
//           <div className="flex space-x-6 items-center">
//             {/* Profile / Login Link */}
//             <Link
//               to={user ? "/profile" : "/auth"}
//               className="text-gray-700 text-sm hover:underline"
//             >
//               {user ? (
//                 user.name || user.email
//               ) : (
//                 <FontAwesomeIcon icon={faUser} />
//               )}
//             </Link>

//             {/* Cart Icon */}
//             <Link to="/cart" className="relative">
//               <FontAwesomeIcon
//                 icon={faCartShopping}
//                 className="text-gray-700 text-xl"
//               />
//               {cartItems.length > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//                   {cartItems.length}
//                 </span>
//               )}
//             </Link>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const username = user?.name;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchInput.trim())}`);
      setSearchInput("");
      setMenuOpen(false);
    }
  };

  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-[1440px] mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-red-950">
          Bazaarsell
        </Link>

        {/* Desktop Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="relative flex-1 mx-4 hidden md:block max-w-md"
        >
          <input
            type="text"
            placeholder="Search for products"
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-700"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            type="submit"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            <FaSearch />
          </button>
        </form>

        <div className="text-amber-950">
          Welcome <span className="text-xl font-bold text-black">{username}</span>
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex space-x-6 items-center relative">
          <Link to={user ? "/profile" : "/auth"}>
            <FontAwesomeIcon
              icon={faUser}
              className="cursor-pointer text-gray-700 text-xl"
              title={user ? "Profile" : "Login"}
            />
          </Link>

          <Link to="/cart" className="relative">
            <FontAwesomeIcon icon={faCartShopping} className="text-gray-700 text-xl" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search for products"
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-700"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              type="submit"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              <FaSearch />
            </button>
          </form>

          <div className="flex space-x-6 items-center">
            <Link to={user ? "/profile" : "/auth"} className="text-gray-700 text-sm hover:underline">
              {user ? (user.name || user.email) : <FontAwesomeIcon icon={faUser} />}
            </Link>

            <Link to="/cart" className="relative">
              <FontAwesomeIcon icon={faCartShopping} className="text-gray-700 text-xl" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
