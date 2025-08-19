// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import api from "../../axiosConfig"; // Use the interceptor-enabled Axios

// const Auth = () => {
//   const [isSignup, setIsSignup] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (isSignup) {
//         const { name, email, password, confirmPassword } = formData;

//         if (!name || !email || !password || !confirmPassword) {
//           toast.error("Please fill all fields.");
//           setLoading(false);
//           return;
//         }
//         if (password.length < 4) {
//           toast.error("Password must be at least 4 characters.");
//           setLoading(false);
//           return;
//         }
//         if (password !== confirmPassword) {
//           toast.error("Passwords do not match.");
//           setLoading(false);
//           return;
//         }

//         const res = await api.post("/auth/register", {
//           name,
//           email,
//           password,
//           role: "user",
//         });

//         toast.success(res.data.message || "Signup successful!");
//         setIsSignup(false);
//         setFormData({ name: "", email: "", password: "", confirmPassword: "" });
//       } else {
//         const { email, password } = formData;

//         if (!email || !password) {
//           toast.warn("Please enter email and password.");
//           setLoading(false);
//           return;
//         }

//         const res = await api.post("/auth/login", { email, password });
//         const { token, user } = res.data;

//         // Save login data
//         localStorage.setItem("token", token);
//         localStorage.setItem("user", JSON.stringify(user));
//         localStorage.setItem("userId", user.id);

//         toast.success("Login successful!");
//         navigate("/");
//       }
//     } catch (error) {
//       const errMsg = error?.response?.data?.message || "Something went wrong.";
//       toast.error(errMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = async (credentialResponse) => {
//     try {
//       setLoading(true);
//       const res = await api.post("/auth/google", {
//         token: credentialResponse.credential,
//       });

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));
//       localStorage.setItem("userId", res.data.user.id);

//       toast.success("Google login successful!");
//       navigate("/");
//     } catch (err) {
//       toast.error("Google login failed!",err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md relative overflow-hidden">
//         <div className="absolute top-0 left-0 h-2 w-full bg-gradient-to-r from-red-300 via-red-800 to-red-950 rounded-t-3xl"></div>
//         <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
//           {isSignup ? "✨ Create Account" : "🚀 Login to Continue"}
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {isSignup && (
//             <div className="flex items-center border px-3 py-2 rounded-lg focus-within:ring-2 ring-indigo-300">
//               <FaUser className="text-gray-400 mr-2" />
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Full Name"
//                 className="w-full outline-none"
//               />
//             </div>
//           )}

//           <div className="flex items-center border px-3 py-2 rounded-lg focus-within:ring-2 ring-indigo-300">
//             <FaEnvelope className="text-gray-400 mr-2" />
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email"
//               className="w-full outline-none"
//             />
//           </div>

//           <div className="flex items-center border px-3 py-2 rounded-lg focus-within:ring-2 ring-indigo-300 relative">
//             <FaLock className="text-gray-400 mr-2" />
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Password"
//               className="w-full outline-none pr-8"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword((prev) => !prev)}
//               className="absolute right-3 text-gray-500 focus:outline-none"
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </button>
//           </div>

//           {isSignup && (
//             <div className="flex items-center border px-3 py-2 rounded-lg focus-within:ring-2 ring-indigo-300 relative">
//               <FaLock className="text-gray-400 mr-2" />
//               <input
//                 type={showConfirm ? "text" : "password"}
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 placeholder="Confirm Password"
//                 className="w-full outline-none pr-8"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowConfirm((prev) => !prev)}
//                 className="absolute right-3 text-gray-500 focus:outline-none"
//               >
//                 {showConfirm ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full bg-gradient-to-r from-red-300 via-red-800 to-red-950 text-white py-2 rounded-lg font-semibold hover:scale-[1.02] transition-all ${
//               loading ? "opacity-60 cursor-not-allowed" : ""
//             }`}
//           >
//             {loading ? "Please wait..." : isSignup ? "Sign Up" : "Login"}
//           </button>
//         </form>

//         <div className="my-4 text-center">
//           <GoogleOAuthProvider clientId="1035585808188-4aegmks1vah624ks490610u0gnkpo4df.apps.googleusercontent.com">
//             <GoogleLogin
//               onSuccess={handleGoogleLogin}
//               onError={() => toast.error("Google login failed")}
//             />
//           </GoogleOAuthProvider>
//         </div>

//         <p className="text-center text-sm mt-4 text-gray-600">
//           {isSignup ? "Already have an account?" : "New here?"}{" "}
//           <button
//             onClick={() => {
//               setIsSignup((prev) => !prev);
//               setFormData({
//                 name: "",
//                 email: "",
//                 password: "",
//                 confirmPassword: "",
//               });
//             }}
//             className="text-indigo-600 font-semibold hover:underline"
//           >
//             {isSignup ? "Login Now" : "Create one"}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Auth;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // ✅ Auto logout hook
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
       const { exp } = jwtDecode(token);
      const expiryTime = exp * 1000 - Date.now();

      if (expiryTime <= 0) {
        localStorage.clear();
        toast.info("Session expired. Please login again.");
        navigate("/auth");
        return;
      }

      const timeout = setTimeout(() => {
        localStorage.clear();
        toast.info("Session expired. Please login again.");
        navigate("/auth");
      }, expiryTime);

      return () => clearTimeout(timeout);
    } catch {
      localStorage.clear();
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignup) {
        const { name, email, password, confirmPassword } = formData;

        if (!name || !email || !password || !confirmPassword) {
          toast.error("Please fill all fields.");
          setLoading(false);
          return;
        }
        if (password.length < 4) {
          toast.error("Password must be at least 4 characters.");
          setLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          toast.error("Passwords do not match.");
          setLoading(false);
          return;
        }

        const res = await axios.post(
          "http://localhost:8000/api/auth/register",
          { name, email, password, role: "user" }
        );

        toast.success(res.data.message || "Signup successful!");
        setIsSignup(false);
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
      } else {
        const { email, password } = formData;

        if (!email || !password) {
          toast.warn("Please enter email and password.");
          setLoading(false);
          return;
        }

        const res = await axios.post("http://localhost:8000/api/auth/login", {
          email,
          password,
        });

        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("userId", user.id);

        toast.success("Login successful!");
        navigate("/");
      }
    } catch (error) {
      const errMsg = error?.response?.data?.message || "Something went wrong.";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8000/api/auth/google", {
        token: credentialResponse.credential,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("userId", res.data.user.id);

      toast.success("Google login successful!");
      navigate("/");
    } catch (err) {
      toast.error("Google login failed!", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md relative overflow-hidden">
        <div className="absolute top-0 left-0 h-2 w-full bg-gradient-to-r from-red-300 via-red-800 to-red-950 rounded-t-3xl"></div>
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          {isSignup ? "✨ Create Account" : "🚀 Login to Continue"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {isSignup && (
            <div className="flex items-center border px-3 py-2 rounded-lg focus-within:ring-2 ring-indigo-300">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full outline-none"
              />
            </div>
          )}

          <div className="flex items-center border px-3 py-2 rounded-lg focus-within:ring-2 ring-indigo-300">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full outline-none"
            />
          </div>

          <div className="flex items-center border px-3 py-2 rounded-lg focus-within:ring-2 ring-indigo-300 relative">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full outline-none pr-8"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 text-gray-500 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {isSignup && (
            <div className="flex items-center border px-3 py-2 rounded-lg focus-within:ring-2 ring-indigo-300 relative">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full outline-none pr-8"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((prev) => !prev)}
                className="absolute right-3 text-gray-500 focus:outline-none"
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-red-300 via-red-800 to-red-950 text-white py-2 rounded-lg font-semibold hover:scale-[1.02] transition-all ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Please wait..." : isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="my-4 text-center">
          <GoogleOAuthProvider clientId="1035585808188-4aegmks1vah624ks490610u0gnkpo4df.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => toast.error("Google login failed")}
            />
          </GoogleOAuthProvider>
        </div>

        <p className="text-center text-sm mt-4 text-gray-600">
          {isSignup ? "Already have an account?" : "New here?"}{" "}
          <button
            onClick={() => {
              setIsSignup((prev) => !prev);
              setFormData({ name: "", email: "", password: "", confirmPassword: "" });
            }}
            className="text-indigo-600 font-semibold hover:underline"
          >
            {isSignup ? "Login Now" : "Create one"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
