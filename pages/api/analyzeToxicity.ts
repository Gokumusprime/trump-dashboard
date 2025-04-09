import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text } = req.body;

  if (!text || typeof text !== "string" || text.length > 3000) {
    return res.status(400).json({ error: "Invalid text. Must be a non-empty string with a maximum length of 3000 characters." });
  }

  try {
    const requestBody = {
      comment: { text },
      languages: ["en"],
      requestedAttributes: { TOXICITY: {} },
    };

    const response = await fetch(
      "https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=AIzaSyAlIT4JgXfAdSlRFpRqSKWdGUDpW6qF1v4",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error from Perspective API:", errorData);
      return res.status(response.status).json({ error: "Perspective API error", details: errorData });
    }

    const data = await response.json();
    const score = data.attributeScores?.TOXICITY?.summaryScore?.value || null;

    res.status(200).json({ score });
  } catch (error) {
    console.error("Error analyzing toxicity:", error);
    const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
    res.status(500).json({ error: "Failed to analyze toxicity", details: errorMessage });
  }
}