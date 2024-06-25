# Aoi.backup

Aoi.backup is an extension for aoi.js, empowering you to easily create and manage Discord server backups using your aoi.js bot.

## 📥  Installation

```sh
npm install aoi.backup @outwalk/discord-backup
```

## 🤖  Bot Setup

```js
const { AoiClient } = require("aoi.js");
const { AoiBackup } = require("aoi.backup");

const client = new AoiClient({
    token: 'BOT_TOKEN',
    prefix: 'BOT_PREFIX'
    intents: ["Guilds", "GuildMessages", "MessageContent"],
    events: ["onMessage"],
    database: {
        type: "aoi.db",
        db: require("@akarui/aoi.db"),
        dbType: "KeyValue",
        tables: ["main"],
        securityKey: "a-32-characters-long-string-here"
    }
});

const backup = new AoiBackup(client);

// Command Example
client.command({
    name: "backupCreate",
    code: `$backupCreate[10;false;true;true;false;false]` // return the Backup ID
});
```

## 🔧  Functions

#### Backup Create
```
$backupCreate[max messages?;backup members?;backup channels?;backup roles?;backup bans?;backup emojis?]
```
#### Backup Fetch
```
$backupFetch[backup id]
```
#### Backup Load
```
$backupFetch[backup id;max messages?;clear guild?;load main?;load roles assignments?;load emojis?]
```
#### Backup List
```
$backupList[separator?]
```
#### Backup Remove
```
$backupRemove[backup id]
```
#### Backup Folder
```
$backupFolder[path]
```

made with ♥️ by [Tyowk](https://x.com/tyowk).
