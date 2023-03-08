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

Run Electron app for Development

```
npm run electron:serve
```

## Build for Mac, Windows and Linux

At this stage, GitHub actions only builds and releases Windows versions of Atlas. However, if you want to run Atlas on Mac or Linux, you can use the command below.

```
npm run electron:build -- --mac --win --linux
```

## Updating Rust Assets

Atlas uses images and metadata from the Rust game files. These can be updated with the [update_assets.js](./update_assets.js) script.

```shell
node update_assets.js "<drive>:\SteamLibrary\steamapps\common\Rust"
```

## Contributing

If you have a feature request, or find a bug with Atlas, please open an issue here on GitHub.
