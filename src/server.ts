import app from "./app";
import config from "./config";
import { initDB } from "./db"


initDB();

// Start server only when not on Vercel (local dev)
if (!process.env.VERCEL) {
  app.listen(config.port, () => {
    console.log(`APP LISTENING ON PORT ${config.port}`);
  });
}

// Export for Vercel serverless
export default app;