// src/index.js
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {
  enumerable: true,
  configurable: true,
  writable: true,
  value
}) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
var getPaths_exports = {};
__export(getPaths_exports, {
  getFilePaths: () => getFilePaths,
  getFolderPaths: () => getFolderPaths
});
function getFilePaths(directory, nesting) {
  let filePaths = [];
  if (!directory)
    return filePaths;
  const files = fs.readdirSync(directory, { withFileTypes: true });
  for (const file of files) {
    const filePath = path.join(directory, file.name);
    if (file.isFile()) {
      filePaths.push(filePath);
    }
    if (nesting && file.isDirectory()) {
      filePaths = [...filePaths, ...getFilePaths(filePath, true)];
    }
  }
  return filePaths;
}
function getFolderPaths(directory, nesting) {
  let folderPaths = [];
  if (!directory)
    return folderPaths;
  const folders = fs.readdirSync(directory, { withFileTypes: true });
  for (const folder of folders) {
    const folderPath = path.join(directory, folder.name);
    if (folder.isDirectory()) {
      folderPaths.push(folderPath);
      if (nesting) {
        folderPaths = [...folderPaths, ...getFolderPaths(folderPath, true)];
      }
    }
  }
  return folderPaths;
}
var fs;
var path;
var init_getPaths = __esm({
  "src/utils/getPaths.ts"() {
    "use strict";
    fs = require("fs");
    path = require("path");
  }
});
var src_exports = {};
__export(src_exports, {
  DiscordHandler: () => DiscordHandler
});
module.exports = __toCommonJS(src_exports);
init_getPaths();
var { getFilePaths: getFilePaths2 } = (init_getPaths(), __toCommonJS(getPaths_exports));
function buildCommandTree(commandsDir) {
  const commandTree = [];
  if (!commandsDir)
    return [];
  const commandFilePaths = getFilePaths2(commandsDir, true);
  for (const commandFilePath of commandFilePaths) {
    let _a = require(commandFilePath), { data: data2, run, deleted } = _a, rest = __objRest(_a, ["data", "run", "deleted"]);
    if (!data2)
      throw new Error(`File ${commandFilePath} must export "data".`);
    if (!run)
      throw new Error(`File ${commandFilePath} must export a "run" function.`);
    if (!data2.name)
      throw new Error(`File ${commandFilePath} must have a command name.`);
    if (!data2.description)
      throw new Error(
        `File ${commandFilePath} must have a command description.`
      );
    try {
      data2 = data2.toJSON();
    } catch (error) {
    }
    commandTree.push(
      __spreadProps(__spreadValues(__spreadValues({}, data2), rest), {
        deleted,
        run
      })
    );
  }
  return commandTree;
}
function buildButtonsTree(buttonsDir) {
  const buttonTree = [];
  if (!buttonsDir)
    return [];
  const buttonFilePaths = getFilePaths2(buttonsDir, true);
  for (const buttonFilePath of buttonFilePaths) {
    let _a = require(buttonFilePath), { customID, run, deleted } = _a, rest = __objRest(_a, ["customID", "run", "deleted"]);
    if (!customID)
      throw new Error(`File ${buttonFilePath} must export "customID".`);
    if (!run)
      throw new Error(`File ${buttonFilePath} must export a "run" function.`);
    try {
      data = data.toJSON();
    } catch (error) {
    }
    buttonTree.push({
      customID,
      deleted,
      run
    });
  }
  return buttonTree;
}
function getAppCommands(client, guildId) {
  return __async(this, null, function* () {
    let applicationCommands2;
    if (guildId) {
      const guild = yield client.guilds.fetch(guildId);
      applicationCommands2 = guild.commands;
    } else {
      applicationCommands2 = yield client.application.commands;
    }
    yield applicationCommands2.fetch();
    return applicationCommands2;
  });
}
function areCommandsDifferent(existingCommand, localCommand2) {
  var _a, _b;
  if (localCommand2.description !== existingCommand.description || (((_a = localCommand2.options) == null ? void 0 : _a.length) || 0) !== ((_b = existingCommand.options) == null ? void 0 : _b.length)) {
    return true;
  } else {
    return false;
  }
}
function attemptAppLogin(client, token) {
  client.login(token);
}
function registerCommands(_0) {
  return __async(
    this,
    arguments,
    function* ({ client, commands: localCommands, testServer, logger }) {
      const applicationCommands2 = yield getAppCommands(client, testServer);
      for (const localCommand2 of localCommands) {
        const {
          name,
          name_localizations,
          description,
          description_localizations,
          default_member_permissions,
          dm_permission,
          options
        } = localCommand2;
        const existingCommand = applicationCommands2.cache.find(
          (cmd) => cmd.name === name
        );
        let message = `🌐 Loading command "${name}".`;
            if (logger) {
              logger.info(message);
            } else {
              console.log(message);
            }
        // console.log(localCommand2); //DELETE THIS
        if (existingCommand) {
          if (localCommand2.deleted) {
            yield applicationCommands2.delete(existingCommand.id);
            let message = `\u{1F5D1} Deleted command "${name}".`;
            if (logger) {
              logger.info(message);
            } else {
              console.log(message);
            }
            continue;
          }
          if (areCommandsDifferent(existingCommand, localCommand2)) {
            yield applicationCommands2.edit(existingCommand.id, {
              description,
              options
            });
            let message = `\u{1F501} Edited command "${name}".`;
            if (logger) {
              logger.info(message);
            } else {
              console.log(message);
            }
          } else {
            let message = `👍 Command "${name}" is up to date.`;
            if (logger) {
              logger.info(message);
            } else {
              console.log(message);
            }
          }
        } else {
          if (localCommand2.deleted) {
            let message2 = `\u23E9 Skipping registering command "${name}" as it's set to delete.`;
            if (logger) {
              logger.info(message2);
            } else {
              console.log(message2);
            }
            continue;
          }
          yield applicationCommands2.create({
            name,
            name_localizations,
            description,
            description_localizations,
            default_member_permissions,
            dm_permission,
            options
          });
          let message = `\u2705 Registered command "${name}".`;
          if (logger) {
            logger.info(message);
          } else {
            console.log(message);
          }
        }
      }
    }
  );
}
function registerButtons(_0) {
  return __async(
    this,
    arguments,
    function* ({ client, buttons, logger }) {
      for (const button of buttons) {
        const {
          customID,
          deleted,
          run
        } = button;
        if (button.deleted) {
          let message2 = `\u23E9 Skipping registering button "${customID}" as it's set to delete.`;
          if (logger) {
            logger.info(message2);
          } else {
            console.log(message2);
          }
          continue;
        }
        let message = `\u2705 Registered button "${customID}".`;
        if (logger) {
          logger.info(message);
        } else {
          console.log(message);
        }
      }
    }
  );
}
var DiscordHandler = class {
  constructor({
    client,
    token,
    commandsPath,
    buttonsPath,
    eventsPath,
    validationsPath,
    testServer,
    logger,
    logInteractions,
    refreshCommands,
    toggleCommands,
  }) {
    if (!client)
      throw new Error(
        'Property "client" is required when instantiating DiscordHandler.'
      );
    if (!token)
      throw new Error(
        'Proeprty "token" is required when instantiating DiscordHandler.'
      );
    this._client = client;
    this._token = token;
    this._commandsPath = commandsPath;
    this._buttonsPath = buttonsPath;
    this._eventsPath = eventsPath;
    this._validationsPath = validationsPath;
    this._testServer = testServer;
    this._commands = [];
    this._buttons = [];
    this._validationFuncs = [];
    this._logger = logger;
    this._logInteractions = logInteractions;
    this._refreshCommands = refreshCommands;
    this._toggleCommands = toggleCommands;
    if (this._validationsPath && !commandsPath) {
      throw new Error(
        'Command validations are only available in the presence of a commands path. Either add "commandsPath" or remove "validationsPath"'
      );
    }
    let logStatus;
    if (this._logInteractions) {
      logStatus = 'Logging interactions enabled.';
    } else {
      logStatus = 'Logging interactions disabled. Interactions will not be logged in console.';
    }
    if (this._logger) {
      this._logger.event(logStatus);
    } else {
      console.log(logStatus);
    }
    if (this._client && this._token) {
      try {
        attemptAppLogin(this._client, this._token);
        let message = `\u2705 Logged into the DiscordAPI.`;
        if (logger) {
          logger.info(message);
        } else {
          console.log(message);
        }
      } catch (error) {
        throw new Error(
          "An error occured whilst trying to login to your Discord Client, please check your parameters, and try again."
        );
      }
    }
    if (this._commandsPath) {
      this._commandsInit();
      this._client.once("ready", () => {
        this._registerSlashCommands();
        this._registerButtonInteractions();
        this._validationsPath && this._validationsInit();
        this._handleCommands();
        this._handleButtons();
        this._handleInteractionLogging();

        async function configAppCommand(_r, _t) {
          const appCommands = await getAppCommands(client, testServer);
          const existingCommand = appCommands.cache.find(
            (cmd) => cmd.name === 'app'
          );
          if (existingCommand) {
           appCommands.delete(existingCommand.id)
          }

          const refreshOptions = {
            type: 1,
            name: 'refresh_commands',
            name_localizations: undefined,
            description: 'Reload your discord commands and functions.',
            description_localizations: undefined,
            options: []
          };

          const enableOptions = {
            type: 1,
            name: 'enable',
            name_localizations: undefined,
            description: 'Enable a discord command you previously disabled.',
            description_localizations: undefined,
            options: [
              {
                autocomplete: undefined,
                type: 3,
                choices: undefined,
                name: 'command',
                name_localizations: undefined,
                description: 'The command name you want to enable.',
                description_localizations: undefined,
                required: true,
                max_length: undefined,
                min_length: undefined
              }
            ]
          };
          const disableOptions = {
            type: 1,
            name: 'disable',
            name_localizations: undefined,
            description: 'Disable a discord command (This resets when the bot is restarted).',
            description_localizations: undefined,
            options: [
              {
                autocomplete: undefined,
                type: 3,
                choices: undefined,
                name: 'command',
                name_localizations: undefined,
                description: 'The command name you want to disable.',
                description_localizations: undefined,
                required: true,
                max_length: undefined,
                min_length: undefined
              }
            ]
          };

          let appOptions = []

          if (_r) {
            appOptions.push(refreshOptions)
          }
          if (_t) {
            appOptions.push(enableOptions)
            appOptions.push(disableOptions)
          }
          
          if (appOptions.length > 0) {
            await appCommands.create({
              options: appOptions,
              name: 'app',
              name_localizations: undefined,
              description: 'Your Discord App Config Options',
              description_localizations: undefined,
              default_member_permissions: undefined,
              dm_permission: undefined,
              type: 1,
            })
          }
        }
        configAppCommand(this._refreshCommands, this._toggleCommands)
      });
    }
    if (this._eventsPath) {
      this._eventsInit();
    }
    if (this._buttonsPath) {
      this._buttonsInit();
    }
  }
  _commandsInit() {
    let commands = buildCommandTree(this._commandsPath);
    this._commands = commands;
  }
  _buttonsInit() {
    let buttons = buildButtonsTree(this._buttonsPath);
    this._buttons = buttons;
  }
  _registerSlashCommands() {
    registerCommands({
      client: this._client,
      commands: this._commands,
      testServer: this._testServer,
      logger: this._logger
    });
  }
  _registerButtonInteractions() {
    registerButtons({
      client: this._client,
      buttons: this._buttons,
      logger: this._logger
    });
  }
  _eventsInit() {
    const eventPaths = getFolderPaths(this._eventsPath);
    for (const eventPath of eventPaths) {
      const eventName = eventPath.replace(/\\/g, "/").split("/").pop();
      const eventFuncPaths = getFilePaths(eventPath, true);
      eventFuncPaths.sort();
      if (!eventName)
        continue;
      this._client.on(
        eventName,
        (...arg) => __async(this, null, function* () {
          for (const eventFuncPath of eventFuncPaths) {
            const eventFunc = require(eventFuncPath);
            const cantRunEvent = yield eventFunc(...arg, this._client, this);
            if (cantRunEvent)
              break;
          }
        })
      );
    }
  }
  _validationsInit() {
    const validationFilePaths = getFilePaths(this._validationsPath);
    validationFilePaths.sort();
    for (const validationFilePath of validationFilePaths) {
      const validationFunc = require(validationFilePath);
      if (typeof validationFunc !== "function") {
        throw new Error(
          `Validation file ${validationFilePath} must export a function by default.`
        );
      }
      this._validationFuncs.push(validationFunc);
    }
  }
  _handleCommands() {
    this._client.on(
      "interactionCreate",
      (interaction) => __async(this, null, function* () {
        if (interaction.isButton()) {
          if (this._buttons[interaction.customId]) {
            yield this._buttons[interaction.customId](interaction);
          }
        }
        if (!interaction.isChatInputCommand())
          return;
        const command = this._commands.find(
          (cmd) => cmd.name === interaction.commandName
        );
        if (interaction.commandName == 'app') {
          yield interaction.deferReply({ephemeral: true});
          // check if member has 'MANAGE_SERVER'
          if (!interaction.member.permissions.has('MANAGE_SERVER')) {
            return interaction.followUp({
              content: 'You do not have permission to use this command.',
              ephemeral: true,
            })
          }
          const subCommand = interaction.options.getSubcommand() 
          switch (subCommand) {
            case 'refresh_commands':
              try {
                registerCommands({
                  client: this._client,
                  commands: this._commands,
                  testServer: this._testServer,
                  logger: this._logger
                });
                interaction.followUp('Commands have been reloaded! You may need to refresh your Discord.')
              } catch (error) {
                interaction.followUp('An error occurred while reloading commands.')
              }
              
              break;
          
            case 'enable':
              const existingAppCommands = yield getAppCommands(this._client, this._testServer);
              const existingAppCommand = existingAppCommands.cache.find(cmd => cmd.name === interaction.options.getString('command'));
              if (existingAppCommand) {
                return interaction.followUp('This command is already enabled.');
              }
              try {
              for (const localCommand of this._commands) {
                if (localCommand.name === interaction.options.getString('command')) {
                  const {
                    name,
                    name_localizations,
                    description,
                    description_localizations,
                    default_member_permissions,
                    dm_permission,
                    options
                  } = localCommand;
                

                  let message = `🌐 Loading command "${name}".`;
                  if (this._logger) {
                    this._logger.info(message);
                  } else {
                    console.log(message);
                  }

                  yield existingAppCommands.create({
                    name,
                    name_localizations,
                    description,
                    description_localizations,
                    default_member_permissions,
                    dm_permission,
                    options
                  });
                  let message2 = `\u2705 Registered command "${name}".`;
                  if (this._logger) {
                    this._logger.info(message2);
                  } else {
                    console.log(message2);
                  }
                  return interaction.followUp('This command is now enabled.');
                }
              }
            } catch (e) {
              console.log(e)
              return interaction.followUp(`An error occured whilst trying to start command ${interaction.options.getString('command')}. Please check the command name.`)
            }

            break;
          
            case 'disable':
            const existingAppCommands2 = yield getAppCommands(this._client, this._testServer);
              const existingAppCommand2 = existingAppCommands2.cache.find(cmd => cmd.name === interaction.options.getString('command'));
              if (!existingAppCommand2) {
                return interaction.followUp('This command is already disable or cannot be found.');
              }
              yield existingAppCommands2.delete(existingAppCommand2.id)
              interaction.followUp('This command has been disabled.');
              
            break;
          
          }
        } else {
          if (command) {
            if (this._validationFuncs.length) {
              let canRun = true;
              for (const validationFunc of this._validationFuncs) {
                const cantRunCommand = yield validationFunc(
                  interaction,
                  command,
                  this,
                  this._client
                );
                if (cantRunCommand) {
                  canRun = false;
                  break;
                }
              }
              if (canRun) {
                yield command.run({
                  interaction,
                  client: this._client,
                  handler: this
                });
              }
            } else {
              yield command.run({
                interaction,
                client: this._client,
                handler: this
              });
            }
          }
        }
      })
    );
  }
  _handleInteractionLogging() {
    this._client.on(
      "interactionCreate",
      (interaction) => __async(this, null, function* () {
        let _i = interaction;
        let _u = interaction.user;

        const interactionTypes = {
          1: 'Ping',
          2: 'ApplicationCommand',
          3: 'MessageComponent',
          4: 'ApplicationCommandAutocomplete',
          5: 'ModalSubmit'
        };
        const componentTypes = {
          1: 'ActionRow',
          2: 'Button',
          3: 'StringSelect',
          4: 'TextInput',
          5: 'UserSelect',
          6: 'RoleSelect',
          7: 'MentionableSelect' ,
          8: 'ChannelSelect',
          9: 'SelectMenu' ,
        }

        if (this._logInteractions) {
          let messageLog;
          if (interaction.commandName) {
           messageLog = `${_u.username} has used ${interactionTypes[_i.type]} - "${_i.commandName}".`
          } else {
            messageLog = `${_u.username} has used a ${componentTypes[_i.componentType]} - "${_i.customId}".`
          }
          if (this._logger) {
            yield this._logger.event(messageLog);
          } else {
            console.log(messageLog);
          }
        }
      }
      )
    );
  }
  _handleButtons() {
    this._client.on(
      "interactionCreate",
      (interaction) => __async(this, null, function* () {
        if (!interaction.isButton()) return;
        const button = this._buttons.find(
          (btn) => btn.customID === interaction.customId
        );
        if (button) {
          yield button.run({
            interaction,
            client: this._client,
            handler: this
          });
        }
      })
    );
  }
  get commands() {
    return this._commands;
  }
};
