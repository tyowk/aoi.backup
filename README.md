<p align="center">
  <a href="#">
    <img width="500" src="https://github.com/tyowk/aoi.backup/blob/main/docs/assets/icon2.png?raw=true" alt="aoi.backup">
  </a>
</p>
<br>
<b><p align="center">Aoi.backup is an extension for aoi.js, empowering you to easily create and manage Discord server backups using your aoi.js bot.</p></b>

---
<br>
<br>

## Installation
```sh
npm install aoi.backup @outwalk/discord-backup
```
<br>

## App Setup
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

## Available Functions
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
$backupFolder[path / folder name]
```
> Updates the storage folder to another
<br>
<br>
<br>
<br>

---
<p align="center"><a href="#"><img width="150" src="https://github.com/tyowk/aoi.backup/blob/main/docs/assets/icon2.png?raw=true" alt="aoi.backup"></a><br><strong>Extension by Tyowk<br>Akarui Development Team</strong></p>
