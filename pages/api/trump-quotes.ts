import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    // Fetch data from the external API
    const response = await fetch(
      "https://news.google.com/rss/search?q=Donald+Trump&hl=en-US&gl=US&ceid=US:en"
    );

    // Check if the response is ok, else throw an error
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Get text data
    const data = await response.text();

    // Send the data back to the client
    res.setHeader("Content-Type", "application/rss+xml");
    res.status(200).send(data);
  } catch (error) {
    // Handle any errors
    console.error("Error:", error);
    res.status(500).send("Error fetching data from Google News");
  }
}
