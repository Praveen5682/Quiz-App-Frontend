import React from "react";

const DashboardCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white shadow rounded p-4 flex items-center gap-4">
      <div className="text-indigo-600">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        {Array.isArray(value) ? (
          <ul className="mt-1">
            {value.map((name, idx) => (
              <li key={idx} className="text-lg font-semibold">
                {name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg font-bold">{value}</p>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;
