import React, { useState, useEffect } from "react";
import { getCountryInfo } from "../utils/geminiApi";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Loader2 } from "lucide-react";

const Quiz = ({ onClose }) => {
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const countries = await response.json();
      const randomCountry =
        countries[Math.floor(Math.random() * countries.length)].name.common;
      const countryInfo = await getCountryInfo(randomCountry);

      const questionTypes = ["capital", "currency", "landmark"];
      const questionType =
        questionTypes[Math.floor(Math.random() * questionTypes.length)];

      let questionText, correctAnswer;
      switch (questionType) {
        case "capital":
          questionText = `What is the capital of ${randomCountry}?`;
          correctAnswer = countryInfo.Capital;
          break;
        case "currency":
          questionText = `What is the currency of ${randomCountry}?`;
          correctAnswer = countryInfo.Currency;
          break;
        case "landmark":
          questionText = `What is a famous landmark in ${randomCountry}?`;
          correctAnswer = countryInfo["Famous Landmark"];
          break;
      }

      const incorrectOptions = countries
        .filter((c) => c.name.common !== randomCountry)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((c) => {
          switch (questionType) {
            case "capital":
              return c.capital?.[0] || "Unknown";
            case "currency":
              return Object.values(c.currencies || {})[0]?.name || "Unknown";
            case "landmark":
              return "Eiffel Tower"; // This is a placeholder. You'd need a proper landmark database for real implementation.
          }
        });

      setQuestion(questionText);
      setOptions(
        [correctAnswer, ...incorrectOptions].sort(() => 0.5 - Math.random())
      );
      setSelectedAnswer(null);
      setResult(null);
      setLoading(false);
    } catch (error) {
      console.error("Error generating question:", error);
      setLoading(false);
    }
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setResult(answer === options[0] ? "Correct!" : "Incorrect. Try again!");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <CardTitle>Geography Quiz</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : question ? (
            <>
              <p className="mb-4">{question}</p>
              <div className="space-y-2">
                {options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    variant={
                      selectedAnswer === option
                        ? result === "Correct!"
                          ? "success"
                          : "destructive"
                        : "secondary"
                    }
                    className="w-full justify-start text-left"
                  >
                    {option}
                  </Button>
                ))}
              </div>
              {result && (
                <p
                  className={`mt-4 ${
                    result === "Correct!" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {result}
                </p>
              )}
            </>
          ) : (
            <p>Error loading question. Please try again.</p>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={generateQuestion} variant="outline">
            Next Question
          </Button>
          <Button onClick={onClose} variant="ghost">
            Close Quiz
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Quiz;
