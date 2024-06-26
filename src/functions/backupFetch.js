module.exports = class BackupFetch {
    constructor(backup) {
        this.name = '$backupFetch';
        this.type = 'djs';
        this.backup = backup;
    }

    async execute(d) {
        const data = d.util.aoiFunc(d);
        if (data.err) return d.error(data.err);

        try {
            const [backupId, dataType] = data.inside.splits.map(item => item.toLowerCase());
            if (!backupId) throw new Error('No Backup ID Provided');
            if (!dataType) throw new Error('No Backup Data Type Provided');

            const backupData = await this.backup.fetch(backupId);
            if (!backupData) throw new Error('No Backup Found');

            let result;
            switch (dataType) {
                case 'id':
                    result = backupData.id;
                    break;
                case 'size':
                    result = backupData.size;
                    break;
                case 'timestamp':
                    result = backupData.data.createdTimestamp;
                    break;
                case 'name':
                    result = backupData.data.name;
                    break;
                case 'guildid':
                    result = backupData.data.guildID;
                    break;
                case 'icon':
                    result = backupData.data.iconURL;
                    break;
                case 'iconbase64':
                    result = backupData.data.iconBase64;
                    break;
                case 'region':
                    result = backupData.data.region;
                    break;
                case 'verificationlevel':
                    result = backupData.data.verificationLevel;
                    break;
                case 'explicitcontentfilter':
                    result = backupData.data.explicitContentFilter;
                    break;
                case 'defaultmessagenotifications':
                    result = backupData.data.defaultMessageNotifications;
                    break;
                case 'afkchannelid':
                    result = backupData.data.afkChannelID;
                    break;
                case 'afktimeout':
                    result = backupData.data.afkTimeout;
                    break;
                case 'roles':
                    result = backupData.data.roles.map(role => ({
                        name: role.name?.replace('@everyone', '`@everyone`').replace('@here', '`@here`'),
                        color: role.color,
                        hoist: role.hoist,
                        position: role.position,
                        permissions: role.permissions,
                        mentionable: role.mentionable
                    }));
                    break;
                case 'channels':
                    result = backupData.data.channels.others.map(channel => ({
                        name: channel.name,
                        type: channel.type,
                        nsfw: channel.nsfw,
                        ratelimitperuser: channel.rateLimitPerUser,
                        topic: channel.topic,
                        permissions: channel.permissions.map(perm => ({
                            role: perm.role,
                            allow: perm.allow,
                            deny: perm.deny
                        }))
                    }));
                    break;
                case 'categories':
                    result = backupData.data.channels.categories.map(category => ({
                        name: category.name,
                        position: category.position,
                        permissions: category.permissions.map(perm => ({
                            role: perm.role,
                            allow: perm.allow,
                            deny: perm.deny
                        }))
                    }));
                    break;
                case 'bans':
                    result = backupData.data.bans.map(ban => ({
                        id: ban.id,
                        reason: ban.reason
                    }));
                    break;
                case 'emojis':
                    result = backupData.data.emojis.map(emoji => ({
                        name: emoji.name,
                        url: emoji.url
                    }));
                    break;
                case 'widget':
                    result = {
                        enabled: backupData.data.widget.enabled,
                        channel: backupData.data.widget.channel
                    };
                    break;
                case 'automoderationrules':
                    result = backupData.data.autoModerationRules.map(rule => ({
                        name: rule.name,
                        eventType: rule.eventType,
                        triggerType: rule.triggerType,
                        triggerMetadata: {
                            mentionTotalLimit: rule.triggerMetadata.mentionTotalLimit,
                            mentionRaidProtectionEnabled: rule.triggerMetadata.mentionRaidProtectionEnabled
                        },
                        actions: rule.actions.map(action => ({
                            type: action.type,
                            metadata: {
                                durationSeconds: action.metadata.durationSeconds,
                                channelId: action.metadata.channelId,
                                customMessage: action.metadata.customMessage
                            }
                        })),
                        enabled: rule.enabled,
                        exemptRoles: rule.exemptRoles,
                        exemptChannels: rule.exemptChannels
                    }));
                    break;
                default:
                    throw new Error('Invalid Backup Data Type Provided');
            }

            if (typeof result !== 'string' && typeof result !== 'number' && result !== undefined) {
                result = JSON.stringify(result, null, 2);
            }

            data.result = result;
            return { code: d.util.setCode(data) };
        } catch (err) {
            return d.aoiError.fnError(d, 'custom', {}, `${err.name}: ${err.message}`);
        }
    }
};
