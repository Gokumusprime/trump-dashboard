import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/dow-jones",
        destination:
          "https://financialmodelingprep.com/stable/quote?symbol=^DJI&apikey=WdXEeu3b1Q7XC8WInnDcScEdyBfafLo8",
      },
      {
        source: "/api/trump-quotes",
        destination:
          "https://news.google.com/rss/search?q=Donald+Trump&hl=en-US&gl=US&ceid=US:en",
      },
      {
        source: "/api/egg-prices",
        destination:
          "https://api.stlouisfed.org/fred/series/observations?series_id=APU0000708111&api_key=76bd221d9d0ad63aabb098ace9081e61&file_type=json",
      },
    ];
  },
};

export default nextConfig;