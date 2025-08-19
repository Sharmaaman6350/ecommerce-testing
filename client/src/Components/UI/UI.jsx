import React, { useState } from "react";

// ✅ Card Components
export const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md p-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ children, className = "" }) => {
  return <div className={`mt-2 ${className}`}>{children}</div>;
};

// ✅ Textarea
export const Textarea = ({ className = "", rows = 3, ...props }) => {
  return (
    <textarea
      rows={rows}
      className={`w-full border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none ${className}`}
      {...props}
    />
  );
};

// ✅ Button
export const Button = ({
  children,
  className = "",
  variant = "default",
  size = "md",
  ...props
}) => {
  const variants = {
    default: "bg-indigo-600 text-white hover:bg-indigo-700",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
  };

  const sizes = {
    md: "px-4 py-2 text-sm",
    icon: "p-2",
  };

  return (
    <button
      className={`rounded-md font-medium transition duration-200 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// ✅ Input
export const Input = ({ className = "", ...props }) => {
  return (
    <input
      className={`w-full border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none ${className}`}
      {...props}
    />
  );
};

// ✅ Switch
export const Switch = ({ checked, onCheckedChange }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onCheckedChange(!checked)}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-indigo-600 transition duration-200"></div>
      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-full peer-checked:left-6"></div>
    </label>
  );
};

// ✅ Label
export const Label = ({ children, htmlFor = "", className = "", ...props }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium text-gray-700 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};

// ✅ Dialog
export const Dialog = ({ children }) => {
  return <div>{children}</div>;
};

export const DialogHeader = ({ children }) => {
  return <div className="border-b pb-2 mb-4">{children}</div>;
};

export const DialogTitle = ({ children }) => {
  return <h3 className="text-lg font-semibold text-gray-900">{children}</h3>;
};

export const DialogContent = ({ children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
        {children}
      </div>
    </div>
  );
};

export const DialogFooter = ({ children }) => {
  return (
    <div className="flex justify-end items-center gap-3 mt-6">
      {children}
    </div>
  );
};


// ✅ Dropdown Menu Components
export const DropdownMenu = ({ children }) => {
  return <div className="relative">{children}</div>;
};

export const DropdownMenuTrigger = ({ children }) => {
  return children;
};

export const DropdownMenuContent = ({ children, align = "end" }) => {
  return (
    <div
      className={`absolute z-50 mt-2 w-40 bg-white rounded-md shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none ${
        align === "end" ? "right-0" : "left-0"
      }`}
    >
      <div className="py-1">{children}</div>
    </div>
  );
};

export const DropdownMenuItem = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${className}`}
    >
      {children}
    </button>
  );
};

// ✅ Table Components
export const Table = ({ children, className = "" }) => {
  return (
    <div
      className={`w-full overflow-x-auto rounded-lg border border-gray-200 ${className}`}
    >
      <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
        {children}
      </table>
    </div>
  );
};

export const TableHeader = ({ children }) => {
  return (
    <thead className="bg-gray-50 text-gray-700 font-semibold">{children}</thead>
  );
};

export const TableBody = ({ children }) => {
  return (
    <tbody className="divide-y divide-gray-200 bg-white">{children}</tbody>
  );
};

export const TableRow = ({ children }) => {
  return <tr className="hover:bg-gray-50">{children}</tr>;
};

export const TableHead = ({ children, className = "" }) => {
  return (
    <th
      className={`px-4 py-3 text-xs font-medium uppercase tracking-wider ${className}`}
    >
      {children}
    </th>
  );
};

export const TableCell = ({ children, className = "" }) => {
  return (
    <td className={`px-4 py-3 text-sm text-gray-700 ${className}`}>
      {children}
    </td>
  );
};
