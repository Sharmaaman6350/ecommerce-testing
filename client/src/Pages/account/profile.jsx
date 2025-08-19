import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaEdit,
  FaSignOutAlt,
  FaHeart,
  FaCog,
  FaBox,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useWishlist } from "../../context/WishlistContext"; // ✅ Import

import ProductCard from "../../Components/ProductCard"; // ✅ Show products

const UserProfile = () => {
  const navigate = useNavigate();
  const { wishlistItems } = useWishlist(); // ✅ Get wishlist from context

  const [user, setUser] = useState({
    name: "Ranu Mali",
    email: "ranu@gmail.com",
    phone: "6375763522",
    address: "123, Patna, Bihar, India",
    avatar: "https://i.pravatar.cc/150?img=32",
  });

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(user);
  const [activeTab, setActiveTab] = useState("account");

  useEffect(() => {
    setForm(user);
  }, [editMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = () => {
    setUser(form);
    setEditMode(false);
    toast.success("Changes saved successfully!");
  };

  const handleLogout = () => {
  // localStorage.removeItem("token");
  // localStorage.removeItem("user");
  // localStorage.removeItem("userId");
  //  localStorage.removeItem("userId");
  //   localStorage.removeItem("userId");
  localStorage.clear();

  toast.success("Logged out successfully!");
  navigate("/auth");
};

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return (
          <>
            <div className="flex items-center gap-4 mb-6">
              <img
                src={user.avatar}
                alt="Avatar"
                className="w-20 h-20 rounded-full object-cover border"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {user.name}
                </h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <button
                onClick={() => setEditMode(!editMode)}
                className="ml-auto px-3 py-1 text-sm bg-red-800 hover:bg-red-950 text-white rounded flex items-center gap-1"
              >
                <FaEdit /> {editMode ? "Cancel" : "Edit"}
              </button>
            </div>

            <div className="space-y-4 text-start">
              <Field
                label="Phone"
                value={form.phone}
                name="phone"
                onChange={handleChange}
                editable={editMode}
              />
              <Field
                label="Address"
                value={form.address}
                name="address"
                onChange={handleChange}
                editable={editMode}
                textarea
              />
              {editMode && (
                <button
                  onClick={handleSave}
                  className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                >
                  Save Changes
                </button>
              )}
            </div>
          </>
        );

      case "wishlist":
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">My Wishlist</h2>
            {wishlistItems.length === 0 ? (
              <p className="text-gray-600">No items in your wishlist.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {wishlistItems.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        );

      case "settings":
        return <p className="text-gray-600">Settings coming soon...</p>;

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto mt-6 p-4 bg-white shadow rounded-xl m-12">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 border-r mb-4 md:mb-0">
        <ul className="space-y-2 text-sm font-medium text-gray-700">
          <SidebarItem
            label="My Account"
            icon={<FaUserCircle />}
            active={activeTab === "account"}
            onClick={() => setActiveTab("account")}
          />

          <SidebarItem
            label="Wishlist"
            icon={<FaHeart />}
            active={activeTab === "wishlist"}
            onClick={() => setActiveTab("wishlist")}
          />
          <SidebarItem
            label="Settings"
            icon={<FaCog />}
            active={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
          />
          <li>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 text-red-900 hover:bg-red-50 rounded"
            >
              <FaSignOutAlt /> Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-full md:w-3/4 px-4">{renderContent()}</div>
    </div>
  );
};

// Reusable form/display field component
const Field = ({ label, value, name, onChange, editable, textarea }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    {editable ? (
      textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          className="mt-1 w-full px-3 py-2 border rounded-md"
        />
      ) : (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="mt-1 w-full px-3 py-2 border rounded-md"
        />
      )
    ) : (
      <p className="mt-1 text-gray-800">{value}</p>
    )}
  </div>
);

// Sidebar item component
const SidebarItem = ({ label, icon, active, onClick }) => (
  <li>
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-3 py-2 rounded ${
        active
          ? "bg-indigo-100 text-indigo-700 font-semibold"
          : "hover:bg-gray-100"
      }`}
    >
      {icon} {label}
    </button>
  </li>
);

export default UserProfile;
