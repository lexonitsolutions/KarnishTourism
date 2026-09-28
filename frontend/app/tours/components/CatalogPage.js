import Image from "next/image";
import CatalogExplorer from "./CatalogExplorer";
import TourSearch from "./TourSearch";
import { departureCities, getDestinations } from "../data";

export default function CatalogPage({ type }) {
  const domestic = type === "domestic";
  const items = getDestinations(type);
  return <main>
    <header className="ktours-catalog-hero"><Image src={domestic ? "/images/destination-02.jpg" : "/images/destination-03.jpg"} alt={domestic ? "Explore India" : "Explore international destinations"} fill sizes="100vw" preload /><div className="ktours-hero-shade" /><div className="container"><div className="ktours-kicker"><span /> {domestic ? "Incredible India" : "The world awaits"}</div><h1>{domestic ? "Discover India, beautifully" : "Explore International Destinations"}</h1><p>{domestic ? "From Himalayan mornings to backwater sunsets—find a holiday that fits your time, budget and travel style." : "Thoughtfully curated international holidays with trusted stays, effortless transfers and attentive support."}</p><TourSearch compact initialType={type} /></div></header>
    {domestic && <section className="ktours-departures"><div className="container"><div><span>Travelling from</span><strong>See prices relevant to your city</strong></div><div>{departureCities.map((city, index) => <button className={index === 0 ? "active" : ""} key={city}>{city}</button>)}</div></div></section>}
    <section className="ktours-section container"><div className="ktours-heading-row"><div><div className="ktours-kicker dark"><span /> {domestic ? "Popular destinations in India" : "Handpicked for you"}</div><h2>{domestic ? "Where will India take you next?" : "Find your next international escape"}</h2><p>{domestic ? "Compare clear prices, durations and inclusions at a glance." : "Filter by region and budget, then explore packages at your own pace."}</p></div></div><CatalogExplorer items={items} type={type} /></section>
    <section className="ktours-catalog-cta"><div className="container"><div><div className="ktours-kicker"><span /> Designed around you</div><h2>Can’t find your perfect holiday?</h2><p>Tell our specialists what you love and we’ll tailor the route, stays and experiences.</p></div><a className="ktours-button ktours-button-light" href="/tours/inquiry">Get a custom quote <i className="ti-arrow-right" /></a></div></section>
  </main>;
}
