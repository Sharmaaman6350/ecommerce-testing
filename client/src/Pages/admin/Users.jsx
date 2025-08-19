import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Input,
  Label,
  Switch,
  Button,
} from "../../Components/UI/UI.jsx";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../Components/UI/UI.jsx";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { UserPlus, Users } from "lucide-react";

const COLORS = ["#4f46e5", "#10b981", "#f59e0b"];

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "user", // keep roles lowercase for consistency with backend
    isActive: true,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8000/api/auth/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Unauthorized or failed to fetch users.");
        }

        const data = await res.json();
        setUsers(data.users || []);
      } catch (error) {
        console.error("Failed to load users:", error.message);
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const roleData = ["admin", "seller", "user"].map((role) => ({
    name: role,
    value: users.filter((u) => u.role === role).length,
  }));

  const activityTrend = users.map((u, i) => ({
    day: `U${i + 1}`,
    Active: u.isActive ? 1 : 0,
    Inactive: !u.isActive ? 1 : 0,
  }));

  const toggleActive = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user._id === id ? { ...user, isActive: !user.isActive } : user
      )
    );
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return;
    const newEntry = {
      _id: Date.now().toString(),
      ...newUser,
    };
    setUsers((prev) => [...prev, newEntry]);
    setShowModal(false);
    setNewUser({ name: "", email: "", role: "user", isActive: true });
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Users className="w-6 h-6 text-indigo-600" /> User Management
        </h1>
        <Button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-5 py-2 rounded-md flex items-center gap-2 hover:bg-indigo-700"
        >
          <UserPlus className="w-4 h-4" /> Add User
        </Button>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent>
            <h2 className="font-semibold mb-4">Users by Role</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  dataKey="value"
                  nameKey="name"
                  data={roleData}
                  outerRadius={80}
                  label
                >
                  {roleData.map((entry, idx) => (
                    <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="font-semibold mb-4">User Activity Trend</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={activityTrend}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Active"
                  stroke="#10b981"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="Inactive"
                  stroke="#ef4444"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* User Table */}
      <Card>
        <CardContent>
          <Input
            placeholder="Search users by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4 w-full md:w-1/3"
          />

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Toggle</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((user, i) => (
                <TableRow key={user._id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        user.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Switch
                      checked={user.isActive}
                      onCheckedChange={() => toggleActive(user._id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filtered.length === 0 && (
            <p className="text-center text-sm text-gray-500 mt-4">
              No users found.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Add New User</h3>
            <div>
              <Label>Name</Label>
              <Input
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </div>
            <div>
              <Label>Role</Label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="block w-full border px-4 py-2 rounded-md"
              >
                <option value="user">Customer</option>
                <option value="seller">Seller</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <Label>Status</Label>
              <Switch
                checked={newUser.isActive}
                onCheckedChange={(val) => setNewUser({ ...newUser, isActive: val })}
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button
                onClick={() => setShowModal(false)}
                className="bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddUser}
                className="bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Add User
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
