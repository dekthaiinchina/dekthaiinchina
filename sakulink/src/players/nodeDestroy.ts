import { Logger } from "../logger";

export const event: IPlayerEvent<"nodeDisconnect"> = {
	name: "nodeDisconnect",
	run: async (node, reason) => {
		Logger.info(`Destroyed Event: ${node.options.identifier}`);
	},
};
