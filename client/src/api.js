import axios from "axios";
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

// 🔐 Helper to attach token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};

// 🛍️ Products
export const addProduct = (data) =>
  axios.post(`${API_BASE_URL}/product/add`, data);
export const getProducts = () => axios.get(`${API_BASE_URL}/product/get`);
export const updateProduct = (id, data) =>
  axios.put(`${API_BASE_URL}/product/update/${id}`, data);
export const deleteProduct = (id) =>
  axios.delete(`${API_BASE_URL}/product/delete/${id}`);

// 💳 Razorpay Payment APIs
export const createRazorpayOrder = (data) =>
  axios.post(`${API_BASE_URL}/payment/create`, data, getAuthHeaders());

export const verifyAndSaveOrder = (orderData) => {
  const token = localStorage.getItem("token");
  return axios.post(`${API_BASE_URL}/payment/verify`, orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const SaveOrder = (data) =>
  axios.post(`${API_BASE_URL}/payment/save`, data, getAuthHeaders());

// 📦 My Orders (needs login)

export const getMyOrders = async () => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_BASE_URL}/payment/myOrders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getProfile = async () => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_BASE_URL}/profile/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllOrders = async () => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_BASE_URL}/payment/admin/allOrders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllUsers = async () => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_BASE_URL}/auth/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllPayments = async () => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_BASE_URL}/payment/admin/allPayments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateOrderStatus = async (orderId, status) => {
  const token = localStorage.getItem("token");

  if (!orderId || !status) throw new Error("Order ID and status are required");

  return axios.put(
    `${API_BASE_URL}/payment/admin/statusUpdate/${orderId}`,
    { status }, // request body
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
