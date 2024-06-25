module.exports = class BackupLoadFunc {
    constructor(backup) {
        this.name = '$backupLoad';
        this.type = 'djs';
        this.backup = backup;
    }

    async execute(d) {
        const data = d.util.aoiFunc(d);
        if (data.err) return d.error(data.err);

        const [
            backupId,
            maxmessages = 0,
            clearguild = true,
            main = false,
            roles = true,
            emojis = true
        ] = data.inside.splits;

        if (!backupId) {
            return d.aoiError.fnError(d, 'custom', { inside: data.inside }, 'No Backup ID Provided In');
        }

        const dontload = [
            main ? null : 'main',
            roles ? null : 'roleAssignments',
            emojis ? null : 'emojis'
        ].filter(item => item !== null && item !== undefined);

        await this.backup.load(backupId, d.message.guild, {
            clearGuildBeforeRestore: clearguild === 'true',
            maxMessagesPerChannel: parseInt(maxmessages >= 100 ? 100 : maxmessages, 10),
            speed: 250,
            doNotLoad: dontload ?? []
        });

        data.result = null;
        return {
            code: d.util.setCode(data),
        };
    }
}
