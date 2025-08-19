// import "./App.css";
// import Routers from "./routes/Router";
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer } from "react-toastify";


// function App() {
//   return (
//     <>
//     <ToastContainer position="top-right" />
//       <Routers />
//     </>
//   );
// }

// export default App;



import "./App.css";
import Routers from "./routes/Router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-x-hidden">
      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Main Content */}
      <main className="flex-1 w-full">
        <Routers />
      </main>

      {/* Optional Footer */}
      <footer className="w-full py-4 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 mt-auto">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
