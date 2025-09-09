import { Logger } from "../logger";

export const event: IPlayerEvent<"queueEnd"> = {
	name: "queueEnd",
	run: async (player, track) => {
		Logger.info(`Queue End: ${player.guild}`);
		return player.destroy();
	},
};
