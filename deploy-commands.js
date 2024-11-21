const { REST, Routes } = require('discord.js');
const { config } = require('dotenv');
const fs = require('fs');
const path = require('path');

config();

const commands = [];
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Registrando Slashcommands...');

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );

        console.log('Slashcommands registrados com sucesso!');
    } catch (error) {
        console.error('Erro ao registrar Slashcommands:', error);
    }
})();