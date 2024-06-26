module.exports = class BackupCreate {
    constructor(backup) {
        this.name = '$backupCreate';
        this.type = 'djs';
        this.backup = backup;
    }

    async execute(d) {
        const data = d.util.aoiFunc(d);
        if (data.err) return d.error(data.err);
        
        try {
            const splits = data.inside?.splits || [];
            const maxmessages = splits[0] !== undefined ? parseInt(splits[0], 10) : 10;
            const backupmembers = splits[1] !== undefined ? splits[1].toLowerCase() === 'true' : false;
            const channels = splits[2] !== undefined ? splits[2].toLowerCase() === 'true' : true;
            const roles = splits[3] !== undefined ? splits[3].toLowerCase() === 'true' : true;
            const bans = splits[4] !== undefined ? splits[4].toLowerCase() === 'true' : false;
            const emojis = splits[5] !== undefined ? splits[5].toLowerCase() === 'true' : false;
            
            const dontbackup = [
                channels ? null : 'channels',
                roles ? null : 'roles',
                bans ? null : 'bans',
                emojis ? null : 'emojis'
            ].filter(item => item !== null && item !== undefined);

            const backupData = await this.backup.create(d.guild, {
                maxMessagesPerChannel: Math.min(maxmessages, 1000),
                jsonSave: true,
                jsonBeautify: true,
                doNotBackup: dontbackup,
                backupMembers: backupmembers,
                saveImages: 'base64'
            });

            data.result = backupData.id;
            return { code: d.util.setCode(data) };
        } catch (err) {
            return d.aoiError.fnError(d, 'custom', {}, `${err.name}: ${err.message}`);
        }
    }
};
