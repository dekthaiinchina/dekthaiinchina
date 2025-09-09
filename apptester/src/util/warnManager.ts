import { Collection } from "discord.js";

interface Warn {
    moderatorId: string;
    reason: string;
    date: Date;
}

class WarnManager {
    private warns: Collection<string, Warn[]> = new Collection();

    addWarn(guildId: string, userId: string, moderatorId: string, reason: string) {
        const key = `${guildId}-${userId}`;
        const userWarns = this.warns.get(key) || [];
        userWarns.push({ moderatorId, reason, date: new Date() });
        this.warns.set(key, userWarns);
        return userWarns.length;
    }

    getWarns(guildId: string, userId: string): Warn[] {
        return this.warns.get(`${guildId}-${userId}`) || [];
    }

    clearWarns(guildId: string, userId: string) {
        this.warns.delete(`${guildId}-${userId}`);
    }
}

export const warnManager = new WarnManager();
