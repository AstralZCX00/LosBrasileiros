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
            var embed4 = new Discord.MessageEmbed()
        .setColor('#ff002b')
        .setTitle('PREZZI GRAFICHE')
        .setDescription('nei fields sottostanti troverete i prezzi delle grafiche')
        .setThumbnail('https://cdn.discordapp.com/attachments/947563942866198549/948322773246279730/ByZCX.jpg')
        .addField('\u200b', '\u200b')
        .addFields(
             {
                 name: 'LOGO',
                 value: '€50.00',
                 inline: false 
             },
             {
                 name: 'BANNER',
                 value: '€45.00',
                 inline: false
             },
             {
                 name: 'COPERTINE',
                 value: '€35.00',
                 inline: false
             },
             {
                 name: 'STICKER',
                 value: '€15.00 x3',
                 inline: false
             },
             {
                 name: 'SFONDO PC/CELLULARE',
                 value: '€35.00 per cellulare e pc 16:9, €45.00 per pc con risoluzione diversa da quella standard',
                 inline: false
             },
             {
                 name: 'VIDEO CLIP',
                 value: '€55.00 ogni 15 minuti (i prezzi veranno scalati in base alla lunghezza del video clip) + preventivo di €15.00',
                 inline: false
             },
             {
                 name: 'INTRO/OUTRO',
                 value: '€65.00 per x1 intro + x1 outro',
                 inline: false
             }
        )
        message.author.send({ embeds: [embed4] })
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
    