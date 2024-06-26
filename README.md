<p align="center">
  <a href="#">
    <img width="500" src="https://github.com/tyowk/aoi.backup/blob/main/docs/assets/icon2.png?raw=true" alt="aoi.backup">
  </a>
</p>
<br>
<b><p align="center">Aoi.backup is an extension for aoi.js, empowering you to easily create and manage Discord server backups using your aoi.js bot.</p></b>
<br>
<br>

<h2 align="center">Installation</h2>

```sh
npm install aoi.backup
```
<br>
<h2 align="center">Setup</h2>

```js
const { AoiClient } = require("aoi.js");
const { AoiBackup } = require("aoi.backup");

const client = new AoiClient({
    intents: ["Guilds", "GuildMessages", "MessageContent"],
    events: ["onMessage", "onInteractionCreate"],
    prefix: "Discord Bot Prefix",
    token: "Discord Bot Token",
    database: {
        type: "aoi.db",
        db: require("@akarui/aoi.db"),
        dbType: "KeyValue",
        tables: ["main"],
        securityKey: "a-32-characters-long-string-here"
    }
});

const backup = new AoiBackup(client, './backups');

// Ping Command Example
client.command({
    name: "ping",
    code: `Pong! $pingms`
});
```
<br>
<br>
<br>
<br>
<h2 align="center">Backup Create</h2>

Create a backup for the specified server. ***Note:** The backup will be saved in the folder that was previously set*
```sh
$backupCreate[max?;members?;channels?;roles?;bans?;emojis?]
```
### parameters
| field | type | description| required |
| :---: | :---: | :---: | :---: |
| max? | number | max messages per channels? default is `1000` | false |
| message? | boolean | backup messages? default is `true` | false |
| channels? | boolean | backup channels? default is `true` | false |
| roles? | boolean | backup roles? default is `true` | false |
| bans? | boolean | backup members bans? default is `false` | false |
| emojis? | boolean | backup emojis? default is `false` | false |
<br>
<br>
<h2 align="center">Backup Load</h2>

Allows you to load a backup on a Discord server!  <mark>be carefully when using this function!</mark>
```sh
$backupLoad[ID;max?;clear?;main?;roles?;emojis?]
```
### parameters
| field | type | description | required |
| :---: | :---: | :---: | :---: |
| ID | snowflake | backup id | true |
| max? | number | max messages load? default is `1000` | false |
| clear? | boolean | clear guild before load? default is `true` | false |
| main? | boolean | load the main backup? default is `true` | false |
| roles? | boolean | load roles assignment? default is `false` | false |
| emojis? | boolean | load all emojis? default is `false` | false |
<br>
<br>
<h2 align="center">Backup List</h2>

***Note:*** `$backupList[]` *simply returns an list of Backup IDs, you must fetch the ID to get complete information.*
```sh
$backupList[sep?]
```
### parameters
| field | type | description | required |
| :---: | :---: | :---: | :---: |
| sep? | string | separator between ids? default is `,` | false |
<br>
<br>
<h2 align="center">Backup Remove</h2>

Remove the backup from given ID. ***Warn:** once the backup is removed, it is impossible to recover it!*
```sh
$backupRemove[ID]
```
### parameters
| field | type | description | required |
| :---: | :---: | :---: | :---: |
| ID | snowflake | backup id | true |
<br>
<br>
<h2 align="center">Backup Fetch</h2>

Fetches information from a backup. The backup info provides a data, id, and size property.
```sh
$backupFetch[ID;type]
```
### parameters
| field | type | description | required |
| :---: | :---: | :---: | :---: |
| ID | snowflake | backup id | true |
| data | string | data to retrieve? | true |

### data type
`id`  `size`  `timestamp`  `name`  `guildid`  `icon`  `iconbase64`  `region`  `verificationlevel`  `explicitcontentfilter`  `defaultmessagenotifications`  `afkchannelid`  `afktimeout`  `roles`  `channels`  `categories`  `bans`  `emojis`  `widget`  `automoderationrules`
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
