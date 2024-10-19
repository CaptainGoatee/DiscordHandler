
import { Client } from "discord.js";

class DiscordHandler {
  constructor(options: DiscordHandlerOptions);
}

interface DiscordHandlerOptions {
  token: string;
  client: Client;
  prefix?: string;
  eventsPath?: string;
  permissionHandler?: string;
}

export { DiscordHandler };
