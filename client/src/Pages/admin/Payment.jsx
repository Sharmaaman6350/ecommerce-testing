
// import React, { useState } from "react";
// import {
//   Card,
//   CardContent,
//   Input,
//   Label,
//   Button,
//   Table,
//   TableHeader,
//   TableBody,
//   TableRow,
//   TableHead,
//   TableCell,
// } from "../../Components/UI/UI.jsx";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "../../Components/UI/Select.jsx";
// import {
//   BarChart,
//   Bar,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";

// import {
//   CalendarDays,
//   CreditCard,
//   CheckCircle,
//   XCircle,
//   DollarSign,
//   TrendingUp,
//   ListChecks,
// } from "lucide-react";

// // Sample Payments
// const paymentsData = [
//   { id: "PAY001", date: "2025-07-01", method: "Credit Card", amount: 1250, status: "Success" },
//   { id: "PAY002", date: "2025-07-05", method: "UPI", amount: 899, status: "Failed" },
//   { id: "PAY003", date: "2025-07-10", method: "COD", amount: 1450, status: "Success" },
//   { id: "PAY004", date: "2025-07-12", method: "Credit Card", amount: 2999, status: "Success" },
//   { id: "PAY005", date: "2025-07-12", method: "Credit Card", amount: 2679, status: "Success" },
//   { id: "PAY006", date: "2025-07-12", method: "Credit Card", amount: 239, status: "Success" },
//   { id: "PAY007", date: "2025-07-12", method: "Credit Card", amount: 2977, status: "Success" },
//   { id: "PAY008", date: "2025-07-12", method: "Credit Card", amount: 2333, status: "Success" },
//   { id: "PAY009", date: "2025-07-12", method: "Credit Card", amount: 2889, status: "Success" },
//   { id: "PAY010", date: "2025-07-12", method: "Credit Card", amount: 2999, status: "Success" },
//   { id: "PAY011", date: "2025-07-12", method: "Credit Card", amount: 299, status: "Success" },
//   { id: "PAY012", date: "2025-07-12", method: "Credit Card", amount: 2459, status: "Success" },
// ];

// // CSV Export Function
// const exportToCSV = (data, filename = "payments_report.csv") => {
//   const csvHeaders = ["ID", "Date", "Method", "Amount", "Status"];
//   const csvRows = [
//     csvHeaders.join(","),
//     ...data.map((row) =>
//       [row.id, `="${row.date}"`, row.method, row.amount, row.status].join(",")
//     ),
//   ];
//   const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
//   const encodedUri = encodeURI(csvContent);
//   const link = document.createElement("a");
//   link.setAttribute("href", encodedUri);
//   link.setAttribute("download", filename);
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };

// const statusStyles = {
//   Success: "bg-green-100 text-green-700 dark:bg-green-700/10 dark:text-green-400",
//   Failed: "bg-red-100 text-red-600 dark:bg-red-700/10 dark:text-red-400",
// };

// const AdminPayments = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");

//   const sortedPayments = [...paymentsData].sort(
//     (a, b) => new Date(b.date) - new Date(a.date)
//   );

//   const filteredPayments = sortedPayments.filter(
//     (p) =>
//       (statusFilter === "All" || p.status === statusFilter) &&
//       (p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         p.method.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   const chartData = filteredPayments.map((p) => ({
//     name: p.date,
//     amount: p.amount,
//   }));

//   const totalAmount = filteredPayments.reduce(
//     (acc, curr) => acc + curr.amount,
//     0
//   );
//   const totalSuccess = filteredPayments.filter(
//     (p) => p.status === "Success"
//   ).length;
//   const successRate =
//     filteredPayments.length > 0
//       ? Math.round((totalSuccess / filteredPayments.length) * 100)
//       : 0;

//   return (
//     <div className="p-6 space-y-6 bg-white dark:bg-[#111827] min-h-screen">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
//           💳 Payment Overview
//         </h2>
//         <Button
//           onClick={() => exportToCSV(filteredPayments)}
//           className="bg-indigo-600 hover:bg-indigo-700 text-white"
//           aria-label="Download CSV report"
//         >
//           <CreditCard className="w-5 h-5 mr-2" /> Generate Report
//         </Button>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         <Card className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-500">
//           <CardContent className="py-4 flex items-center gap-4">
//             <ListChecks className="text-blue-600 dark:text-blue-400 w-6 h-6" />
//             <div>
//               <div className="text-sm text-gray-600 dark:text-gray-300">Total Payments</div>
//               <div className="text-xl font-bold text-blue-800 dark:text-white">{filteredPayments.length}</div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400 dark:border-green-500">
//           <CardContent className="py-4 flex items-center gap-4">
//             <DollarSign className="text-green-600 dark:text-green-400 w-6 h-6" />
//             <div>
//               <div className="text-sm text-gray-600 dark:text-gray-300">Total Amount</div>
//               <div className="text-xl font-bold text-green-800 dark:text-white">₹{totalAmount.toLocaleString()}</div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-500">
//           <CardContent className="py-4 flex items-center gap-4">
//             <TrendingUp className="text-yellow-600 dark:text-yellow-400 w-6 h-6" />
//             <div>
//               <div className="text-sm text-gray-600 dark:text-gray-300">Success Rate</div>
//               <div className="text-xl font-bold text-yellow-800 dark:text-white">{successRate}%</div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Bar Chart */}
//       <Card>
//         <CardContent className="p-4">
//           <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 dark:text-white">
//             <CalendarDays className="w-5 h-5" /> Payments by Date
//           </h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <BarChart data={chartData}>
//               <XAxis dataKey="name" stroke="#888" />
//               <YAxis stroke="#888" />
//               <Tooltip
//                 formatter={(value) => [`₹${value}`, "Amount"]}
//                 labelFormatter={(label) => `Date: ${label}`}
//               />
//               <Bar dataKey="amount" fill="#6366f1" radius={[4, 4, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>

//       {/* Filters */}
//       <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//         <div className="w-full md:w-1/3">
//           <Label className="text-sm text-gray-700 dark:text-gray-300 mb-1 block">Search by ID or Method</Label>
//           <Input
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="e.g. PAY001 or UPI"
//           />
//         </div>
//         <div className="w-full md:w-1/4">
//           <Label className="text-sm text-gray-700 dark:text-gray-300 mb-1 block">Filter by Status</Label>
//           <Select value={statusFilter} onValueChange={setStatusFilter}>
//             <SelectTrigger className="w-full">
//               <SelectValue placeholder="Status" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="All">All</SelectItem>
//               <SelectItem value="Success">Success</SelectItem>
//               <SelectItem value="Failed">Failed</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {/* Payments Table */}
//       <Card>
//         <CardContent className="p-0">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>ID</TableHead>
//                 <TableHead>Date</TableHead>
//                 <TableHead>Method</TableHead>
//                 <TableHead>Amount</TableHead>
//                 <TableHead>Status</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredPayments.map((payment) => (
//                 <TableRow key={payment.id}>
//                   <TableCell>{payment.id}</TableCell>
//                   <TableCell>{payment.date}</TableCell>
//                   <TableCell>{payment.method}</TableCell>
//                   <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
//                   <TableCell>
//                     <span
//                       className={`px-2 py-1 text-sm font-medium rounded-full ${statusStyles[payment.status]}`}
//                     >
//                       {payment.status === "Success" ? (
//                         <>
//                           <CheckCircle className="w-4 h-4 inline mr-1" />
//                           {payment.status}
//                         </>
//                       ) : (
//                         <>
//                           <XCircle className="w-4 h-4 inline mr-1" />
//                           {payment.status}
//                         </>
//                       )}
//                     </span>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//           {filteredPayments.length === 0 && (
//             <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-6">
//               No matching payments found.
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default AdminPayments;


import React, { useEffect, useState } from "react";
import { getAllPayments } from "../../api.js";
import {
  Card,
  CardContent,
  Input,
  Label,
  Button,
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
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  CalendarDays,
  CreditCard,
  CheckCircle,
  XCircle,
  DollarSign,
  TrendingUp,
  ListChecks,
} from "lucide-react";

const statusStyles = {
  Success: "bg-green-100 text-green-700 dark:bg-green-700/10 dark:text-green-400",
  Failed: "bg-red-100 text-red-600 dark:bg-red-700/10 dark:text-red-400",
};

const AdminPayments = () => {
 const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const { data } = await getAllPayments(); // <- api.js function use
        setPayments(data.payments); // <- backend me payments array ka naam
        setLoading(false);
      } catch (err) {
        console.error("Error fetching payments:", err);
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const filteredPayments = payments
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .filter(
    (p) =>
      (statusFilter === "All" || p.status === statusFilter) &&
      (
        (p._id?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (p.paymentMethod?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (p.user?.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (p.user?.email?.toLowerCase() || "").includes(searchTerm.toLowerCase())
      )
  );


  const chartData = filteredPayments.map((p) => ({
    name: new Date(p.createdAt).toLocaleDateString(),
    amount: p.amount,
  }));

  const totalAmount = filteredPayments.reduce((acc, curr) => acc + curr.amount, 0);
  const totalSuccess = filteredPayments.filter((p) => p.status === "Success").length;
  const successRate =
    filteredPayments.length > 0 ? Math.round((totalSuccess / filteredPayments.length) * 100) : 0;

  const exportToCSV = (data, filename = "payments_report.csv") => {
    const csvHeaders = ["ID", "Date", "User", "Email", "Method", "Amount", "Status"];
    const csvRows = [
      csvHeaders.join(","),
      ...data.map((row) =>
        [
          row._id,
          `="${new Date(row.createdAt).toLocaleDateString()}"`,
          row.user.name,
          row.user.email,
          row.paymentMethod,
          row.amount,
          row.status,
        ].join(",")
      ),
    ];
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <div className="p-6 text-gray-700 dark:text-gray-200">Loading payments...</div>;

  return (
    <div className="p-6 space-y-6 bg-white dark:bg-[#111827] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          💳 Payment Overview
        </h2>
        <Button
          onClick={() => exportToCSV(filteredPayments)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
          aria-label="Download CSV report"
        >
          <CreditCard className="w-5 h-5 mr-2" /> Generate Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-500">
          <CardContent className="py-4 flex items-center gap-4">
            <ListChecks className="text-blue-600 dark:text-blue-400 w-6 h-6" />
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Total Payments</div>
              <div className="text-xl font-bold text-blue-800 dark:text-white">{filteredPayments.length}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400 dark:border-green-500">
          <CardContent className="py-4 flex items-center gap-4">
            <DollarSign className="text-green-600 dark:text-green-400 w-6 h-6" />
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Total Amount</div>
              <div className="text-xl font-bold text-green-800 dark:text-white">₹{totalAmount.toLocaleString()}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-500">
          <CardContent className="py-4 flex items-center gap-4">
            <TrendingUp className="text-yellow-600 dark:text-yellow-400 w-6 h-6" />
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Success Rate</div>
              <div className="text-xl font-bold text-yellow-800 dark:text-white">{successRate}%</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bar Chart */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 dark:text-white">
            <CalendarDays className="w-5 h-5" /> Payments by Date
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                formatter={(value) => [`₹${value}`, "Amount"]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Bar dataKey="amount" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full md:w-1/3">
          <Label className="text-sm text-gray-700 dark:text-gray-300 mb-1 block">Search by ID, Method, or User</Label>
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="e.g. PAY001, UPI, John"
          />
        </div>
        <div className="w-full md:w-1/4">
          <Label className="text-sm text-gray-700 dark:text-gray-300 mb-1 block">Filter by Status</Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Success">Success</SelectItem>
              <SelectItem value="Failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Payments Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment._id}>
                  <TableCell>{payment._id}</TableCell>
                  <TableCell>{new Date(payment.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>{payment.user.name}</TableCell>
                  <TableCell>{payment.user.email}</TableCell>
                  <TableCell>{payment.paymentMethod}</TableCell>
                  <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-sm font-medium rounded-full ${statusStyles[payment.status]}`}>
                      {payment.status === "Success" ? (
                        <>
                          <CheckCircle className="w-4 h-4 inline mr-1" />
                          {payment.status}
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 inline mr-1" />
                          {payment.status}
                        </>
                      )}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredPayments.length === 0 && (
            <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-6">
              No matching payments found.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPayments;
