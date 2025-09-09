import { EmbedBuilder, MessageFlags } from "discord.js";
import { CommandBuilder } from "../../util/commandBuilder";

export default new CommandBuilder({
    data: {
        name: "ping",
        description: "Get the ping of the bot.",
    },
    async run(client, interaction): Promise<void> {
        const embed = new EmbedBuilder()
            .setTitle("This is ping")
            .setDescription(`API Latency: ${client.ws.ping}ms`);
        await interaction.reply({
            embeds: [embed],
            flags: MessageFlags.Ephemeral
        });
        return;
    },
})