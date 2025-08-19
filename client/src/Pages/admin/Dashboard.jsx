
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
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Users,
  ShoppingCart,
  Package,
  DollarSign,
  Activity,
  Clock,
  AlertCircle,
} from "lucide-react";
import {
  getProducts,
  getAllOrders,
  getAllPayments,
  getAllUsers,
} from "../../api.js";

const COLORS = ["#4ade80", "#facc15", "#f87171"];

const AdminDashboard = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [usersRes, productsRes, ordersRes, paymentsRes] =
          await Promise.all([
            getAllUsers(),
            getProducts(),
            getAllOrders(),
            getAllPayments(),
          ]);

        setUsers(usersRes.data.users || []);
        setProducts(productsRes.data || []);
        setOrders(ordersRes.data.orders || []);
        setPayments(paymentsRes.data.payments || []);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // 📌 Metrics
  const metrics = [
    {
      title: "Users",
      icon: <Users className="text-sky-500" />,
      value: users.length,
      growth: "+0%", // Could calculate vs last month if needed
    },
    {
      title: "Orders",
      icon: <ShoppingCart className="text-green-500" />,
      value: orders.length,
      growth: "+0%",
    },
    {
      title: "Products",
      icon: <Package className="text-purple-500" />,
      value: products.length,
      growth: "+0%",
    },
    {
      title: "Revenue",
      icon: <DollarSign className="text-yellow-500" />,
      value: `₹${payments
        .reduce((sum, p) => sum + (p.amount / 100 || 0), 0)
        .toLocaleString()}`,
      growth: "+0%",
    },
  ];

  // 📌 Order status chart data
  const orderStatusData = [
    {
      name: "Delivered",
      value: orders.filter((o) => o.status?.toLowerCase() === "delivered")
        .length,
    },
    {
      name: "Pending",
      value: orders.filter(
        (o) =>
          o.status?.toLowerCase() === "pending" ||
          o.status?.toLowerCase() === "placed"
      ).length,
    },
    {
      name: "Cancelled",
      value: orders.filter((o) => o.status?.toLowerCase() === "cancelled")
        .length,
    },
  ];

  // 📌 Monthly revenue chart
  const revenueData = payments.reduce((acc, payment) => {
    const month = new Date(payment.createdAt).toLocaleString("default", {
      month: "short",
    });
    const existing = acc.find((item) => item.month === month);
    if (existing) {
      existing.revenue += payment.amount / 100;
    } else {
      acc.push({ month, revenue: payment.amount / 100 });
    }
    return acc;
  }, []);

  // 📌 Alerts
  const alerts = [
    {
      type: "Low Stock",
      message: `${
        products.filter((p) => p.stock <= 5).length
      } products are low in stock`,
      icon: <AlertCircle className="text-red-500" />,
      color: "bg-red-50 dark:bg-red-900/20",
    },
    {
      type: "Pending Orders",
      message: `${
        orders.filter(
          (o) =>
            o.status?.toLowerCase() === "pending" ||
            o.status?.toLowerCase() === "placed"
        ).length
      } orders are still pending`,
      icon: <Clock className="text-yellow-500" />,
      color: "bg-yellow-50 dark:bg-yellow-900/20",
    },
    {
      type: "High Activity",
      message: `Total payments today: ₹${payments
        .filter(
          (p) =>
            new Date(p.createdAt).toDateString() === new Date().toDateString()
        )
        .reduce((sum, p) => sum + p.amount / 100, 0)
        .toLocaleString()}`,
      icon: <Activity className="text-blue-500" />,
      color: "bg-blue-50 dark:bg-blue-900/20",
    },
  ];

  const filteredOrders = orders.filter(
    (o) =>
      o?.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      o?._id?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p className="p-6 text-center">Loading dashboard...</p>;
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        Admin Dashboard
      </h1>

      {/* 🔔 Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {alerts.map((alert, i) => (
          <Card
            key={i}
            className={`${alert.color} border-l-4 border-transparent`}
          >
            <CardContent className="flex items-center gap-4 p-4">
              <div>{alert.icon}</div>
              <div>
                <p className="font-semibold text-sm text-gray-800 dark:text-white">
                  {alert.type}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {alert.message}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 📈 Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {metrics.map((item, i) => (
          <Card
            key={i}
            className="bg-white dark:bg-gray-800 shadow hover:shadow-md transition rounded-xl"
          >
            <CardContent className="flex items-center gap-4 p-4">
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-full">
                {item.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {item.title}
                </p>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  {item.value}
                </p>
                <p className="text-xs text-green-500">
                  {item.growth} this month
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 📊 Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-4">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              Monthly Revenue
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={revenueData}>
                <XAxis dataKey="month" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6366f1"
                  fill="#c7d2fe"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Order Status Chart */}
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-4">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              Order Status
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  dataKey="value"
                  label={({ name }) => name}
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 🧾 Recent Orders */}
      <Card className="bg-white dark:bg-gray-800">
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">
              Recent Orders
            </h2>
            <Input
              placeholder="Search by customer or order ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-64 dark:bg-gray-900 dark:text-white"
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order, idx) => (
                <TableRow key={idx}>
                  <TableCell>{order.razorpayOrderId}</TableCell>
                  <TableCell>{order?.user?.email || "N/A"}</TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>₹{order.totalAmount}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-medium ${
                        order.status?.toLowerCase() === "delivered"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                          : order.status?.toLowerCase() === "pending" ||
                            order.status?.toLowerCase() === "placed"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                          : order.status?.toLowerCase() === "shipped"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                          : order.status?.toLowerCase() === "cancelled" ||
                            order.status?.toLowerCase() === "canceled"
                          ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                          : "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400"
                      }`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredOrders.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
              No orders found.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
