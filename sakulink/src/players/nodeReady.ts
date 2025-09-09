import { Logger } from "../logger";

export const event: IPlayerEvent<"nodeConnect"> = {
	name: "nodeConnect",
	run: async (node) => {
		Logger.info(`Node Connect: ${node.options.identifier}`);
	},
};
