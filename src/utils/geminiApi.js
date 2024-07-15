import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = 'AIzaSyA4VOrsZmhCSpqNv-61Fc51zNnCvUaC9Hc'; // Replace with your actual API key
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getCountryInfo(country) {
  const prompt = `Provide information about ${country} in the following format:
  Capital:
  Population:
  Language(s):
  Currency:
  Famous Landmark:
  Traditional Dish:
  National Holiday:`;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Parse the markdown-like text into an object
      const lines = text.split('\n').filter(line => line.trim() !== '');
      const infoObject = {};
      let currentKey = '';
      
      lines.forEach(line => {
        if (line.startsWith('##')) {
          infoObject.country = line.replace('##', '').trim();
        } else if (line.includes(':**')) {
          const [key, value] = line.split(':**');
          currentKey = key.trim().replace('**', '');
          // Handle the "Language(s)" key specifically
          if (currentKey === "Language(s)") {
            currentKey = "Languages";
          }
          infoObject[currentKey] = value.trim();
        } else if (currentKey) {
          infoObject[currentKey] += ' ' + line.trim();
        }
      });

      return infoObject;
    } catch (error) {
      console.error(`Attempt ${attempt + 1} failed:`, error);
      if (attempt === MAX_RETRIES - 1) {
        throw error; // Throw on last attempt
      }
      if (error.message.includes("503") || error.message.includes("overloaded")) {
        await sleep(RETRY_DELAY);
      } else {
        throw error; // Don't retry for other types of errors
      }
    }
  }
}