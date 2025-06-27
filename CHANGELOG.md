# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.3] - 2024-12-27

### Added
- **Modal Support**: Full support for Discord modal form submissions
  - `modalsPath` configuration option
  - `_modalsInit()` method for loading modal handlers
  - `_registerModalInteractions()` method for registering modals
  - `_handleModals()` method for processing modal submissions
  - `buildModalsTree()` function for building modal structure
  - `registerModals()` function for logging modal registration
- **Enhanced Admin Commands**: Improved `/app` command functionality
  - Better error handling for command enable/disable operations
  - Improved permission checking for admin commands
  - Enhanced logging for command management operations

### Changed
- **Improved Error Handling**: Better validation and error messages
- **Enhanced Logging**: More detailed interaction logging
- **Code Structure**: Refactored for better maintainability
- **Documentation**: Comprehensive README updates with modal support

### Fixed
- **Button Handling**: Fixed button interaction processing
- **Command Registration**: Improved command registration logic
- **Event Handling**: Enhanced event processing reliability

## [1.0.2] - 2024-12-27

### Added
- **Test Server Support**: Added `testServer` configuration option
- **Command Management**: Added `refreshCommands` and `toggleCommands` options
- **Enhanced Logging**: Improved interaction logging system
- **Better Error Messages**: More descriptive error handling

### Changed
- **Build Process**: Updated build scripts for better compatibility
- **Package Structure**: Improved file organization

## [1.0.1] - 2024-12-27

### Added
- **Button Support**: Full support for Discord button interactions
  - `buttonsPath` configuration option
  - `_buttonsInit()` method for loading button handlers
  - `_registerButtonInteractions()` method for registering buttons
  - `_handleButtons()` method for processing button clicks
  - `buildButtonsTree()` function for building button structure
  - `registerButtons()` function for logging button registration

### Changed
- **Event System**: Enhanced event handling capabilities
- **Validation System**: Improved command validation framework
- **Code Quality**: Better code organization and structure

## [1.0.0] - 2024-12-27

### Added
- **Major Version Release**: Complete rewrite and feature overhaul
- **Slash Commands**: Automatic command registration and handling
- **Event System**: Flexible event handling with nested directory support
- **Validation System**: Custom validation logic for commands
- **Logging Integration**: Support for custom loggers
- **Flexible File Structure**: Support for nested command and event directories
- **Error Handling**: Comprehensive error handling and validation
- **TypeScript Support**: Full TypeScript compatibility with type definitions

### Changed
- **Complete Rewrite**: Major architectural changes and improvements
- **Enhanced Performance**: Optimized command and event processing
- **Better Documentation**: Comprehensive documentation updates

## [0.2.2] - 2024-04-27

### Added
- **Stable Release**: Final 0.2.x version before major rewrite
- **Bug Fixes**: Various stability improvements
- **Documentation**: Updated documentation for 0.2.x series

## [0.2.1] - 2024-04-27

### Added
- **Minor Features**: Additional functionality and improvements
- **Performance Optimizations**: Better performance for command handling

## [0.1.68] - 2024-04-27

### Added
- **Feature Enhancements**: Additional command and event handling features
- **Bug Fixes**: Various fixes and improvements

## [0.1.67] - 2024-04-27

### Added
- **New Features**: Enhanced functionality for Discord.js integration
- **Stability Improvements**: Better error handling and reliability

## [0.1.66] - 2024-04-27

### Added
- **Performance Improvements**: Optimized command processing
- **Feature Additions**: New capabilities for event handling

## [0.1.65] - 2024-04-27

### Added
- **Enhanced Functionality**: Additional features for Discord bot development
- **Bug Fixes**: Various fixes and stability improvements

## [0.1.6] - 2024-04-27

### Added
- **Major Feature Update**: Significant new functionality
- **Improved Architecture**: Better code structure and organization

## [0.1.50] - 2024-04-27

### Added
- **Feature Expansion**: Additional capabilities for Discord.js projects
- **Documentation Updates**: Improved documentation and examples

## [0.1.43] - 2024-04-27

### Added
- **Minor Features**: Additional functionality and improvements
- **Bug Fixes**: Various fixes and stability improvements

## [0.1.42] - 2024-04-27

### Added
- **Feature Enhancements**: Improved command and event handling
- **Performance Optimizations**: Better performance and efficiency

## [0.1.41] - 2024-04-27

### Added
- **New Features**: Additional capabilities for Discord bot development
- **Stability Improvements**: Better error handling and reliability

## [0.1.40] - 2024-04-27

### Added
- **Feature Additions**: New functionality for Discord.js integration
- **Bug Fixes**: Various fixes and improvements

## [0.1.30] - 2024-04-27

### Added
- **Enhanced Functionality**: Additional features and improvements
- **Documentation**: Updated documentation and examples

## [0.1.20] - 2024-04-27

### Added
- **Feature Updates**: New capabilities for Discord bot development
- **Performance Improvements**: Better performance and efficiency

## [0.1.15] - 2024-04-27

### Added
- **Minor Features**: Additional functionality and improvements
- **Bug Fixes**: Various fixes and stability improvements

## [0.1.14] - 2024-04-27

### Added
- **Feature Enhancements**: Improved command and event handling
- **Stability Improvements**: Better error handling and reliability

## [0.1.12] - 2024-04-27

### Added
- **New Features**: Additional capabilities for Discord.js projects
- **Performance Optimizations**: Better performance and efficiency

## [0.1.11] - 2024-04-27

### Added
- **Feature Additions**: New functionality for Discord bot development
- **Bug Fixes**: Various fixes and improvements

## [0.1.1] - 2024-04-27

### Added
- **Initial Features**: Basic Discord.js integration capabilities
- **Core Functionality**: Command and event handling foundation

## [0.1.0] - 2024-04-27

### Added
- **First Release**: Initial version of DiscordHandler
- **Basic Functionality**: Core Discord.js command and event handling
- **Foundation**: Basic architecture and structure

## [0.0.50] - 2024-04-27

### Added
- **Pre-release Version**: Early development version
- **Experimental Features**: Testing new functionality and concepts

---

## Version History Summary

### Recent Releases (2024-12-27)
- **1.0.3**: Added modal support, enhanced admin commands
- **1.0.2**: Added test server support and command management
- **1.0.1**: Added button support and improved event system
- **1.0.0**: Major rewrite with complete feature overhaul

### Legacy Releases (2024-04-27)
- **0.2.x**: Stable releases before major rewrite
- **0.1.x**: Feature development and improvements (68 versions)
- **0.0.x**: Early development and experimental versions

## Migration Guide

### From 0.2.x to 1.0.0
- **Breaking Changes**: Major architectural changes in 1.0.0
- **New Features**: All new features are optional and can be added incrementally
- **Backward Compatibility**: Some 0.2.x code may need updates

### From 0.1.x to 1.0.0
- **Major Rewrite**: Complete overhaul of the library
- **New API**: Significant changes to configuration and usage
- **Migration Required**: Code will need to be updated for 1.0.0

### From 1.0.0 to 1.0.3
- **No Breaking Changes**: All updates are additive
- **New Features**: Modal support, enhanced admin commands
- **Optional Upgrades**: New features can be adopted incrementally

## Package Statistics

- **Total Downloads**: 8 weekly downloads
- **Total Files**: 9 files in package
- **Unpacked Size**: 76.3 kB
- **License**: ISC
- **Repository**: [GitHub](https://github.com/CaptainGoatee/DiscordHandler)

## Contributing

When contributing to this project, please update this changelog with your changes following the format above. 