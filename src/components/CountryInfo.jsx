// src/components/CountryInfo.jsx
import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { FaStar, FaTimes } from "react-icons/fa";

const CountryInfo = ({ info, onRemove, onToggleFavorite, isFavorite }) => {
  if (!info) return null;

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-2xl font-bold">{info.country}</CardTitle>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleFavorite}
            className={isFavorite ? "text-yellow-400" : "text-gray-400"}
          >
            <FaStar />
          </Button>
          <Button variant="ghost" size="icon" onClick={onRemove}>
            <FaTimes />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p>
          <strong>Capital:</strong> {info.Capital}
        </p>
        <p>
          <strong>Population:</strong> {info.Population}
        </p>
        <p>
          <strong>Languages:</strong> {info.Languages}
        </p>
        <p>
          <strong>Currency:</strong> {info.Currency}
        </p>
        <p>
          <strong>Famous Landmark:</strong> {info["Famous Landmark"]}
        </p>
        <p>
          <strong>Traditional Dish:</strong> {info["Traditional Dish"]}
        </p>
        <p>
          <strong>National Holiday:</strong> {info["National Holiday"]}
        </p>
      </CardContent>
    </Card>
  );
};

export default CountryInfo;
