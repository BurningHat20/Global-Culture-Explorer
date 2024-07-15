import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Card } from "./ui/card";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const Map = ({ selectedCountries, setSelectedCountries }) => {
  const handleCountryClick = (countryName) => {
    if (selectedCountries.includes(countryName)) {
      setSelectedCountries(selectedCountries.filter((c) => c !== countryName));
    } else {
      setSelectedCountries([...selectedCountries, countryName]);
    }
  };

  return (
    <Card className="w-full h-[70vh] overflow-hidden">
      <ComposableMap projection="geoMercator" projectionConfig={{ scale: 100 }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onClick={() => handleCountryClick(geo.properties.name)}
                style={{
                  default: {
                    fill: selectedCountries.includes(geo.properties.name)
                      ? "hsl(var(--primary))"
                      : "hsl(var(--muted))",
                    outline: "none",
                  },
                  hover: {
                    fill: "hsl(var(--primary) / 0.8)",
                    outline: "none",
                  },
                  pressed: {
                    fill: "hsl(var(--primary))",
                    outline: "none",
                  },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </Card>
  );
};

export default Map;
