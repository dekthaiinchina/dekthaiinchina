export default {
	name: "skip",
	description: "Skip current song.",
	category: "music",
	run: async ({ client, interaction }: ICommandOptions) => {
		const player = client.manager.players.get(interaction.guildId!);
		if (!player || !player?.queue?.current)
			return await interaction.reply({
				embeds: [
					{
						color: 0xffffff,
						description: "No music playing in this server!",
					},
				],
			});

		player.stop();
		return await interaction.reply({
			embeds: [
				{
					color: 0xffffff,
					description: "Skipped!",
				},
			],
		});
	},
} as ICommand;
