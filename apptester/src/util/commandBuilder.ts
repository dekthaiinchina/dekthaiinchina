import { ApplicationCommandDataResolvable, ChatInputCommandInteraction, InteractionResponse } from "discord.js";
import { Discord } from "../client/discord";

export type SlashCommandOptions = {
  data: ApplicationCommandDataResolvable;
  run: (client: Discord, interaction: ChatInputCommandInteraction) => Promise<void | InteractionResponse<boolean>>;
};

export class CommandBuilder {
  data: ApplicationCommandDataResolvable;
  run: (client: Discord, interaction: ChatInputCommandInteraction) => Promise<void | InteractionResponse<boolean>>;

  constructor(option: SlashCommandOptions) {
    this.data = option.data;
    this.run = option.run;
  }
}