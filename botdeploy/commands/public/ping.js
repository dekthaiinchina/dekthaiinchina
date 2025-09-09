const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Check the bot latency'),

	async execute(interaction) {
		const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
		const latency = sent.createdTimestamp - interaction.createdTimestamp;
		const apiLatency = Math.round(interaction.client.ws.ping);

		const embed = new EmbedBuilder()
			.setTitle('Pong!')
			.setDescription(`**Latency:** \`${latency}ms\`\n**API Latency:** \`${apiLatency}ms\``)
			.setColor(0x00AE86)
			.setTimestamp();

		await interaction.editReply({ content: '', embeds: [embed] });
	},
};
