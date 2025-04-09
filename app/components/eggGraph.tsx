"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import BarChart from "./barChart";

interface EggData {
  observations: { date: string; value: string }[];
}

const EggGraph: React.FC = () => {
  const [lastDates, setLastDates] = useState<string[]>([]);
  const [lastValues, setLastValues] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchEggValue = async () => {
    try {
      const response = await axios.get<EggData>("/api/egg-prices");
      const observations = response.data.observations;

      if (Array.isArray(observations)) {
        const last24Observations = observations.slice(-12);
        const newDates = last24Observations.map((obs) => obs.date);
        const newValues = last24Observations.map((obs) =>
          parseFloat(obs.value)
        );

        setLastDates(newDates);
        setLastValues(newValues);
      }
    } catch {
      setError("Error fetching data");
    }
  };

  useEffect(() => {
    fetchEggValue();
    const interval = setInterval(fetchEggValue, 240000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card mx-4 sm:mx-0 bg-base-100 shadow-sm transition-all duration-300 break-inside-avoid">
      <div className="card-body">
        <h3 className="inline-block sm:display-block card-title text-2xl">
          Egg Price Observations By Month
        </h3>
        <div className="container mx-auto p-4">
          {error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <BarChart data={lastValues} labels={lastDates} />
          )}
        </div>
      </div>
    </div>
  );
};

export default EggGraph;
