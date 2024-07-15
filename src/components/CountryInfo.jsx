import React from "react";
import {
  FaGlobe,
  FaUsers,
  FaLanguage,
  FaMoneyBillWave,
  FaLandmark,
  FaUtensils,
  FaCalendarAlt,
} from "react-icons/fa";

const CountryInfo = ({ info }) => {
  if (!info) return null;

  const InfoItem = ({ icon, label, value }) => (
    <div className="flex items-start mb-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-600">{label}</h3>
        <p className="text-gray-800">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-indigo-800 border-b pb-2">
        {info.country}
      </h2>
      <div className="space-y-4">
        <InfoItem
          icon={<FaGlobe className="text-indigo-500" />}
          label="Capital"
          value={info.Capital}
        />
        <InfoItem
          icon={<FaUsers className="text-indigo-500" />}
          label="Population"
          value={info.Population}
        />
        <InfoItem
          icon={<FaLanguage className="text-indigo-500" />}
          label="Languages"
          value={info.Languages}
        />
        <InfoItem
          icon={<FaMoneyBillWave className="text-indigo-500" />}
          label="Currency"
          value={info.Currency}
        />
        <InfoItem
          icon={<FaLandmark className="text-indigo-500" />}
          label="Famous Landmark"
          value={info["Famous Landmark"]}
        />
        <InfoItem
          icon={<FaUtensils className="text-indigo-500" />}
          label="Traditional Dish"
          value={info["Traditional Dish"]}
        />
        <InfoItem
          icon={<FaCalendarAlt className="text-indigo-500" />}
          label="National Holiday"
          value={info["National Holiday"]}
        />
      </div>
    </div>
  );
};

export default CountryInfo;
