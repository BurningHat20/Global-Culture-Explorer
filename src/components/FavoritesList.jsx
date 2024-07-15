// src/components/FavoritesList.jsx
import React from "react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { FaStar, FaGlobe } from "react-icons/fa";

const FavoritesList = ({
  favorites,
  setSelectedCountries,
  onRemoveFavorite,
}) => {
  if (favorites.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No favorites yet. Add some countries to your favorites!
      </p>
    );
  }

  const handleFavoriteClick = (country) => {
    setSelectedCountries((prevSelected) => {
      if (prevSelected.includes(country)) {
        return prevSelected;
      }
      return [...prevSelected, country];
    });
  };

  return (
    <ScrollArea className="h-[calc(100vh-300px)]">
      {favorites.map((favorite) => (
        <div
          key={favorite.country}
          className="flex items-center justify-between mb-2 p-2 bg-gray-100 rounded"
        >
          <Button
            variant="ghost"
            className="flex-grow text-left"
            onClick={() => handleFavoriteClick(favorite.country)}
          >
            <FaGlobe className="inline-block mr-2" />
            {favorite.country}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemoveFavorite(favorite.country)}
            className="text-yellow-400"
          >
            <FaStar />
          </Button>
        </div>
      ))}
    </ScrollArea>
  );
};

export default FavoritesList;
