import { PermissionFlagsBits, EmbedBuilder } from "discord.js";
import { CommandBuilder } from "../../util/commandBuilder";
import { warnManager } from "../../util/warnManager";

export default new CommandBuilder({
    data: {
        name: "unwarn",
        description: "Clear all warnings for a member",
        options: [
            {
                name: "user",
                description: "The member whose warns to clear",
                type: 6, // USER
                required: true,
            },
        ],
        default_member_permissions: PermissionFlagsBits.ModerateMembers.toString(),
    },

    async run(client, interaction) {
        const user = interaction.options.getUser("user", true);

        warnManager.clearWarns(interaction.guild!.id, user.id);

        const embed = new EmbedBuilder()
            .setTitle("Warnings Cleared")
            .setColor(0x57f287)
            .setDescription(
                `**User:** ${user.tag} (${user.id})\n` +
                `**Moderator:** ${interaction.user.tag}`
            )
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
});
