![CI](https://github.com/MikaelPorttila/totally-not-a-bot/workflows/CI/badge.svg?branch=main)
[![tag](https://img.shields.io/github/tag/MikaelPorttila/totally-not-a-bot.svg)](https://github.com/MikaelPorttila/totally-not-a-bot/releases)

## About

🤖 Bror

## Tech

- Backend: Deno
- Database: Dgraph using GraphQL
- API Integration: Discord, OpenWeather and OCR Space

# Developer instructions

## Required env variables
```
TNAB_APPLICATION_ID: <Discord Application Id>
TNAB_TOKEN: <Discord Bot Token>
```

## Run
```cmd
deno run --allow-net --allow-env --allow-read --watch ./src/mod.ts
```

## Build
```cmd
deno compile --allow-net --allow-env --allow-read --output totally-not-a-bot.exe ./src/mod.ts
```