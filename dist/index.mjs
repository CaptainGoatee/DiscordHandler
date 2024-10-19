var __getOwnPropNames = Object.getOwnPropertyNames;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/index.js
var require_src = __commonJS({
  "src/index.js"(exports, module) {
    var __defProp = Object.defineProperty;
    var __defProps = Object.defineProperties;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
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
      return fn && (res = (0, fn[__getOwnPropNames2(fn)[0]])(fn = 0)), res;
    };
    var __export = (target, all) => {
      for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
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
        fs = __require("fs");
        path = __require("path");
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
        let _a = __require(commandFilePath), { data: data2, run, deleted } = _a, rest = __objRest(_a, ["data", "run", "deleted"]);
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
        let _a = __require(buttonFilePath), { customID, run, deleted } = _a, rest = __objRest(_a, ["customID", "run", "deleted"]);
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
            console.log(button);
            const {
              name,
              name_localizations,
              description,
              description_localizations,
              default_member_permissions,
              dm_permission,
              options
            } = localCommand;
            const existingCommand = applicationCommands.cache.find(
              (cmd) => cmd.name === name
            );
            if (existingCommand) {
              if (localCommand.deleted) {
                yield applicationCommands.delete(existingCommand.id);
                let message = `\u{1F5D1} Deleted command "${name}".`;
                if (logger) {
                  logger.info(message);
                } else {
                  console.log(message);
                }
                continue;
              }
              if (areCommandsDifferent(existingCommand, localCommand)) {
                yield applicationCommands.edit(existingCommand.id, {
                  description,
                  options
                });
                let message = `\u{1F501} Edited command "${name}".`;
                if (logger) {
                  logger.info(message);
                } else {
                  console.log(message);
                }
              }
            } else {
              if (localCommand.deleted) {
                let message2 = `\u23E9 Skipping registering command "${name}" as it's set to delete.`;
                if (logger) {
                  logger.info(message2);
                } else {
                  console.log(message2);
                }
                continue;
              }
              yield applicationCommands.create({
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
    var DiscordHandler = class {
      constructor({
        client,
        token,
        commandsPath,
        buttonsPath,
        eventsPath,
        validationsPath,
        testServer,
        logger
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
        if (this._validationsPath && !commandsPath) {
          throw new Error(
            'Command validations are only available in the presence of a commands path. Either add "commandsPath" or remove "validationsPath"'
          );
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
                const eventFunc = __require(eventFuncPath);
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
          const validationFunc = __require(validationFilePath);
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
          })
        );
      }
      get commands() {
        return this._commands;
      }
    };
  }
});
export default require_src();
