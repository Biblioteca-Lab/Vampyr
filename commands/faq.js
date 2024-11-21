const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('faq')
        .setDescription('Exibe o conteúdo do FAQ'),
    async execute(interaction) {
        const filePath = path.join(__dirname, '../data/faq/sobre.md');
        if (!fs.existsSync(filePath)) {
            return interaction.reply({ content: 'O arquivo FAQ não foi encontrado!', ephemeral: true });
        }

        const content = fs.readFileSync(filePath, 'utf8');
        await interaction.reply(`${content}`);
    },
};
