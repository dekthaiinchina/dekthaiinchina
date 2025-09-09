import { Logger } from "../logger";

export const event: IPlayerEvent<"playerCreate"> = {
	name: "playerCreate",
	run: (player) => {
		Logger.info(`Player Create: ${player.guild}`);
	},
};
