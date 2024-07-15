import React, { useState, useEffect } from "react";
import Map from "./components/Map";
import CountryInfo from "./components/CountryInfo";
import { getCountryInfo } from "./utils/geminiApi";

function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryInfo, setCountryInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedCountry) {
      setLoading(true);
      setError(null);
      getCountryInfo(selectedCountry)
        .then((info) => {
          setCountryInfo(info);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching country info:", error);
          setError(
            "Unable to fetch country information. Please try again later."
          );
          setLoading(false);
        });
    }
  }, [selectedCountry]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-8 text-indigo-800 drop-shadow-lg">
          Global Culture Explorer
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3 bg-white rounded-xl shadow-lg overflow-hidden">
            <Map setSelectedCountry={setSelectedCountry} />
          </div>
          <div className="w-full lg:w-1/3">
            {loading ? (
              <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
              </div>
            ) : error ? (
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <p className="text-red-500 text-center">{error}</p>
              </div>
            ) : (
              <CountryInfo info={countryInfo} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
