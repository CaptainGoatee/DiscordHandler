/** @format */

declare module "goated-discord-handler" {
  import { Client, APIApplicationCommand } from "discord.js";
  import { Logger } from "winston";

  interface DiscordHandlerOptions {
    client: Client; // The Discord client instance
    token: string; // The bot token for authentication
    commandsPath?: string; // Optional path for command files
    eventsPath?: string; // Optional path for event files
    validationsPath?: string; // Optional path for validation files
    testServer?: string; // Optional test server ID
    logger?: Logger; // Optional logger instance for logging,
    refreshCommands?: boolean; // Optional Reloader via discord
    toggleCommands?: boolean; // Optional toggle commands via discord
  }

  interface LocalCommand extends APIApplicationCommand {
    deleted?: boolean; // Indicates if the command has been deleted
    [key: string]: any; // Allow additional properties
  }
}
