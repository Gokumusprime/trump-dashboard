This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). 


![Trump Dashboard](https://github.com/user-attachments/assets/52339d4b-d606-4de4-90d4-1c9d512a9937)

## Description

This project is a concept dashboard displaying the effects of news media and economy stats that are related to President Trump (I'd use a pun here, but it wouldn't be professional). The dashboard updates in real-time and provides information through small dashboard components.

This includes:
- A component that shows a count down till President Trump is out of office.
- A component that shows the current price of eggs on a monthly basis through a graph.  This updates monthly.
- A component that shows the Down Jones Index value with an arrow pointing down or up once the first difference is measured.  This updates every 4 minutes.
- A component that shows the any current news stream from Google with all media providers.  This only pulls in news that have President Trump's name mentioned.  This updates every 1 minute.
- A component that measures the toxicity of the current news streaming by analyzing the description of each news article and using machine learning to establish a score for toxicity.  This updates around every 2 seconds.
- A theme switching button in the corner to alter the color theme of the page.  Maga colors is a custom theme that is the default.
- This application is also fully responsive.

This dashboard uses API for different components through a proxy page.  I am well aware that some of the api's being used will expose my tokens but I am not bothered by that since these are all free tokens.  They have different call limits but should suffice for the few that use this project.

API Calls:
- Financial Modeling Prep use to obtain the lates dow jones index:  https://financialmodelingprep.com/stable/quote?symbol=^DJI
- Google News to check for the lates news involving President Trump:  https://news.google.com/rss/search?q=Donald+Trump&hl=en-US&gl=US&ceid=US:en
- St. Louis Fed to gather data on egg prices over each month:  https://api.stlouisfed.org/fred/series/observations?series_id=APU0000708111&file_type=json
- Comment Analyzer by Perspective through Google API's to request toxicity scores based on given news text:  https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze

## Purpose and Methods
I designed this project as a prototype for interview demos.  I know that the theme involved here is not ideal so another project will be made with neutral economic data.  I just loved using this theme since I was inspired by the amount of live real data out there and how news about Trump is closely related to how our economy performs.

Functionality:
This project demonstrates the use of React/Next.js with Typescript to modularize components for a dashboard.  This is very similar to our a CMS may use React to use data with components to populate a page.  Most API's being used are client side and I have used one server side for the toxicity component to demonstrate proxy use with both the front end and server side.  Components take advantage of state changes to update regularly while maintaining the previous state till the new state is rendered.  That way no jarring effects are noticed.  There are listeners through useEffect to detect specific markup change before altering state.  This is how the themes button and toxicity component work.  The themes button listens for the data-theme property of the HTML tag to change then re-colors the site.  The toxicity component listen for changes to the news slider and monitoring the active focused article at the given time it fires off to re-evaluate toxicity.  The graph is being created through chart js with data from an API call.

Design:
I am using Tailwind CSS to style the app.  DaisyUI is being used for specific snippets such as the card markup scaffolding for the different components.  Theme updates to the toxicity component were tricky since you need to listen for a new hex value of the chosen theme's stylesheet classes after a new theme is loaded then apply it to the js options for the alert gauge.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
