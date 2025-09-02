<p align="center">
<a href="https://github.com/liamcottle/atlas-for-rust"><img src="./public/icon_rounded.png" width="150"></a>
</p>

<h2 align="center">Atlas for Rust</h2>

<p align="center">
<a href="https://discord.gg/APQSQZNV7t"><img src="https://img.shields.io/badge/Discord-Liam%20Cottle's%20Discord-%237289DA?style=flat&logo=discord" alt="discord"/></a>
<a href="https://twitter.com/liamcottle"><img src="https://img.shields.io/badge/Twitter-@liamcottle-%231DA1F2?style=flat&logo=twitter" alt="twitter"/></a>
<br/>
<a href="https://ko-fi.com/liamcottle"><img src="https://img.shields.io/badge/Donate%20a%20Coffee-liamcottle-yellow?style=flat&logo=buy-me-a-coffee" alt="donate on ko-fi"/></a>
<a href="./donate.md"><img src="https://img.shields.io/badge/Donate%20Bitcoin-3FPBfiEwioWHFix3kZqe5bdU9F5o8mG8dh-%23FF9900?style=flat&logo=bitcoin" alt="donate bitcoin"/></a>
</p>

## What is Atlas

Atlas is an **unofficial** interactive map experience for [Rust](https://rust.facepunch.com/). It uses the same websocket protocol that the official [Rust+ Companion app](https://rust.facepunch.com/companion) uses to communicate with the Rust game servers.

<img src="./docs/map.png">

## New Features Implemented

- **Player Map Notes**: Added support for team leader map notes and player map notes. Marker colors mostly match.
- **Player Death Icons**: Enhanced player death icons on the map for better visibility and accuracy.
- **Additional Map Icons**: Included more map icons to provide comprehensive information.
- **Patrol Helicopter Map Asset**: Added a new map asset for displaying patrol helicopter locations.
- **Version Update Notifier**: Added a notifier to alert users of new version updates.
- **Player Death Markers**: Added player death markers for teammates that display for 4 minutes.
- **Custom Map Markers**: Introduced the ability to display custom markers with colors and names to the map.
- **Visual Interface Tweaks**: Made various tweaks to the visual interface for better user experience.
- **New Assets**: Added new assets to enhance the map interface.
- **In-Game Time Calculation**: Display the in game time.
- **Streamlined Bottom Bar**: Streamlined the bottom bar for improved usability.

## Features

- Shows a realtime updating interactive map, including:
    - Hackable Crates
    - Cargo Ship
    - Chinook
    - Explosions
    - Vending Machines
    - Team Members
- Shows realtime server stats
    - Current player count
    - How long since last wipe
- Send and Receive realtime Team Chat messages
- Search items for sale in Vending Machines across the map
- Supports "Pairing" with Rust Servers from the in game menu
- Supports adding Rust servers manually without using the in game pairing menu
    - Useful if you run your own server and have access to server files

## How to Install

- Download the latest installer from [Releases](https://github.com/liamcottle/atlas-for-rust/releases)
- After downloading, run `AtlasForRust-x.y.z-win.exe`
- Connect with Rust+ from the Atlas welcome screen
- Pair with your Rust server from the in game menu

## How to build for development

Download and Install Dependencies

```
git clone https://github.com/liamcottle/atlas-for-rust.git
cd atlas-for-rust
npm install
```

**Note for Node.js 17+**: Due to OpenSSL changes in newer Node.js versions, you may need to use the legacy OpenSSL provider:

```
NODE_OPTIONS="--openssl-legacy-provider" npm run electron:serve
NODE_OPTIONS="--openssl-legacy-provider" npm run build
```

Run Electron app for Development

```
npm run electron:serve
```

## Build for Mac, Windows and Linux

At this stage, GitHub actions only builds and releases Windows versions of Atlas. However, if you want to run Atlas on Mac or Linux, you can use the command below.

**Note for Node.js 17+**: Use the legacy OpenSSL provider for building:

```
NODE_OPTIONS="--openssl-legacy-provider" npm run electron:build -- --mac --win --linux
```

## Updating Rust Assets

Atlas uses images and metadata from the Rust game files. These can be updated with the [update_assets.js](./update_assets.js) script.

**Prerequisites**: This script requires a local Rust game installation with the latest updates.

```shell
node update_assets.js "<drive>:\SteamLibrary\steamapps\common\Rust"
```

### Manual Asset Updates

If you don't have a local Rust installation, you can manually add new items to the repository:

1. **Add item metadata** to `src/items.json` following this structure:
   ```json
   {
     "id": 123456789,
     "shortname": "new.item.shortname",
     "name": "Display Name",
     "description": "Item description"
   }
   ```

2. **Add item image** (256x256 PNG) to `public/images/items/` with filename matching the shortname

3. **Test the changes** by running the development server:
   ```
   NODE_OPTIONS="--openssl-legacy-provider" npm run electron:serve
   ```

### Asset Update History

- **Last Update**: September 19, 2023 (Rust game version from that period)
- **Items Count**: 830 items in current database
- **Missing Updates**: All Rust updates from September 2023 to present

### Contributing Asset Updates

The community can help keep assets up to date by:
- Providing new item metadata and images from recent Rust updates
- Submitting pull requests with properly formatted asset additions
- Reporting missing items via GitHub issues

## Contributing

If you have a feature request, or find a bug with Atlas, please open an issue here on GitHub.

### Contributing New Items and Assets

Atlas for Rust benefits from community contributions to keep game assets up to date. Here's how you can help:

#### Adding New Items

1. **Find Missing Items**: Check if new Rust items are missing from `src/items.json`
2. **Gather Item Data**: You'll need:
   - Item ID (from Rust game files)
   - Shortname (internal game identifier)
   - Display name
   - Description
   - 256x256 PNG image
3. **Submit Changes**: Create a pull request with:
   - Updated `src/items.json` with new item metadata
   - New item image in `public/images/items/`
   - Description of what was added

#### Reporting Missing Content

- Open a GitHub issue listing missing items or outdated content
- Include Rust version/update information when possible
- Provide screenshots or references to official Rust documentation

### Repository Maintenance

This repository requires periodic updates to stay current with Rust game changes:

- **Asset Updates**: Should be run after major Rust updates
- **Dependency Updates**: Keep npm packages current for security
- **Build Compatibility**: Ensure builds work with current Node.js versions

For maintainers with Rust installations, running the asset update script monthly after game updates is recommended.
