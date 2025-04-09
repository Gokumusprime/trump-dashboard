"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/solid";
import { ArrowTrendingDownIcon } from "@heroicons/react/24/solid";

interface DowData {
  symbol: string;
  price: number;
}

const DowTicker: React.FC = () => {
  const [dowValue, setDowValue] = useState<number | null>(null);
  const [arrowPosition, setArrowPosition] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDowValue = async () => {
    try {
      const response = await axios.get<DowData[]>("/api/dow-jones");
      const dowData = response.data.find((item) => item.symbol === "^DJI");

      if (dowData && dowData.price) {
        const newValue = dowData.price;

        // Use previous state to determine arrow direction
        setDowValue((prevValue) => {
          if (prevValue !== null) {
            setArrowPosition(newValue < prevValue ? "down" : "up");
          }
          return newValue;
        });
      } else {
        setError("Error: Unexpected response format");
      }
      setLoading(false);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          setError(`Error: ${err.response.status} - ${err.response.data}`);
        } else if (err.request) {
          setError("Error: No response received from the server");
        } else {
          setError(`Error: ${err.message}`);
        }
      } else {
        setError("Error: An unexpected error occurred");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDowValue();
    const interval = setInterval(fetchDowValue, 240000); // Update every 4 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card mx-4 sm:mx-0 bg-base-100 shadow-sm transition-all duration-300 break-inside-avoid">
      <div className="card-body">
        <div className="items-center justify-between space-x-4 grid grid-cols-1 grid-rows-2 sm:grid-cols-2 sm:grid-rows-1">
          <h3 className="inline-block mb-2 sm:mb-auto text-center sm:text-left card-title text-2xl">
            Dow Jones Index
          </h3>
          {loading && dowValue === null ? (
            <h3 className="inline-block mb-2 sm:mb-auto text-center sm:text-left card-title text-2xl">
              Loading...
            </h3>
          ) : error ? (
            <h3 className="inline-block mb-2 sm:mb-auto text-center sm:text-left card-title text-2xl text-red-500">
              {error}
            </h3>
          ) : (
            <h3 className="inline-block mb-2 sm:mb-auto text-center sm:text-right card-title text-2xl">
              {dowValue}
              <span className="inline-block ml-1">
                {arrowPosition === "up" ? (
                  <ArrowTrendingUpIcon className="w-6 h-6 text-green-500" />
                ) : arrowPosition === "down" ? (
                  <ArrowTrendingDownIcon className="w-6 h-6 text-red-500" />
                ) : (
                  <svg
                    className="mr-3 size-5 animate-spin text-(--color-primary)"
                    data-slot="icon"
                    fill="none"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                    ></path>
                  </svg>
                )}
              </span>
            </h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default DowTicker;
