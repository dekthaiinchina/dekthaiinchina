import { PermissionFlagsBits, EmbedBuilder } from "discord.js";
import { CommandBuilder } from "../../util/commandBuilder";
import { warnManager } from "../../util/warnManager";

export default new CommandBuilder({
    data: {
        name: "warn",
        description: "Warn a member",
        options: [
            {
                name: "user",
                description: "The member to warn",
                type: 6, // USER
                required: true,
            },
            {
                name: "reason",
                description: "Reason for the warning",
                type: 3, // STRING
                required: false,
            },
        ],
        default_member_permissions: PermissionFlagsBits.ModerateMembers.toString(),
    },

    async run(client, interaction) {
        const user = interaction.options.getUser("user", true);
        const member = await interaction.guild?.members.fetch(user.id).catch(() => null);
        const reason = interaction.options.getString("reason") || "No reason provided";

        if (!member) {
            return interaction.reply({ content: "Could not find that member.", ephemeral: true });
        }

        const count = warnManager.addWarn(interaction.guild!.id, user.id, interaction.user.id, reason);

        // eslint-disable-next-line no-empty
        try { await user.send(`You have been warned in **${interaction.guild?.name}**.\nReason: ${reason}`); } catch {}

        const embed = new EmbedBuilder()
            .setTitle("Member Warned")
            .setColor(0xffcc00)
            .setDescription(
                `**User:** ${user.tag}\n` +
                `**Moderator:** ${interaction.user.tag}\n` +
                `**Reason:** ${reason}\n` +
                `**Total Warns:** ${count}`
            )
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
});
