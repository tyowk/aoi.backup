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

<h2 align="center">Installation</h2>

```
npm install aoi.backup
```
<br>
<h2 align="center">Bot Setup</h2>

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

const backup = new AoiBackup(client, './backups');
```
<br>
<br>
<br>
<br>
<h2 align="center">Backup Create</h2>

Create a backup for the specified server. ***Note:** The backup will be saved in the folder that was previously set*
```
$backupCreate[maxMessages?;backupMembers?;backupChannels?;backupRoles?;backupBans?;backupEmojis?]
```
```js
// command example
client.command({
    name: 'create',
    code: `$backupCreate[10;false;true;true;true;true]`
});

// will return the backup id
// example: 1294817399230028371
```
<br>
<br>
<h2 align="center">Backup Load</h2>

Allows you to load a backup on a Discord server!  <mark>be carefully when using this function!</mark>
```
$backupLoad[backupId;maxMessages?;clearGuild?;loadMain?;loadRolesAssignments?;loadEmojis?]
```
```js
// command example
client.command({
    name: 'load',
    code: `$backupLoad[1294817399230028371;10;true;true;false;false]`
});

// will load the backup
// with id: 1294817399230028371
```
<br>
<br>
<h2 align="center">Backup List</h2>

***Note:*** `$backupList[]` *simply returns an list of Backup IDs, you must fetch the ID to get complete information.*
```
$backupList[separator?]
```
```js
// command example
client.command({
    name: 'list',
    code: `$backupList[,]`
});
// will return all backup ids
// from the backups folder
```
<br>
<br>
<h2 align="center">Backup Remove</h2>

Remove the backup from given ID. ***Warn:** once the backup is removed, it is impossible to recover it!*
```
$backupRemove[backupId]
```
```js
// command example
client.command({
    name: 'remove',
    code: `$backupRemove[1294817399230028371]`
});

// will remove the backup
// with id: 1294817399230028371
```
<br>
<br>
<h2 align="center">Backup Fetch</h2>

Fetches information from a backup. The backup info provides a data, id, and size property.
```
$backupFetch[backupId;type]
```
```js
// command example
client.command({
    name: 'fetch',
    code: `$backupFetch[1294817399230028371;channels]`
});

// will return the backup channels data
// with id: 1294817399230028371
```
**Backup Fetch Type:**
- `id`
- `size`
- `timestamp`
- `name`
- `guildid`
- `icon`
- `iconbase64`
- `region`
- `verificationlevel`
- `explicitcontentfilter`
- `defaultmessagenotifications`
- `afkchannelid`
- `afktimeout`
- `roles`
- `channels`
- `categories`
- `bans`
- `emojis`
- `widget`
- `automoderationrules`
<br>
<br>
<br>
<br>
<p align="center">
  <a href="#">
    <img width="100" src="https://github.com/tyowk/aoi.backup/blob/main/docs/assets/icon1.png?raw=true" alt="aoi.backup">
  </a>
  <br>
  <b>Extension by <a href="https://x.com/tyowk">Tyowk</a>
  <br>
  <a href="https://aoijs.org/">Aoi.js</a> by Akarui Development
  </b>
</p>
