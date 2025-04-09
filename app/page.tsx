import NavBar from "./components/navBar";
import DowTicker from "./components/dowTicker";
import EggGraph from "./components/eggGraph";
import TrumpRemainderCount from "./components/trumpRemainderCount";
import TrumpQuotes from "./components/trumpQuotesList";
import ToxicityGaugeMeter from "./components/toxicityGaugeMeter";
import { ThemeList } from "./themes/themeList";

export default function Home() {
  return (
    <>
      <nav className="mb-4">
        <NavBar ThemeList={ThemeList} />
      </nav>
      <main className="columns-1 xl:columns-2 gap-4 space-y-4">
        <TrumpRemainderCount />
        <EggGraph />
        <DowTicker />
        <ToxicityGaugeMeter />
        <TrumpQuotes />
      </main>
    </>
  );
}
