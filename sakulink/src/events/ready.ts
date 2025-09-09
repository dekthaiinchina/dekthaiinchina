import { Logger } from "../logger";

export const event: IEvent<"ready"> = {
	name: "ready",
	run: async (client) => {
		if (!client.user) return;

		Logger.info(`Login as ${client.user?.tag}`);

		client.user.setPresence({
			activities: [
				{
					name: "with Lavalink!",
					type: 1,
				}
			],
			status: "online",
		});
	},
};
