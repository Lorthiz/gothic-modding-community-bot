import * as dotenv from 'dotenv'

dotenv.config()

interface EnvConfig {
    botToken: string;
    botPrefix: string
}

export const envConfig: EnvConfig = {
    botToken: process.env.BOT_TOKEN || "",
    botPrefix: process.env.BOT_PREFIX || "!"
}