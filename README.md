# DiscordHandler: A Library for Discord.js Projects

### Rewritten by `GoatedDevelopment` | Credit to `NotUnderCtrl`

DiscordHandler is an easy-to-use JavaScript library that simplifies the process of handling commands, events, buttons, modals, and validations in your Discord.js projects.

Discord.js version supported: `v14`

## Documentation

You can find the full documentation [here](https://djs-commander.underctrl.io)

For a complete list of changes and version history, see the [CHANGELOG.md](CHANGELOG.md).

## Installation

To install DiscordHandler, simply run the following command:

For npm:

```bash
npm install goated-discord-handler
```

For yarn:

```yarn
yarn add goated-discord-handler
```

## Usage

```js
// index.js
const { Client, IntentsBitField } = require("discord.js");
const { DiscordHandler } = require("goated-discord-handler");
const { Logger } = require("term-logger"); // Fancy Colourful Console Logger
const path = require("path");

const client = new Client({
  intents: [IntentsBitField.Flags.Guilds], // Your bot's intents
});

new DiscordHandler({
  client, // Discord.js client object
  token: 'YOUR_TOKEN_HERE',
  commandsPath: path.join(__dirname, "commands"), // The commands folder
  buttonsPath: path.join(__dirname, "buttons"), // The buttons folder
  modalsPath: path.join(__dirname, "modals"), // The modals folder
  eventsPath: path.join(__dirname, "events"), // The events folder
  validationsPath: path.join(__dirname, "validations"), // Only works if commandsPath is provided
  testServer: "YOUR_TEST_SERVER_ID", // Optional: Register commands to a specific guild for testing
  logger: Logger, // Changes the console output to match the specified logger configuration (if not provided logging will go through console.log)
  logInteractions: true, // If true, will log interactions made with the bot in your console
  refreshCommands: true, // If true, adds a /app refresh_commands subcommand
  toggleCommands: true, // If true, adds /app enable and /app disable subcommands
});
```

## Features

- **Slash Commands**: Automatic command registration and handling
- **Button Interactions**: Handle button clicks with custom IDs
- **Modal Submissions**: Process modal form submissions
- **Event Handling**: Organize and handle Discord.js events
- **Command Validations**: Add custom validation logic
- **Built-in Admin Commands**: `/app` command for managing commands
- **Flexible File Structure**: Support for nested directories
- **Logging Support**: Custom logger integration
- **Test Server Support**: Register commands to specific guilds for testing

## File Structure

### Commands

DiscordHandler allows a very flexible file structure for your commands directory. Here's an example of what your file structure could look like:

```shell
commands/
├── command1.js
├── command2.js
└── category/
	├── command3.js
	└── command4.js
```

Any file inside the commands directory will be considered a command file, so make sure it properly exports an object. Like this:

```js
// commands/misc/ping.js
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pong!"),

  run: ({ interaction, client, handler }) => {
    interaction.reply(`Pong! ${client.ws.ping}ms`);
  },

  // deleted: true, // Deletes the command from Discord (if you passed in a "testServer" property it'll delete from the guild and not globally)
};
```

**Parameters:**
- `interaction` is the interaction object
- `client` is the discord.js Client instance
- `handler` is the DiscordHandler instance. You can use this to get access to properties such as `commands`

---

### Buttons

DiscordHandler gives you the ability to keep your buttons as separate interactions. Your file structure would look like this:

```shell
buttons/
├── button1.js
├── button2.js
└── category/
| ├── button3.js
```

Make sure each file exports an object with a `customId` and `run` function:

```js
// buttons/reply.js
module.exports = {
  customId: "reply",
  run: ({ interaction, client, handler }) => {
    interaction.reply("Button clicked!");
  },
  
  // deleted: true, // Skip registering this button
};
```

**Parameters:**
- `interaction` is the interaction object
- `client` is the discord.js Client instance
- `handler` is the DiscordHandler instance

---

### Modals

DiscordHandler supports modal form submissions. Your file structure would look like this:

```shell
modals/
├── modal1.js
├── modal2.js
└── category/
| ├── modal3.js
```

Make sure each file exports an object with a `customId` and `run` function:

```js
// modals/feedback.js
module.exports = {
  customId: "feedback_form",
  run: ({ interaction, client, handler }) => {
    const feedback = interaction.fields.getTextInputValue('feedback');
    interaction.reply(`Thank you for your feedback: ${feedback}`);
  },
  
  // deleted: true, // Skip registering this modal
};
```

**Parameters:**
- `interaction` is the interaction object
- `client` is the discord.js Client instance
- `handler` is the DiscordHandler instance

---

### Events

DiscordHandler assumes a specific file structure for your events. Here's an example of what your file structure could look like:

```shell
events/
├── ready/
|	├── console-log.js
|	└── webhook.js
|
└── messageCreate/
	├── auto-mod/
	|	├── delete-swear-words.js
	|	└── anti-raid.js
	|
	└── chat-bot.js
```

Make sure each file exports a default function. Like this:

```js
// events/ready/console-log.js
module.exports = (argument, client, handler) => {
  console.log(`${client.user.tag} is online.`);
};
```

**Parameters:**
- `argument` is the argument you receive from the event being triggered (you can name this whatever you want). For example, the `messageCreate` event will give you an argument of the message object
- `client` is the discord.js Client instance
- `handler` is the DiscordHandler instance

---

### Validations

DiscordHandler allows you to organize your validation files however you want to. Functions inside these files are executed in ascending order so you can prioritize your validations however you see fit. Here's an example of what your file structure could look like:

```shell
validations/
└── dev-only.js
```

Make sure each file exports a default function. Like this:

```js
// validations/dev-only.js
module.exports = (interaction, commandObj, handler, client) => {
  if (commandObj.devOnly) {
    if (interaction.member.id !== "DEVELOPER_ID") {
      interaction.reply("This command is for the developer only");
      return true; // This must be added to stop the command from being executed.
    }
  }
};
```

**Parameters:**
- `interaction` is the interaction object
- `commandObj` is the command object exported from the command file itself. Properties such as `name`, `description` and `options` are all available within
- `handler` is the DiscordHandler instance
- `client` is the Client instance

It's important to return `true` (or any truthy value) if you don't want the command to be executed (this also ensures the next validation that was queued up is not executed).

## Built-in Admin Commands

When you enable `refreshCommands` and/or `toggleCommands`, DiscordHandler automatically creates an `/app` command with the following subcommands:

### `/app refresh_commands`
Reloads all commands and functions. Useful for development.

### `/app enable <command>`
Enables a previously disabled command.

### `/app disable <command>`
Disables a command (resets when the bot is restarted).

**Note:** These commands require the `MANAGE_SERVER` permission.

## Configuration Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `client` | Discord.js Client | Yes | Your Discord.js client instance |
| `token` | String | Yes | Your bot's token |
| `commandsPath` | String | No | Path to your commands directory |
| `buttonsPath` | String | No | Path to your buttons directory |
| `modalsPath` | String | No | Path to your modals directory |
| `eventsPath` | String | No | Path to your events directory |
| `validationsPath` | String | No | Path to your validations directory |
| `testServer` | String | No | Guild ID for testing commands |
| `logger` | Object | No | Custom logger instance |
| `logInteractions` | Boolean | No | Enable interaction logging (default: false) |
| `refreshCommands` | Boolean | No | Enable /app refresh_commands (default: false) |
| `toggleCommands` | Boolean | No | Enable /app enable/disable (default: false) |

## Error Handling

DiscordHandler includes comprehensive error handling:

- Validates required properties on initialization
- Checks for proper file exports
- Handles missing or invalid command structures
- Provides clear error messages for debugging

## Contributing

Feel free to contribute to this project by submitting issues or pull requests.

## License

This project is licensed under the ISC License.