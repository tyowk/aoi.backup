module.exports = class BackupLoad {
    constructor(backup) {
        this.name = '$backupLoad';
        this.type = 'djs';
        this.backup = backup;
    }

    async run(d) {
        const data = d.util.aoiFunc(d);
        if (data.err) return d.error(data.err);
        try {
            const splits = data.inside?.splits || [];
            const backupId = splits[0]
            const maxmessages = splits[1] !== undefined ? parseInt(splits[0], 10) : 1000;
            const clearguild = splits[2] !== undefined ? splits[1].toLowerCase() === 'true' : true;
            const main = splits[3] !== undefined ? splits[2].toLowerCase() === 'true' : true;
            const roles = splits[4] !== undefined ? splits[3].toLowerCase() === 'true' : false;
            const emojis = splits[5] !== undefined ? splits[4].toLowerCase() === 'true' : false;
            if (!backupId) throw new Error('No Backup ID Provided');
            
            const dontload = [
                main ? null : 'main',
                roles ? null : 'roleAssignments',
                emojis ? null : 'emojis'
            ].filter(item => item !== null);

            await this.backup.load(backupId, d.guild, {
                clearGuildBeforeRestore: clearguild === true,
                maxMessagesPerChannel: Math.min(maxmessages, 1000),
                speed: 250,
                doNotLoad: dontload
            });

            data.result = null;
            return { code: d.util.setCode(data) };
        } catch (err) {
            return d.aoiError.fnError(d, 'custom', {}, `${err.name}: ${err.message}`);
        }
    }
}
