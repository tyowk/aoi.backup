module.exports = class BackupCreateFunc {
    constructor(backup) {
        this.name = '$backupCreate';
        this.type = 'djs';
        this.backup = backup;
    }

    async execute(d) {
        const data = d.util.aoiFunc(d);
        if (data.err) return d.error(data.err);

        const [
            maxmessages = 0,
            backupmembers = false,
            channels = true,
            roles = true,
            bans = false,
            emojis = false
        ] = data.inside.splits;

        const dontbackup = [
            channels ? null : 'channels',
            roles ? null : 'roles',
            bans ? null : 'bans',
            emojis ? null : 'emojis'
        ].filter(item => item !== null && item !== undefined);

        const backupData = await this.backup.create(d.message.guild, {
            maxMessagesPerChannel: parseInt(maxmessages >= 100 ? 100 : maxmessages, 10),
            jsonSave: true,
            jsonBeautify: true,
            doNotBackup: dontbackup,
            backupMembers: backupmembers === true,
            saveImages: 'base64'
        });

        data.result = backupData.id;
        return {
            code: d.util.setCode(data),
        };
    }
}
