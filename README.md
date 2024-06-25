<p align="center">
  <a>
    <img width="500" src="https://github.com/tyowk/aoi.backup/tree/main/docs/assets/icon2.png?raw=true" alt="aoi.backup">
  </a>
</p>

<b><p align="center">Aoi.backup is an extension for aoi.js, empowering you to easily create and manage Discord server backups using your aoi.js bot.</p></b>

---
<br>
<br>

## Installation
```sh
npm install aoi.backup @outwalk/discord-backup
```
<br>

## Bot Setup
```js
const { AoiClient } = require("aoi.js");
const { AoiBackup } = require("aoi.backup");

const client = new AoiClient({
    token: 'Discord Bot Token',
    prefix: 'Discord Bot Prefix',
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
<br>
<br>

# Functions
### Backup Create
```
$backupCreate[max messages?;backup members?;backup channels?;backup roles?;backup bans?;backup emojis?]
```
> Create a backup for the specified server.
### Backup Fetch
```
$backupFetch[backup id]
```
> Fetches information from a backup. The backup info provides a data, id, and size property.
### Backup Load
```
$backupLoad[backup id;max messages?;clear guild?;load main?;load roles assignments?;load emojis?]
```
> Allows you to load a backup on a Discord server!
### Backup List
```
$backupList[separator?]
```
> ***Note:*** `$backupList[ ]` ***simply returns an list of Backup IDs, you must fetch the ID to get complete information.***
### Backup Remove
```
$backupRemove[backup id]
```
> Remove the backup from given ID. ***Warn: once the backup is removed, it is impossible to recover it!***
### Backup Folder
```
$backupFolder[path]
```
> Updates the storage folder to another
<br>
<br>

---
<p align="center">made with ♥️ by <a href="https://github.com/tyowk">Tyowk</a><br><a href="https://github.com/aoijs/aoi.js">Aoi.js</a> by <a href="https://github.com/aoijs">Akarui Development</a></p>
