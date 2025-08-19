// src/Components/admin/StatsCard.jsx
import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const StatsCard = ({
  title,
  value,
  icon: Icon,
  trend = "up",
  change = "",
  bgColor = "bg-white dark:bg-gray-800",
  iconColor = "text-primary",
}) => {
  return (
    <Card className={`shadow-md ${bgColor} rounded-2xl hover:shadow-lg transition`}>
      <CardContent className="p-5 flex items-center gap-4">
        {/* Icon Wrapper */}
        <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-700 ${iconColor}`}>
          <Icon className="w-6 h-6" />
        </div>

        {/* Text Area */}
        <div className="flex flex-col gap-1">
          <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">
            {title}
          </span>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              {value}
            </h3>
            {change && (
              <span
                className={`text-sm flex items-center gap-1 font-medium ${
                  trend === "up" ? "text-green-500" : "text-red-500"
                }`}
              >
                {trend === "up" ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                {change}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
