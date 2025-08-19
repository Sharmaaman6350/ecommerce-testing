// import React from "react";
// import { NavLink } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Boxes,
//   Users,
//   Settings,
//   IndianRupee,
//   Star,
//   ShoppingCart,
// } from "lucide-react";

// const navLinks = [
//   { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
//   { to: "/admin/products", label: "Products", icon: Boxes },
//   { to: "/admin/orders", label: "Orders", icon: ShoppingCart },
//   { to: "/admin/users", label: "Users", icon: Users },
//   { to: "/admin/payment", label: "Payment", icon: IndianRupee },
//    { to: "/admin/rating", label: "Ratings", icon: Star },
//   { to: "/admin/settings", label: "Settings", icon: Settings },
// ];

// const Sidebar = () => {
//   return (
//     <aside className="h-full w-full p-4 bg-white dark:bg-gray-900 border-r dark:border-gray-800">
//       <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-4 mb-6 px-2">
//         Admin Panel
//       </h2>
//       <nav className="space-y-2">
//         {navLinks.map(({ to, label, icon: Icon }) => (
//           <NavLink
//             key={to}
//             to={to}
//             className={({ isActive }) =>
//               `group flex items-center gap-3 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
//                 isActive
//                   ? "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 border-l-4 border-indigo-600"
//                   : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
//               }`
//             }
//           >
//             <Icon className="w-5 h-5" />
//             <span>{label}</span>
//           </NavLink>
//         ))}
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;

import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Boxes,
  Users,
  Settings,
  IndianRupee,
  Star,
  ShoppingCart,
} from "lucide-react";

// Sidebar Navigation Links
const navLinks = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/products", label: "Products", icon: Boxes },
  { to: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/payment", label: "Payment", icon: IndianRupee },
  // { to: "/admin/rating", label: "Ratings", icon: Star },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

const Sidebar = ({ collapsed = false }) => {
  return (
    <aside
      className={`h-full bg-white dark:bg-gray-900 border-r dark:border-gray-800 transition-all duration-300 ${
        collapsed ? "w-[70px]" : "w-64"
      }`}
    >
      {/* Logo / Title */}
      {!collapsed && (
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-6 mb-8 px-4">
          Admin Panel
        </h2>
      )}

      {/* Navigation */}
      <nav className="space-y-2 px-2">
        {navLinks.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `group flex items-center ${
                collapsed ? "justify-center" : "justify-start"
              } gap-3 px-3 py-2 rounded-md font-medium transition-all duration-200 
              ${
                isActive
                  ? "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 border-l-4 border-indigo-600 dark:border-indigo-400"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`
            }
          >
            <Icon className="w-5 h-5" />
            {!collapsed && <span className="whitespace-nowrap">{label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

