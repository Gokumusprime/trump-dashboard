"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import xml2js from "xml2js";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TrumpQuote from "./trumpQuote";

interface Quote {
  title: string;
  pubDate: string;
  link: string;
  description: string;
}

const TrumpQuotesList: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuotes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/trump-quotes",
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Content-Type": "application/xml",
          },
          responseType: "text",
        }
      );

      const parser = new xml2js.Parser();
      parser.parseString(
        response.data,
        (err: unknown, result: { rss: { channel: { item: unknown[] }[] } }) => {
          if (err) {
            setError(`Error parsing XML: ${(err as Error).message}`);
            setLoading(false);
            return;
          }

          const items = result.rss.channel[0].item as {
            title: string[];
            link: string[];
            pubDate: string[];
            description: string[];
          }[];

          const newQuotes = items.map(
            (item): Quote => ({
              title: item.title[0],
              link: item.link[0],
              pubDate: item.pubDate[0],
              description: item.description[0],
            })
          );

          // Only update state after data is fully processed
          setQuotes((prevQuotes) => {
            // Retain previous quotes if newQuotes are empty
            return newQuotes.length > 0 ? newQuotes : prevQuotes;
          });
          setLoading(false);
        }
      );
    } catch (err: unknown) {
      setError(`Error: ${(err as Error).message}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
    const interval = setInterval(fetchQuotes, 60000); // Fetch new quotes every 60 seconds

    return () => clearInterval(interval);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 500,
    cssEase: "ease-in-out",
    waitForAnimate: true,
    arrows: false,
  };

  return (
    <div className="card mx-4 sm:mx-0 bg-base-100 shadow-sm transition-all duration-300 break-inside-avoid">
      <div className="card-body">
        <h3 className="inline-block sm:display-block mb-2 sm:mb-3 text-center sm:text-left card-title text-2xl w-full">
          Trump in the News
        </h3>
        <div className="grid grid-cols-3 chat">
          <div className="col-span-1 chat-image">
            <img src="https://www.paulmitchellkelly.com/wp-content/uploads/2018/11/Trump_run.gif" />
          </div>
          {loading && quotes.length === 0 ? (
            <div className="text-sm col-span-2">Loading...</div>
          ) : error ? (
            <div className="text-red-500 text-sm col-span-2">{error}</div>
          ) : (
            <Slider className="col-span-2" {...settings}>
              {quotes.map((quote, index) => (
                <TrumpQuote
                  key={index}
                  index={index}
                  title={quote.title}
                  link={quote.link}
                  pubDate={quote.pubDate}
                  description={quote.description}
                />
              ))}
            </Slider>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrumpQuotesList;
