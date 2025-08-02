// Load environment variables first, before any other imports
import * as dotenv from 'dotenv';
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['SLACK_BOT_TOKEN', 'SLACK_APP_TOKEN', 'SLACK_SIGNING_SECRET'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar] || process.env[envVar]!.trim() === '') {
    console.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

import { App, LogLevel } from '@slack/bolt';
import registerListeners from './listeners';

/** Initialization */
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  logLevel: LogLevel.DEBUG,
});

/** Register Listeners */
registerListeners(app);

/** Start Bolt App */
(async () => {
  try {
    await app.start(process.env.PORT || 3000);
    console.log('⚡️ Bolt app is running! ⚡️');
  } catch (error) {
    console.error('Unable to start App', error);
  }
})();