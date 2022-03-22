const Discord = require("discord.js")
const client = new Discord.Client(
    {intents:["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_PRESENCES", "GUILD_MEMBERS"] }
)

client.login(process.env.token)

client.on("ready", () => {
    console.log("bot online")
    })

    client.on("messageCreate", message => {
        if (message.content == "!nuovoticketgrafica") {
            var embedticket = new Discord.MessageEmbed()
            .setColor('#00ff6d')
            .setTitle('GRAFICA')
            .setDescription('Clicca sul bottone per richiedere una grafica')
            .setThumbnail('https://cdn.discordapp.com/attachments/951966053448175656/952200372649357383/Logo_los_brasileiros_Tavola_disegno_1.png')
            
            var button1 = new Discord.MessageButton()
                .setLabel("Richiedi una grafica")
                .setCustomId("apriTicket2")
                .setStyle("PRIMARY")
    
            var row = new Discord.MessageActionRow()
                .addComponents(button1)
    
            message.channel.send({ embeds: [embedticket], components: [row] })
        }
    })
    
    client.on("interactionCreate", interaction => {
        if (interaction.customId == "apriTicket2") {
            interaction.deferUpdate()
            if (interaction.guild.channels.cache.find(canale => canale.topic == `User ID: ${interaction.user.id}`)) {
                interaction.user.send("Hai gia un ticket aperto").catch(() => { })
                return
            }
            interaction.guild.channels.create(interaction.user.username, {
                type: "text",
                topic: `User ID: ${interaction.user.id}`,
                parent: "955103019182198855", //Settare la categoria,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: ["VIEW_CHANNEL"]
                    },
                    {
                        id: interaction.user.id,
                        allow: ["VIEW_CHANNEL"]
                    },
                    {
                        id: "948595809946046574",
                        allow: ["VIEW_CHANNEL"]
                    },
                    {
                        id: "949326008153169990",
                        allow: ["VIEW_CHANNEL"]
                    },
                    {
                        id: "949657539337924608",
                        allow: ["VIEW_CHANNEL"]
                    }
                ]
            }).then(canale => {
                canale.send('Grazie per aver aperto un ticket, entra nel server ByZCX per visualizzare il listino grafiche e richiederne una! https://discord.gg/7DsnkqvGMH' + mesage.author.toString())
            })
        }
    })
    
    client.on("messageCreate", message => {
        if (message.content == "!close") {
            var topic = message.channel.topic;
            if (!topic) {
                message.channel.send("Non puoi utilizzare questo comando qui");
                return
            }
            if (topic.startsWith("User ID:")) {
                var idUtente = topic.slice(9);
                if (message.author.id == idUtente || message.member.permissions.has("MANAGE_CHANNELS")) {
                    message.channel.delete();
                }
            }
            else {
                message.channel.send("Non puoi utilizzare questo comando qui")
            }
        }
        if (message.content.startsWith("!add")) {
            var topic = message.channel.topic;
            if (!topic) {
                message.channel.send("Non puoi utilizzare questo comando qui");
                return
            }
            if (topic.startsWith("User ID:")) {
                var idUtente = topic.slice(9);
                if (message.author.id == idUtente || message.member.permissions.has("MANAGE_CHANNELS")) {
                    var utente = message.mentions.members.first();
                    if (!utente) {
                        message.channel.send("Inserire un utente valido");
                        return
                    }
                    var haIlPermesso = message.channel.permissionsFor(utente).has("VIEW_CHANNEL", true)
                    if (haIlPermesso) {
                        message.channel.send("Questo utente ha gia accesso al ticket")
                        return
                    }
                    message.channel.permissionOverwrites.edit(utente, {
                        VIEW_CHANNEL: true
                    })
                    message.channel.send(`${utente.toString()} è stato aggiunto al ticket`)
                }
            }
            else {
                message.channel.send("Non puoi utilizzare questo comando qui")
            }
        }
        if (message.content.startsWith("!remove")) {
            var topic = message.channel.topic;
            if (!topic) {
                message.channel.send("Non puoi utilizzare questo comando qui");
                return
            }
            if (topic.startsWith("User ID:")) {
                var idUtente = topic.slice(9);
                if (message.author.id == idUtente || message.member.permissions.has("MANAGE_CHANNELS")) {
                    var utente = message.mentions.members.first();
                    if (!utente) {
                        message.channel.send("Inserire un utente valido");
                        return
                    }
                    var haIlPermesso = message.channel.permissionsFor(utente).has("VIEW_CHANNEL", true)
                    if (!haIlPermesso) {
                        message.channel.send("Questo utente non ha già accesso al ticket")
                        return
                    }
                    if (utente.permissions.has("MANAGE_CHANNELS")) {
                        message.channel.send("Non puoi rimuovere questo utente")
                        return
                    }
                    message.channel.permissionOverwrites.edit(utente, {
                        VIEW_CHANNEL: false
                    })
                    message.channel.send(`${utente.toString()} è stato rimosso al ticket`)
                }
            }
            else {
                message.channel.send("Non puoi utilizzare questo comando qui")
            }
        }
    })
    