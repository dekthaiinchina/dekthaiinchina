export default {
	name: "autoplay",
	description: "Set autoplay",
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

		player.setAutoplay(!player.isAutoplay);
		return await interaction.reply({
			embeds: [
				{
					color: 0xffffff,
					description: `Autoplay is ${player.isAutoplay ? "off" : "on"}!`,
				},
			],
		});
	},
} as ICommand;
