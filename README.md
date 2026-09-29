# tinycrunch

Lightweight native desktop wrapper for [Crunchyroll](https://www.crunchyroll.com), built with [tinyjs](https://tinyjs.app).

Instead of shipping a full Chromium/Electron runtime, tinycrunch pairs a tiny txiki.js backend with the OS's native webview (WKWebView on macOS), producing a desktop app a few MB in size.

## Features

- Wraps crunchyroll.com in its own app window, separate from your browser
- Window size/position persisted across launches
- RPC surface fully locked down (`api.disable: ["*"]`) — the page has no access to the backend bridge

## Requirements

- macOS 15+ (Apple Silicon; Intel runs under Rosetta)
- [tinyjs CLI](https://tinyjs.app) `>=0.42.2`

## Development

```sh
tinyjs dev      # run with hot reload
```

## Build

```sh
tinyjs build            # dist/tinycrunch.app
tinyjs build --dmg      # + installer image
```

## Install

Drag `dist/tinycrunch.app` into `/Applications`.
