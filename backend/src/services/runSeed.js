require("dotenv").config({ path: require("path").join(__dirname, "../../.env") });
const { connectDatabase } = require("../config/database");
const { ensureDestinations } = require("./catalogSeed");
const { seedTestAccounts } = require("./seedUsers");

(async () => {
  try {
    await connectDatabase();
    await ensureDestinations();
    await seedTestAccounts();
    console.log("[Migration] Seed and migration completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("[Migration] Error:", err.message);
    process.exit(1);
  }
})();
