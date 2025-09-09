import { Logger } from "../logger";

export const event: IPlayerEvent<"playerDestroy"> = {
	name: "playerDestroy",
	run: (player) => {
		Logger.info(`Player Destroy: ${player.guild}`);
	},
};
