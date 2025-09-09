import { GuildMember, CommandInteractionOptionResolver } from "discord.js";

export const event: IEvent<"interactionCreate"> = {
	name: "interactionCreate",
	run: async (client, interaction) => {
		if (!interaction.isCommand()) return;

		const command = client.commands.get(interaction.commandName);
		if (!command) return;

		if (interaction.isChatInputCommand()) {
			const options = interaction.options as CommandInteractionOptionResolver;

			// music-only checks
			if (command.category === "music") {
				if (!interaction.inGuild() || !(interaction.member instanceof GuildMember)) return;

				const member = interaction.member;
				const memberChannel = member.voice.channel;
				const botChannel = interaction.guild?.members.me?.voice.channel;

				if (!memberChannel) {
					return interaction.reply({
						ephemeral: true,
						embeds: [
							{ color: 0xffffff, description: "You must be in a voice channel to use this command!" },
						],
					});
				}

				if (botChannel && botChannel.id !== memberChannel.id) {
					return interaction.reply({
						ephemeral: true,
						embeds: [
							{ color: 0xffffff, description: "You must be in the same voice channel as me to use this command!" },
						],
					});
				}
			}

			await command.run({ client, interaction, args: options });
		}

		if (interaction.isUserContextMenuCommand() || interaction.isMessageContextMenuCommand()) {
			await command.run({ client, interaction, args: undefined });
		}
	},
};
