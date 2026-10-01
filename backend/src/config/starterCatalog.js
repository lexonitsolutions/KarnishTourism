const { run, get } = require("./database");

const VERSION = "starter-catalog-v1";
const now = () => new Date().toISOString();
const records = [
  ["destination-dubai","destinations","Dubai","Published",{country:"United Arab Emirates",type:"International",packages:1}],
  ["destination-bali","destinations","Bali","Published",{country:"Indonesia",type:"International",packages:1}],
  ["destination-maldives","destinations","Maldives","Published",{country:"Maldives",type:"International",packages:1}],
  ["destination-kashmir","destinations","Kashmir","Published",{country:"India",type:"Domestic",packages:1}],
  ["destination-kerala","destinations","Kerala","Published",{country:"India",type:"Domestic",packages:1}],
  ["destination-goa","destinations","Goa","Published",{country:"India",type:"Domestic",packages:1}],
  ["package-dubai","packages","Dubai Signature Journey","Published",{destination:"Dubai",type:"International",price:67999,duration:"6 days"}],
  ["package-bali","packages","Bali Signature Journey","Published",{destination:"Bali",type:"International",price:63999,duration:"7 days"}],
  ["package-maldives","packages","Maldives Signature Journey","Published",{destination:"Maldives",type:"International",price:87999,duration:"7 days"}],
  ["package-kashmir","packages","Kashmir Signature Journey","Published",{destination:"Kashmir",type:"Domestic",price:46999,duration:"5 days"}],
  ["package-kerala","packages","Kerala Signature Journey","Published",{destination:"Kerala",type:"Domestic",price:43999,duration:"6 days"}],
  ["package-goa","packages","Goa Signature Journey","Published",{destination:"Goa",type:"Domestic",price:36999,duration:"7 days"}],
  ["activity-vr-park","activities","VR Park Dubai","Published",{destination:"Dubai",category:"Theme Parks",price:"On request"}],
  ["activity-helicopter","activities","Dubai Helicopter Adventure","Published",{destination:"Dubai",category:"Adventure Tours",price:"On request"}],
  ["activity-ain-dubai","activities","Ain Dubai Tickets","Published",{destination:"Dubai",category:"Theme Parks",price:"AED 145"}],
  ["visa-uae","visas","UAE (Dubai) Tourist & Visit Visa","Published",{country:"United Arab Emirates",processingTime:"24–48 Hours",fee:"₹6,899"}],
  ["visa-schengen","visas","Schengen Tourist & Business Visa","Published",{country:"Schengen Europe",processingTime:"10–15 Working Days",fee:"₹13,500"}],
  ["visa-usa","visas","USA B1/B2 Visitor Visa","Published",{country:"United States",processingTime:"Appointment based",fee:"₹19,500"}],
  ["offer-summer","offers","International Holiday Saving","Active",{code:"SUMMER2026",discount:"₹5,000",expiry:"30 April 2027"}],
  ["offer-dubai","offers","Dubai Desert Safari Included","Active",{code:"DUBAIFREE",discount:"Free activity",expiry:"2027 departures"}],
  ["offer-domestic","offers","Domestic Family Special","Active",{code:"FAMILY15",discount:"15%",expiry:"Limited period"}],
];

async function seedStarterCatalog() {
  await run("CREATE TABLE IF NOT EXISTS system_meta (key TEXT PRIMARY KEY,value TEXT NOT NULL)");
  const seeded = await get("SELECT value FROM system_meta WHERE key='catalog_version'");
  if (seeded?.value === VERSION) return;
  const types = ["packages","destinations","activities","visas","offers"];
  await run(`DELETE FROM resources WHERE resource_type IN (${types.map(() => "?").join(",")})`, types);
  for (const [id,type,title,status,data] of records) {
    const timestamp = now();
    await run("INSERT INTO resources(id,resource_type,title,status,data,created_at,updated_at) VALUES(?,?,?,?,?,?,?)", [id,type,title,status,JSON.stringify(data),timestamp,timestamp]);
  }
  await run("INSERT OR REPLACE INTO system_meta(key,value) VALUES('catalog_version',?)", [VERSION]);
}

module.exports = { seedStarterCatalog };
