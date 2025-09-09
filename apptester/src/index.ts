import { Discord } from "./client/discord";
import Config from "./config";

export const client = new Discord();
client.init(Config.TOKEN);