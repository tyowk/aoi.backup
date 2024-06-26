module.exports = class BackupLoad {
    constructor(backup) {
        this.name = '$backupLoad';
        this.type = 'djs';
        this.backup = backup;
    }

    async execute(d) {
        const data = d.util.aoiFunc(d);
        if (data.err) return d.error(data.err);
        try {
            const [
                backupId,
                maxmessages = 0,
                clearguild = true,
                main = true,
                roles = false,
                emojis = false
            ] = data.inside.splits;
            if (!backupId) throw new Error('No Backup ID Provided');
            
            const dontload = [
                main ? null : 'main',
                roles ? null : 'roleAssignments',
                emojis ? null : 'emojis'
            ].filter(item => item !== null);

            await this.backup.load(backupId, d.guild, {
                clearGuildBeforeRestore: clearguild === 'true',
                maxMessagesPerChannel: parseInt(maxmessages >= 100 ? 100 : maxmessages, 10),
                speed: 250,
                doNotLoad: dontload ?? []
            });

            data.result = null;
            return { code: d.util.setCode(data) };
        } catch (err) {
            return d.aoiError.fnError(d, 'custom', {}, `${err.name}: ${err.message}`);
        }
    }
}
