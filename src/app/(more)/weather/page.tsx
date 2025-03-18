"use client";

import Header from "@/common/Header";
import Button from "@/components/button";
import Input from "@/components/input";
import React, { useState } from "react";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
  sys: {
    country: string;
  };
}

const weatherIcons: { [key: string]: string } = {
  "01": "☀️", // clear sky
  "02": "⛅️", // few clouds
  "03": "☁️", // scattered clouds
  "04": "☁️", // broken clouds
  "09": "🌧️", // shower rain
  "10": "🌦️", // rain
  "11": "⚡️", // thunderstorm
  "13": "❄️", // snow
  "50": "🌫️", // mist
};

const Weather = () => {
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`/api/weather?q=${location}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const text = await response.text();
      if (!text) {
        throw new Error("Empty response from server");
      }

      const data = JSON.parse(text);
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Failed to fetch weather data");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!location.trim()) {
      setError("Please enter a location");
      return;
    }
    fetchWeather();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const getWeatherIcon = (iconCode: string) => {
    const code = iconCode.substring(0, 2);
    return weatherIcons[code] || "❓";
  };

  return (
    <div
      className="flex flex-col rounded-2xl h-full p-2"
      suppressHydrationWarning
    >
      <Header title="Weather" />

      <p className="ms-2">
        Weather <span className="text-orange-200">Finder</span>
      </p>

      <div className="flex items-center gap-2">
        <div className="w-full">
          <Input
            placeholder="Enter Location"
            type="text"
            className="w-full"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={handleKeyPress}
            error={error}
          />
        </div>

        <div className="flex items-center justify-center ms-1 p-2">
          <Button
            variant="primary"
            className="text-white  px-4 py-2 rounded-md disabled:opacity-50"
            onClick={handleSearch}
            disabled={loading}
          >
            Find
          </Button>
        </div>
      </div>

      {weather && (
        <div className="mt-4 p-4 rounded-lg shadow-md relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100/50 to-gray-200/50 opacity-50"></div>

            <div className="absolute inset-0">
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="absolute text-4xl animate-float"
                  style={{
                    left: `${(index * 15 + 10) % 100}%`,
                    top: `${(index * 20 + 5) % 100}%`,
                    animationDelay: `${index * 0.5}s`,
                    transform: `rotate(${index * 45}deg)`,
                  }}
                >
                  {getWeatherIcon(weather.weather[0].icon)}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-transparent backdrop-blur-sm p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">
                  {weather.name}, {weather.sys.country}
                </h2>
                <p className="text-gray-600 capitalize">
                  {weather.weather[0].description}
                </p>
              </div>
              <div className="text-4xl">
                {getWeatherIcon(weather.weather[0].icon)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-3xl font-bold">
                  {Math.round(weather.main.temp)}°C
                </p>
                <p className="text-sm text-gray-500">
                  Feels like {Math.round(weather.main.feels_like)}°C
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Humidity</span>
                  <span className="font-medium">{weather.main.humidity}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pressure</span>
                  <span className="font-medium">
                    {weather.main.pressure} hPa
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Wind</span>
                  <span className="font-medium">{weather.wind.speed} m/s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
