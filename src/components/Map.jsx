import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const Map = ({ setSelectedCountry }) => {
  return (
    <div className="w-full h-[70vh] bg-indigo-50 rounded-xl overflow-hidden">
      <ComposableMap projection="geoMercator" projectionConfig={{ scale: 100 }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onClick={() => setSelectedCountry(geo.properties.name)}
                style={{
                  default: {
                    fill: "#E5E7EB",
                    outline: "none",
                  },
                  hover: {
                    fill: "#6366F1",
                    outline: "none",
                  },
                  pressed: {
                    fill: "#4F46E5",
                    outline: "none",
                  },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default Map;
