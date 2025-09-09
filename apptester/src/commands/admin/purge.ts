import { PermissionFlagsBits, MessageFlags } from "discord.js";
import { CommandBuilder } from "../../util/commandBuilder";

export default new CommandBuilder({
    data: {
        name: "purge",
        description: "Delete multiple messages at once",
        options: [
            {
                name: "amount",
                description: "Number of messages to delete (1-100)",
                type: 4, // Integer
                required: true,
            },
        ],
        default_member_permissions: PermissionFlagsBits.ManageMessages.toString(),
    },
    
    async run(client, interaction) {
        const amount = interaction.options.getInteger("amount", true);
        if (amount < 1 || amount > 100) {
            return interaction.reply({
                content: "You must specify a number between **1 and 100**.",
                flags: MessageFlags.Ephemeral,
            });
        }

        // Fetch and delete
        try {
            const deleted = await interaction.channel!.bulkDelete(amount, true);
            return interaction.reply({
                content: `Successfully deleted **${deleted.size}** messages.`,
                flags: MessageFlags.Ephemeral,
            });
        } catch (err) {
            console.error(err);
            return interaction.reply({
                content: "I couldn’t delete messages here. Do I have **Manage Messages** permission?",
                flags: MessageFlags.Ephemeral,
            });
        }
    },
});
