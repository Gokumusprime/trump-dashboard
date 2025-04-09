import React from "react";

interface TrumpQuoteProps {
  title: string;
  pubDate: string;
  link: string;
  description: string;
  index: number;
}

const TrumpQuote: React.FC<TrumpQuoteProps> = ({
  title,
  link,
  pubDate,
  description,
}) => {
  const extractTextFromAnchor = (html: string) => {
    const match = html.match(/<a[^>]*>([^<]+)<\/a>/);
    return match ? match[1] : html;
  };

  const extractedDescription = extractTextFromAnchor(description);

  return (
    <div className="chat chat-start">
      <div className="chat-bubble ml-4 p-5 rounded-2xl!">
        <h1 className="font-bold chat-header text-sm mb-2">{title}</h1>
        <p className="chat-date mb-2">
          <i>{pubDate}</i>
        </p>
        <p className="chat-news--description mb-2">{extractedDescription}</p>
        <div className="chat-footer mb-2">
          <a
            className="mt-1 btn btn-primary"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            More Info
          </a>
        </div>
      </div>
    </div>
  );
};

export default TrumpQuote;
