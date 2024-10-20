# DiscordHandler: A Library for Discord.js Projects

### Rewritten by `GoatedDevelopment` | Credit to `NotUnderCtrl`

DiscordHandler is an easy-to-use JavaScript library that simplifies the process of handling commands, events, and validations in your Discord.js projects.

Discord.js version supported: `v14`

## Documentation

You can find the full documentation [here](https://djs-commander.underctrl.io)

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
const { Client, IntentsBitField, interaction } = require("discord.js");
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
  buttonsPath: path.join(__dirname, "buttons"), // The commands folder
  eventsPath: path.join(__dirname, "events"), // The events folder
  validationsPath: path.join(__dirname, "validations"), // Only works if commandsPath is provided
  logger: Logger, // Changes the console output to match the specified logger configuration (if not provided logging will go through console.log)
  logInteractions: true, // If true, will log interactions made with the bot in your console.
});
```

## File Structure

### Commands

DiscordHandler allows a very flexible file structure for your commands directory. Here's an example of what your file structure could look like:

```shell
commands/
├── command1.js
├── command2.js
└── category/
	├── command3.js
	└── commands4.js
```

Any file inside the commands directory will be considered a command file, so make sure it properly exports an object. Like this:

```js
// commands/misc/ping.js
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("ping").setDescription("Pong!"),

  run: ({ interaction, client, handler }) => {
    interaction.reply(`Pong! ${client.ws.ping}ms`);
  },

  // deleted: true, // Deletes the command from Discord (if you passed in a "testServer" property it'll delete from the guild and not globally)
};
```

- `interaction` is the interaction object.
- `client` is the discord.js Client instance.
- `handler` is the DiscordHandler instance. You can use this to get access to properties such as `commands`.

---

### Buttons

DiscordHandler gives you the ability to keep your buttons as seperate interactions and treats them as separate interactions. Your file structure would look like this:

```shell
buttons/
├── button1.js
├── button2.js
└── category/
| ├── button3.js
```

Make sure each file exports a fuctions that has a custom ID like this.

```js
// buttons/reply.js
module.exports = {
  customID: "reply",
  run: ({ interaction, client, handler }) => {
    interaction.reply(`Pong! ${client.ws.ping}ms`);
  },
};
```
- `interaction` is the interaction object.
- `client` is the discord.js Client instance.
- `handler` is the DiscordHandler instance. You can use this to get access to properties such as `commands`.
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

- `argument` is the argument you receive from the event being triggered (you can name this whatever you want). For example, the `messageCreate` event will give you an argument of the message object.
- `client` is the discord.js Client instance.
- `handler` is the DiscordHandler instance. You can use this to get access to properties such as `commands`.

---

### Validations

DiscordHandler allows you to organize your validation files however you want to. Functions inside these files are executed in ascending order so you can prioritize your validations however you see fit. Here’s an example of what your file structure could look like:

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

- `interaction` is the interaction object.
- `commandObj` is the command object exported from the command file itself. Properties such as `name`, `description` and `options` are all available within.
- `handler` is the DiscordHandler instance. You can use this to get access to properties such as `commands`.
- `client` is the Client instance. (defined in your main entry point)

It's important to return `true` (or any truthy value) if you don't want the command to be executed (this also ensures the next validation that was queued up is not executed).
