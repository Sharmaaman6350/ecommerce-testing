// import React, { useState } from "react";
// import { Outlet } from "react-router-dom";
// import { Menu, X } from "lucide-react";
// import Sidebar from "../Components/admin/Sidebar";
// import Header from "../Components/admin/Header";

// const AdminLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="flex h-screen overflow-hidden">
//       {/* Sidebar */}
//       <div className="hidden lg:flex lg:w-77 bg-white border-r">
//         <Sidebar />
//       </div>

//       {/* Mobile Sidebar Toggle */}
//       <div className="lg:hidden fixed top-4 left-4 z-50">
//         <button
//           onClick={() => setSidebarOpen(true)}
//           className="p-2 bg-white rounded-full shadow-md"
//         >
//           <Menu className="w-5 h-5" />
//         </button>
//       </div>

//       {/* Mobile Sidebar Drawer */}
//       {sidebarOpen && (
//         <div className="fixed inset-0 z-40 flex">
//           <div className="w-74 bg-white shadow-lg">
//             <div className="flex justify-end p-2">
//               <button
//                 onClick={() => setSidebarOpen(false)}
//                 className="p-4 rounded-full hover:bg-gray-100"
//               >
//                 <X className="w-10 h-5" />
//               </button>
//             </div>
//             <Sidebar />
//           </div>
//           <div
//             className="flex-1 bg-black bg-opacity-40"
//             onClick={() => setSidebarOpen(false)}
//           />
//         </div>
//       )}

//       {/* Main content */}
//       <div className="flex-1 flex flex-col bg-gray-100 overflow-auto">
//         <Header />
//         <main className="p-8 flex-1 overflow-y-auto">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;

import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import Sidebar from "../Components/admin/Sidebar";
import Header from "../Components/admin/Header";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // Desktop

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <div
        className={`hidden lg:flex flex-col bg-white border-r transition-all duration-300 ${
          sidebarCollapsed ? "w-[70px]" : "w-64"
        }`}
      >
        {/* Collapse Button */}
        <div className="flex justify-end p-2 border-b">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-gray-600 hover:text-indigo-600 transition"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        <Sidebar collapsed={sidebarCollapsed} />
      </div>

      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 bg-white rounded-full shadow-md"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Sidebar Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="w-64 bg-white shadow-lg">
            <div className="flex justify-end p-2">
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <Sidebar collapsed={false} />
          </div>
          <div
            className="flex-1 bg-black bg-opacity-40"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col bg-gray-100 overflow-auto transition-all duration-300">
        <Header />
        <main className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
