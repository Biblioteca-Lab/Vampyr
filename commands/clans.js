const { SlashCommandBuilder, StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clans')
        .setDescription('Lista os clãs disponíveis'),
    async execute(interaction) {
        const clansDir = path.join(__dirname, '../data/clans');
        const clanFiles = fs.readdirSync(clansDir).filter(file => file.endsWith('.md'));

        if (clanFiles.length === 0) {
            return interaction.reply({ content: 'Nenhum clã encontrado!', ephemeral: true });
        }

        const options = clanFiles.map(file => ({
            label: file.replace('.md', ''),
            description: `Leia sobre o clã ${file.replace('.md', '')}`,
            value: file
        }));

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('select-clan')
            .setPlaceholder('Escolha um clã para exibir')
            .addOptions(options);

        const row = new ActionRowBuilder().addComponents(selectMenu);

        await interaction.reply({ content: 'Escolha um clã:', components: [row] });

        const filter = i => i.customId === 'select-clan' && i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async i => {
            const filePath = path.join(clansDir, i.values[0]);
            const content = fs.readFileSync(filePath, 'utf8');
            await i.update({
                content: content,
                components: []
            });
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                interaction.editReply({ content: 'Tempo expirado! \nNenhum clã foi selecionado.', components: [] });
            }
        });
    },
};
