// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useLocation,
// } from "react-router-dom";

// // 🧩 Common Layout Components
// import Navbar from "../Components/commonComponents/Navbar";
// import Footer from "../Components/commonComponents/Footer";
// import CategoryBar from "../Components/commonComponents/CategoryBar";

// // 🧑‍💻 User Pages
// import Home from "../Pages/user/Home";
// import PageNotFound from "../Pages/user/PageNotFound";
// import CartItems from "../Pages/Products/CartItems";
// import Auth from "../Pages/auth/Auth";
// import UserProfile from "../Pages/account/profile";
// import ProductDetails from "../Pages/products/ProductDetails";
// import ProductList from "../Pages/Products/ProductList";
// import Wishlist from "../Pages/user/wishlist";
// import SearchResults from "../Components/commonComponents/searchResults";

// // ⚙️ Admin Pages
// import AdminLayout from "../Layout/AdminLayout"; // ✅ this wraps all admin pages
// import AdminDashboard from "../Pages/admin/Dashboard";
// import AdminProducts from "../Pages/admin/Products";
// import AdminOrders from "../Pages/admin/Orders";
// import AdminUsers from "../Pages/admin/Users";
// import AdminSettings from "../Pages/admin/Settings";
// import AdminPayment from "../Pages/admin/Payment";
// import AdminRatings from "../Pages/admin/Rating";
// import AddProductPage from "../Pages/admin/AddProducts";
// import AdminLogin from "../Pages/admin/Login";
// import ProtectedAdminRoute from "../routes/ProtectedRoutes";

// // ✅ Layout wrapper to hide header/footer/category for admin
// function LayoutWrapper({ children }) {
//   const location = useLocation();
//   const isAdminRoute = location.pathname.startsWith("/admin");

//   return (
//     <>
//       {!isAdminRoute && <Navbar />}
//       {!isAdminRoute && <CategoryBar />}
//       {children}
//       {!isAdminRoute && <Footer />}
//     </>
//   );
// }

// function Routers() {
//   return (
//     <Router>
//       <LayoutWrapper>
//         <Routes>
//           {/* ✅ User Routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/productdetails/:id" element={<ProductDetails />} />
//           <Route path="/cart" element={<CartItems />} />
//           <Route path="/auth" element={<Auth />} />
//           <Route path="/wishlist" element={<Wishlist />} />
//           <Route path="/profile" element={<UserProfile />} />
//           <Route path="/products/:category" element={<ProductList />} />
//           <Route path="/products/:category/:type" element={<ProductList />} />
//           <Route path="/search" element={<SearchResults />} />

//           {/* ✅ Admin Routes wrapped in AdminLayout */}
//           <Route path="/admin" element={<AdminLayout />}>

//             <Route path="" element={<AdminLogin/>} />
//             <Route path="dashboard" element={<AdminDashboard />} />
//             <Route path="products" element={<AdminProducts />} />
//             <Route path="/admin/products/add" element={<AddProductPage />} />
//             <Route path="orders" element={<AdminOrders />} />
//             <Route path="users" element={<AdminUsers />} />
//             <Route path="payment" element={<AdminPayment />} />
//             <Route path="rating" element={<AdminRatings />} />
//             <Route path="settings" element={<AdminSettings />} />
//           </Route>

//           {/* ❌ 404 */}
//           <Route path="*" element={<PageNotFound />} />
//         </Routes>
//       </LayoutWrapper>
//     </Router>
//   );
// }

// export default Routers;

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// 🧩 Common Layout Components
import Navbar from "../Components/commonComponents/Navbar";
import Footer from "../Components/commonComponents/Footer";
import CategoryBar from "../Components/commonComponents/CategoryBar";

// 🧑‍💻 User Pages
import Home from "../Pages/user/Home";
import PageNotFound from "../Pages/user/PageNotFound";
import CartItems from "../Pages/Products/CartItems";
import Auth from "../Pages/auth/Auth";
import UserProfile from "../Pages/account/profile";
import ProductDetails from "../Pages/products/ProductDetails";
import ProductList from "../Pages/Products/ProductList";
import Wishlist from "../Pages/user/wishlist";
import SearchResults from "../Components/commonComponents/searchResults";

// ⚙️ Admin Pages
import AdminLayout from "../Layout/AdminLayout";
import AdminDashboard from "../Pages/admin/Dashboard";
import AdminProducts from "../Pages/admin/Products";
import AdminOrders from "../Pages/admin/Orders";
import AdminUsers from "../Pages/admin/Users";
import AdminSettings from "../Pages/admin/Settings";
import AdminPayment from "../Pages/admin/Payment";
import AdminRatings from "../Pages/admin/Rating";
import AddProductPage from "../Pages/admin/AddProducts";
import AdminLogin from "../Pages/admin/Login";
import ProtectedAdminRoute from "../routes/ProtectedRoutes";
import MyOrders from "../Pages/user/orders";

function LayoutWrapper({ children }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && (
        <div className="fixed top-0 left-0 w-full z-50">
          <Navbar />
          <CategoryBar />
        </div>
      )}

      {/* Add top padding equal to Navbar + CategoryBar height so content doesn't go under them */}
      <div className={!isAdminRoute ? "pt-[112px]" : ""}>{children}</div>

      {!isAdminRoute && <Footer />}
    </>
  );
}

function Routers() {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          {/* ✅ Public User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/productdetails/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartItems />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/products/:category" element={<ProductList />} />
          <Route path="/products/:category/:type" element={<ProductList />} />
          <Route path="/search" element={<SearchResults />} />

          {/* ✅ Admin Login (Public) */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminLogin />} />
          </Route>

          {/* 🔐 Protected Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route
              path="dashboard"
              element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="products"
              element={
                <ProtectedAdminRoute>
                  <AdminProducts />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="products/add"
              element={
                <ProtectedAdminRoute>
                  <AddProductPage />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="orders"
              element={
                <ProtectedAdminRoute>
                  <AdminOrders />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="users"
              element={
                <ProtectedAdminRoute>
                  <AdminUsers />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="payment"
              element={
                <ProtectedAdminRoute>
                  <AdminPayment />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="rating"
              element={
                <ProtectedAdminRoute>
                  <AdminRatings />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="settings"
              element={
                <ProtectedAdminRoute>
                  <AdminSettings />
                </ProtectedAdminRoute>
              }
            />
          </Route>

          {/* ❌ 404 Page */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default Routers;
