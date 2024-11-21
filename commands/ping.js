const { SlashCommandBuilder } = require('discord.js');
const os = require('os');
const { version: discord_version } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Exibe informações de latência e do sistema'),
    async execute(interaction) {
        const start_time = Date.now();
        await interaction.deferReply(); 
        const end_time = Date.now();

        const os_info = `${os.type()} ${os.release()} (${os.arch()})`;

        const response = `
🏓 **Ping e Informações do Sistema**
- **Latência do WebSocket:** \`${Math.round(interaction.client.ws.ping)}ms 📊\`
- **Latência da API:** \`${Math.round(end_time - start_time)}ms 🚀\`
- **Versão do Discord.js:** \`${discord_version}\`
- **Versão do Node.js:** \`${process.version}\`
- **Sistema Operacional:** \`${os_info}\`
        `;

        await interaction.editReply(response.trim());
    },
};