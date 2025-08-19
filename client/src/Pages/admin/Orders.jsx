import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Input,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../Components/UI/UI.jsx";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../Components/UI/Select.jsx";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { getAllOrders, updateOrderStatus } from "../../api.js";

const statusColors = {
  Delivered:
    "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-400",
  Placed:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-400",
  Returned:
    "bg-yellow-100 text-blue-400 dark:bg-yellow-900 dark:text-yellow-400",
  Cancelled: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-400",
};

const COLORS = ["#4ade80", "#facc15", "#f87171", "#42A5F5"];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Date filter states
  const [dateFilter, setDateFilter] = useState("All");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getAllOrders();
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    const updated = orders.map((order) =>
      order._id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updated);

    try {
      await updateOrderStatus(orderId, newStatus);
      console.log('status updated',orderId)
    } catch (err) {
      console.error(
        "Failed to update status:",
        err.response?.data?.message || err.message
      );
      setOrders(orders);
    }
  };

  const filterByDate = (order) => {
    if (dateFilter === "All") return true;

    const orderDate = new Date(order.createdAt);
    const now = new Date();

    if (dateFilter === "Today") {
      return orderDate.toDateString() === now.toDateString();
    }

    if (dateFilter === "Last7Days") {
      const diff = now - orderDate;
      return diff <= 7 * 24 * 60 * 60 * 1000;
    }

    if (dateFilter === "ThisMonth") {
      return (
        orderDate.getMonth() === now.getMonth() &&
        orderDate.getFullYear() === now.getFullYear()
      );
    }

    if (dateFilter === "Custom") {
      if (!customStart || !customEnd) return true;
      const start = new Date(customStart);
      const end = new Date(customEnd);
      return orderDate >= start && orderDate <= end;
    }

    return true;
  };

  const filteredOrders = orders.filter(
    (order) =>
      (filterStatus === "All" || order.status === filterStatus) &&
      (order.customer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order._id.toLowerCase().includes(searchTerm.toLowerCase())) &&
      filterByDate(order)
  );

  const chartData = [
    {
      status: "Placed",
      value: orders.filter((o) => o.status === "Placed").length,
    },
    {
      status: "Delivered",
      value: orders.filter((o) => o.status === "Delivered").length,
    },
    {
      status: "Cancelled",
      value: orders.filter((o) => o.status === "Cancelled").length,
    },
    {
      status: "Returned",
      value: orders.filter((o) => o.status === "Returned").length,
    },
  ];

  if (loading) {
    return (
      <div className="text-center py-16 text-gray-600 text-lg">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="dark:bg-gray-900">
          <CardContent>
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Order Status Breakdown
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-900">
          <CardContent>
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Revenue Trend
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={orders}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="customer" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="totalAmount"
                  stroke="#6366f1"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Filters + Table */}
      <Card className="dark:bg-gray-900">
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            {/* Search */}
            <div className="flex items-center w-full md:w-1/2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 shadow-sm">
              <svg
                className="h-5 w-5 text-gray-400 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M17 17A7.5 7.5 0 103 10.5 7.5 7.5 0 0017 17z"
                />
              </svg>
              <Input
                placeholder="Search by customer or order ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-sm text-gray-700 dark:text-white"
              />
            </div>

            {/* Status Filter */}
            <div className="w-full md:w-48">
              <label className="text-sm text-gray-600 dark:text-gray-300 mb-1 block">
                Filter by Status
              </label>
              <Select
                value={filterStatus}
                onValueChange={(val) => setFilterStatus(val)}
              >
                <SelectTrigger className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm rounded-md shadow-sm px-3 py-2">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent className="z-50 bg-white dark:bg-gray-800 text-sm">
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Placed">Placed</SelectItem>
                  <SelectItem value="Confirmed">Confirmed</SelectItem>
                  <SelectItem value="Shipped">Shipped</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                  <SelectItem value="Returned">Returned</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Filter */}
            <div className="w-full md:w-56">
              <label className="text-sm text-gray-600 dark:text-gray-300 mb-1 block">
                Filter by Date
              </label>
              <Select
                value={dateFilter}
                onValueChange={(val) => setDateFilter(val)}
              >
                <SelectTrigger className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm rounded-md shadow-sm px-3 py-2">
                  <SelectValue placeholder="Select Date" />
                </SelectTrigger>
                <SelectContent className="z-50 bg-white dark:bg-gray-800 text-sm">
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Today">Today</SelectItem>
                  <SelectItem value="Last7Days">Last 7 Days</SelectItem>
                  <SelectItem value="ThisMonth">This Month</SelectItem>
                  <SelectItem value="Custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
              {dateFilter === "Custom" && (
                <div className="flex gap-2 mt-2">
                  <Input
                    type="date"
                    value={customStart}
                    onChange={(e) => setCustomStart(e.target.value)}
                    className="w-1/2 border border-gray-300 rounded px-2 py-1 text-sm"
                  />
                  <Input
                    type="date"
                    value={customEnd}
                    onChange={(e) => setCustomEnd(e.target.value)}
                    className="w-1/2 border border-gray-300 rounded px-2 py-1 text-sm"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Orders Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order.razorpayOrderId}</TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{order.user?.email || "N/A"}</TableCell>
                  <TableCell>₹{order.totalAmount}</TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(val) =>
                        handleStatusChange(order._id, val)
                      }
                    >
                      <SelectTrigger
                        className={`w-[120px] text-sm px-2 py-1 ${
                          statusColors[order.status]
                        }`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Placed">Placed</SelectItem>
                        <SelectItem value="Confirmed">Confirmed</SelectItem>
                        <SelectItem value="Shipped">Shipped</SelectItem>
                        <SelectItem value="Delivered">Delivered</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                        <SelectItem value="Returned">Returned</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredOrders.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-4">
              No matching orders found.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
