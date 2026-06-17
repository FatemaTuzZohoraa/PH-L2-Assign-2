import app from "./app.js";
import config from "./config/index.js";
import { initDB } from "./db/index.js"


initDB();

// Start server only when not on Vercel (local dev)
if (!process.env.VERCEL) {
  app.listen(config.port, () => {
    console.log(`APP LISTENING ON PORT ${config.port}`);
  });
}

// Export for Vercel serverless
export default app;