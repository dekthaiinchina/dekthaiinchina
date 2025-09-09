const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription('Delete messages in this channel')
		.addIntegerOption(option =>
			option.setName('amount')
				.setDescription('Number of messages to delete (max 100)')
				.setRequired(true)
		),

	async execute(interaction) {
		const amount = interaction.options.getInteger('amount');

		// Validate amount
		if (amount < 1 || amount > 100) {
			const errorEmbed = new EmbedBuilder()
				.setTitle('Invalid Amount')
				.setDescription('Please specify an amount between **1** and **100**.')
				.setColor(0xFF0000);

			return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
		}

		try {
			// Attempt to delete messages
			const deletedMessages = await interaction.channel.bulkDelete(amount, true);

			const successEmbed = new EmbedBuilder()
				.setTitle('Messages Deleted')
				.setDescription(`Successfully deleted **${deletedMessages.size}** messages.`)
				.setColor(0x00AE86)
				.setTimestamp();

			await interaction.reply({ embeds: [successEmbed], ephemeral: true });
		} catch (error) {
			console.error(error);

			const errorEmbed = new EmbedBuilder()
				.setTitle('Deletion Failed')
				.setDescription('An error occurred while deleting messages.\n\nNote: Messages older than 14 days **cannot** be deleted using this command.')
				.setColor(0xFF0000);

			await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
		}
	},
};
