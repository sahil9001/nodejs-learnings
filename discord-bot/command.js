const { REST, Routes } = require("discord.js");

const commands = [
    {
        name: "create",
        description: "Creates a new short URL"
    }
]

const rest = new REST({ version: "10" }).setToken('token');

(async () => {
    try {
        console.log("Started refreshing application (/) commands");

        await rest.put(Routes.applicationCommands(CLIENT_ID), {
            body: commands
        });
        console.log("Successfully reloaded application (/) commands");
    } catch (err) {
        console.log(err);
    }
})();