import { Logger } from "../logger";

export const event: IPlayerEvent<"playerDisconnect"> = {
	name: "playerDisconnect",
	run: (player) => {
		Logger.info(`Player Disconnect: ${player.guild}`);
	},
};
