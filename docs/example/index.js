const { AoiClient } = require("aoi.js");
const { AoiBackup } = require("../../src/index.js");

const client = new AoiClient({
    token: process.env.TOKEN,
    prefix: process.env.PREFIX,
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

client.command({
    name: 'create',
    code: `backup created: $backupCreate[]`
});

client.command({
    name: 'load',
    code: `$backupLoad[$message[1]]
$onlyForIds[$guildOwnerId;guild owner only!]`
});

client.command({
    name: 'list',
    code: `$backupList[, ]`
});

client.command({
    name: 'remove',
    code: `backup Removed!
    $backupRemove[$message[1]]`
});

client.command({
    name: 'fetch',
    code: `$description[\`\`\`js
$backupFetch[$message[1];$message[2]]\`\`\`]`
});
