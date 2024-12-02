import React from "react";

const DashboardCard = ({ color, value, title, Icon }) => {
  return (
    <div className=" border px-6 py-4 shadow-md w-full rounded text-gray-400">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="text-sm font-medium">
            <span>{title}</span>
          </div>
          <div className={`${color} rounded-full p-2`}>
            <Icon className="h-4 w-4 text-white" />
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold">{value}</div>
        </div>
    </div>
  );
};

export default DashboardCard;
