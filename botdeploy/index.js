const fs = require('node:fs');
const path = require('node:path');
const {	Client, Collection, Events, GatewayIntentBits, ActivityType, EmbedBuilder } = require('discord.js');

const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.once(Events.ClientReady, readyClient => {
	console.log(`Login as ${readyClient.user.tag}`);
	
	client.user.setPresence({
		activities: [
			{
				name: 'your guild!',
				type: ActivityType.Watching,
			}
		],
		status: 'online'
	});
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);

		const notFoundEmbed = new EmbedBuilder()
			.setTitle('Command Not Found')
			.setDescription(`The command \`${interaction.commandName}\` does not exist or was removed.`)
			.setColor(0xFF0000)
			.setTimestamp();

		return interaction.reply({ embeds: [notFoundEmbed], ephemeral: true });
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);

		const errorEmbed = new EmbedBuilder()
			.setTitle('Error Executing Command')
			.setDescription('An unexpected error occurred while trying to run this command.')
			.setColor(0xFF0000)
			.setTimestamp();

		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ embeds: [errorEmbed], ephemeral: true });
		} else {
			await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
		}
	}
});

client.login(token);