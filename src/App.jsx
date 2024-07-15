import React, { useState, useEffect } from "react";
import Map from "./components/Map";
import CountryInfo from "./components/CountryInfo";
import SearchBar from "./components/SearchBar";
import ComparisonModal from "./components/ComparisonModal";
import Quiz from "./components/Quiz";
import FavoritesList from "./components/FavoritesList";
import { getCountryInfo } from "./utils/geminiApi";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { ScrollArea } from "./components/ui/scroll-area";
import { Loader2 } from "lucide-react";
import { FaRandom, FaGamepad, FaCompressAlt, FaGlobe } from "react-icons/fa";

function App() {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [countryInfo, setCountryInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (selectedCountries.length > 0) {
      fetchCountryInfo(selectedCountries[selectedCountries.length - 1]);
    }
  }, [selectedCountries]);

  const fetchCountryInfo = async (country) => {
    setLoading(true);
    setError(null);
    try {
      const info = await getCountryInfo(country);
      setCountryInfo((prevInfo) => ({ ...prevInfo, [country]: info }));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching country info:", error);
      setError("Unable to fetch country information. Please try again later.");
      setLoading(false);
    }
  };

  const handleSearch = (country) => {
    if (!selectedCountries.includes(country)) {
      setSelectedCountries((prevSelected) => [...prevSelected, country]);
    }
  };

  const handleCompare = () => {
    if (selectedCountries.length > 1) {
      setIsComparisonModalOpen(true);
    }
  };

  const handleRandomCountry = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const countries = await response.json();
      const randomCountry =
        countries[Math.floor(Math.random() * countries.length)].name.common;
      if (!selectedCountries.includes(randomCountry)) {
        setSelectedCountries((prevSelected) => [
          ...prevSelected,
          randomCountry,
        ]);
      }
    } catch (error) {
      console.error("Error fetching random country:", error);
      setError("Unable to fetch a random country. Please try again later.");
    }
  };

  const toggleFavorite = (country) => {
    if (countryInfo[country]) {
      setFavorites((prevFavorites) => {
        if (prevFavorites.some((f) => f.country === country)) {
          return prevFavorites.filter((f) => f.country !== country);
        } else {
          return [...prevFavorites, countryInfo[country]];
        }
      });
    }
  };

  const removeSelectedCountry = (country) => {
    setSelectedCountries((prevSelected) =>
      prevSelected.filter((c) => c !== country)
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">
          <FaGlobe className="inline-block mr-2" />
          Global Culture Explorer
        </h1>
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-grow">
                <SearchBar onSearch={handleSearch} />
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" onClick={handleRandomCountry}>
                      <FaRandom className="mr-2" /> Random
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Explore a random country</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" onClick={() => setShowQuiz(true)}>
                      <FaGamepad className="mr-2" /> Quiz
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Test your geography knowledge</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {selectedCountries.length > 1 && (
                <Button onClick={handleCompare}>
                  <FaCompressAlt className="mr-2" /> Compare (
                  {selectedCountries.length})
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2">
            <CardContent className="p-0">
              <Map
                selectedCountries={selectedCountries}
                setSelectedCountries={setSelectedCountries}
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="info">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="info">Country Info</TabsTrigger>
                  <TabsTrigger value="favorites">Favorites</TabsTrigger>
                </TabsList>
                <TabsContent value="info">
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    {loading ? (
                      <div className="flex items-center justify-center h-full">
                        <Loader2 className="h-8 w-8 animate-spin" />
                      </div>
                    ) : error ? (
                      <p className="text-destructive text-center">{error}</p>
                    ) : (
                      selectedCountries.map((country) => (
                        <CountryInfo
                          key={country}
                          info={countryInfo[country]}
                          onRemove={() => removeSelectedCountry(country)}
                          onToggleFavorite={() => toggleFavorite(country)}
                          isFavorite={favorites.some(
                            (f) => f.country === country
                          )}
                        />
                      ))
                    )}
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="favorites">
                  <FavoritesList
                    favorites={favorites}
                    setSelectedCountries={setSelectedCountries}
                    onRemoveFavorite={toggleFavorite}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
      <ComparisonModal
        countries={selectedCountries
          .map((country) => countryInfo[country])
          .filter(Boolean)} // This will remove any undefined or null values
        open={isComparisonModalOpen}
        onClose={() => setIsComparisonModalOpen(false)}
      />
      {showQuiz && <Quiz onClose={() => setShowQuiz(false)} />}
    </div>
  );
}

export default App;
