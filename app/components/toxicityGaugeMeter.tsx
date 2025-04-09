"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { oklch, formatHex } from "culori";

// Dynamically import the GaugeComponent and memoize it
const GaugeComponent = dynamic(() => import("react-gauge-component"), {
  ssr: false,
});

const ToxicityGaugeMeter: React.FC = () => {
  const [colors, setColors] = useState<{
    successColor: string | undefined;
    errorBadColor: string | undefined;
    neutralColor: string | undefined;
    warningColor: string | undefined;
  }>({
    successColor: "#00FF00", // Default fallback
    errorBadColor: "#FF0000", // Default fallback
    neutralColor: "#808080", // Default fallback
    warningColor: "#FFFF00", // Default fallback
  });

  const [toxicityScore, setToxicityScore] = useState<number | null>(null);

  const fetchColors = () => {
    const root = document.documentElement;

    // Fetch the new colors
    const successColorComputed = getComputedStyle(root)
      .getPropertyValue("--color-success")
      .trim();
    const errorBadColorComputed = getComputedStyle(root)
      .getPropertyValue("--color-error")
      .trim();
    const neutralColorComputed = getComputedStyle(root)
      .getPropertyValue("--color-neutral")
      .trim();
    const warningColorComputed = getComputedStyle(root)
      .getPropertyValue("--color-warning")
      .trim();

    // Convert the colors to hex if needed and apply fallback if undefined or empty
    const successColorHex =
      successColorComputed && successColorComputed.startsWith("oklch")
        ? formatHex(oklch(successColorComputed))
        : successColorComputed || "#00FF00"; // Default fallback

    const errorBadColorHex =
      errorBadColorComputed && errorBadColorComputed.startsWith("oklch")
        ? formatHex(oklch(errorBadColorComputed))
        : errorBadColorComputed || "#FF0000"; // Default fallback

    const neutralColorHex =
      neutralColorComputed && neutralColorComputed.startsWith("oklch")
        ? formatHex(oklch(neutralColorComputed))
        : neutralColorComputed || "#808080"; // Default fallback

    const warningColorHex =
      warningColorComputed && warningColorComputed.startsWith("oklch")
        ? formatHex(oklch(warningColorComputed))
        : warningColorComputed || "#FFFF00"; // Default fallback

    // Update the state with the new colors
    setColors({
      successColor: successColorHex,
      errorBadColor: errorBadColorHex,
      neutralColor: neutralColorHex,
      warningColor: warningColorHex,
    });
  };

  const analyzeToxicity = async (text: string) => {
    try {
      const response = await fetch("/api/analyzeToxicity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze toxicity");
      }

      const data = await response.json();
      const score = data.score || null;
      setToxicityScore(score);
    } catch (error) {
      console.error("Error analyzing toxicity:", error);
    }
  };

  useEffect(() => {
    // Function to grab the current text from the DOM
    const fetchTextAndAnalyze = () => {
      const element = document.querySelector(
        ".slick-slide.slick-active.slick-current .chat-news--description"
      );
      const text = element?.textContent?.trim() || "";
      if (text) {
        analyzeToxicity(text);
      }
    };

    // Run the function every 2 seconds
    const intervalId = setInterval(fetchTextAndAnalyze, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    // Function to update colors when the data-theme attribute changes
    const updateColors = () => {
      fetchColors();
    };

    // Create a MutationObserver to watch for changes to the data-theme attribute
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-theme"
        ) {
          updateColors();
        }
      });
    });

    // Observe the <html> element for changes to the data-theme attribute
    const root = document.documentElement;
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // Initial color computation
    fetchColors();

    // Cleanup the observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  // Dynamically generate the arc configuration
  const arcConfig = {
    subArcs: [
      {
        limit: 20,
        color: colors.successColor,
        showTick: true,
      },
      {
        limit: 40,
        color: colors.neutralColor,
        showTick: true,
      },
      {
        limit: 60,
        color: colors.warningColor,
        showTick: true,
      },
      {
        limit: 100,
        color: colors.errorBadColor,
        showTick: true,
      },
    ],
  };

  return (
    <div className="card mx-4 sm:mx-0 bg-base-100 shadow-sm transition-all duration-300 max-h-[25rem] break-inside-avoid">
      <div className="card-body">
        <h3 className="inline-block sm:display-block mb-2 sm:mb-3 text-center sm:text-left card-title text-2xl w-full">
          Current Trump Media Toxicity
        </h3>
        <GaugeComponent
          className="w-[100%] sm:w-[40em] m-auto"
          type="semicircle"
          arc={arcConfig} // Dynamically generated arc configuration
          value={
            toxicityScore !== null
              ? (() => {
                  let adjustedScore = toxicityScore;

                  if (adjustedScore < 100) {
                    adjustedScore = adjustedScore * 1000;
                  }

                  if (adjustedScore >= 100 && adjustedScore !== 0) {
                    adjustedScore = 100;
                  }

                  return adjustedScore;
                })()
              : 0 // Default value if toxicityScore is null
          }
          pointer={{ type: "arrow", elastic: true }}
        />
      </div>
    </div>
  );
};

export default ToxicityGaugeMeter;
