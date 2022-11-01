//<0======================================Apply================================0>//


const Discord = require("discord.js")
const { MessageEmbed, MessageActionRow, MessageButton , MessageSelectMenu} = require("discord.js");
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require("@discordjs/voice");
const db = require('quick.db')
const client = new Discord.Client({
  //fetchAllMembers: false,
  //restTimeOffset: 0,
  //restWsBridgetimeout: 100,
  shards: "auto",
  allowedMentions: {
    parse: [ ],
    repliedUser: false,
  },
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  intents: [ 
      Discord.Intents.FLAGS.GUILDS,
      Discord.Intents.FLAGS.GUILD_MEMBERS,

      //Discord.Intents.FLAGS.GUILD_BANS,
      //Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
      //Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
      //Discord.Intents.FLAGS.GUILD_WEBHOOKS,
      //Discord.Intents.FLAGS.GUILD_INVITES,
      Discord.Intents.FLAGS.GUILD_VOICE_STATES,
      Discord.Intents.FLAGS.GUILD_PRESENCES,
      Discord.Intents.FLAGS.GUILD_MESSAGES,
      Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      //Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
      Discord.Intents.FLAGS.DIRECT_MESSAGES,
      Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
      Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING
  ],
})
const config = require('./config.json')

client.on('ready', () => {
    console.log('READY MADE BY LEONX74#9999')
    const Channels = '875299578382012426' 
})

const discordModals = require('discord-modals'); // Define the discord-modals package!
discordModals(client);
const { Modal, TextInputComponent, showModal } = require('discord-modals');



const gesendentvonbtn = new MessageActionRow()
.addComponents(
  new MessageButton()
  .setCustomId('bewerbnung')
  .setLabel('Send from: Team Mind™')
  .setEmoji('📃')
  .setStyle('SECONDARY')
  .setDisabled(true)
)

const devdelete = new MessageActionRow()
.addComponents(
  new MessageButton()
  .setCustomId('devdelete')
  .setLabel('LÖSCHEN')
  .setEmoji('🗑')
  .setStyle('DANGER')
)

client.on("interaction", async(interaction) => {
  if(!interaction.isButton()) return
  if(interaction.customId == "devdelete") {
    try {
    interaction.message.delete()
    } catch(e) {
      console('ERR * DELET BUTTON')
    }
  }})


const bewerbungsbutton = new MessageActionRow()
.addComponents(
  new MessageButton()
  .setCustomId('bewerbnung')
  .setLabel('Bewerben')
  .setEmoji('📃')
  .setStyle('DANGER')
)

client.on("message", async message => {
    const args = message.content.slice().trim().split(/ +/g);
    const user = message.author
    if (message.content.startsWith(`${config.prefix}setup-apply`)) {
message.channel.send({
    embeds: [new MessageEmbed()
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.avatarURL()
      })
      .setFooter({
        text: client.user.username,
        iconURL: client.user.avatarURL()
      })
      .setThumbnail(client.user.avatarURL())
      .setDescription(`
      **__Team Mind - Staff Apply__**
      
      *Hier kannst du dich für Team Mind als* **Teamler** *bewerben!*
      
      *um die Bewerbung zu starten drücke einfach auf die unten angeführte Reaktion!*
      
      *Du wirst über ein* **Bewerbungs Protokoll** *Fragen erhalten, die du wahrheitsgetreu beantworten solltest!*
      `)
      
      ], components: [bewerbungsbutton]
})
    }})



    const bewerbungsformular = new Modal() // We create a Modal
.setCustomId('bewerbungmodal')
.setTitle('Team Mind Bewerbung')
.addComponents(
  new TextInputComponent() // We create a Text Input Component
  .setCustomId('frageq-customid')
  .setLabel(config.QUESTIONS[0])
  .setStyle('SHORT') //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
  .setMinLength(2)
  .setMaxLength(2)
  .setPlaceholder('Was ist dein Alter?')
  .setRequired(true) // If it's required or not
)
.addComponents(
  new TextInputComponent() // We create a Text Input Component
  .setCustomId('frageqq-customid')
  .setLabel(config.QUESTIONS[2])
  .setStyle('SHORT') //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
  .setMinLength(2)
  .setMaxLength(60)
  .setPlaceholder('Warst du schon mal in einem anderen Clan?')
  .setRequired(true) // If it's required or not
)
.addComponents(
  new TextInputComponent() // We create a Text Input Component
  .setCustomId('frageqqq-customid')
  .setLabel(config.QUESTIONS[3])
  .setStyle('SHORT') //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
  .setMinLength(10)
  .setMaxLength(100)
  .setPlaceholder('Was sind deine Stärken?')
  .setRequired(true) // If it's required or not
)
.addComponents(
  new TextInputComponent() // We create a Text Input Component
  .setCustomId('frageqqqq-customid')
  .setLabel(config.QUESTIONS[4])
  .setStyle('SHORT') //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
  .setMinLength(10)
  .setMaxLength(100)
  .setPlaceholder('Was sind deine Schwächen?')
  .setRequired(true) // If it's required or not
)
.addComponents(
  new TextInputComponent() // We create a Text Input Component
  .setCustomId('frageqqqqq-customid')
  .setLabel(config.QUESTIONS[5])
  .setStyle('LONG') //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
  .setMinLength(25)
  .setMaxLength(150)
  .setPlaceholder('Warum sollten wir genau dich annehmen?')
  .setRequired(true) // If it's required or not
)



    client.on("interaction", async(interaction) => {
        if(!interaction.isButton()) return
        if(interaction.customId == "bewerbnung") {
          if(interaction.message.partial) await interaction.message.fetch();
            if(interaction.partial) await interaction.fetch();
            if(!interaction.message.guild) return;
         
    let args = interaction.message.content.slice(config.prefix.length).trim().split(/ +/)
    const user = interaction.author
        let guild = await interaction.guild.fetch();




        showModal(bewerbungsformular, {
          client: client, // Client to show the Modal through the Discord API.
          interaction: interaction // Show the modal with interaction data.
        });



/** 

        let channel_tosend = guild.channels.cache.get(config.applicationChannel);
        if(!channel_tosend) return console.log("ERR * ERR");   
 
    
            let embed = new Discord.MessageEmbed()
            .setDescription(`**INFO:** <@${interaction.user.id}> **|** \`${interaction.user.username}\` **|** \`${interaction.user.id}\``)
            .setAuthor({
              name: client.user.username,
              iconURL: client.user.avatarURL()
          })
 .setFooter({
              text: client.user.username,
              iconURL: client.user.avatarURL()
          })
.setThumbnail(client.user.avatarURL())
            .setTimestamp()
            .setDescription(`**__BOT COMMANDS 🤖__**
            *m?setup-apply* \n *m?annehmen* \n *m?ablehnen*
            
            `)
            }
            channel_tosend.send({embeds: [embed], content: `<@${interaction.user.id}>`, components: [devdelete]});
            interaction.user.send({
                content: `
✅ **|** *Danke für Ihre Bewerbung*
*Wir werden uns Ihre Bewerbung bald ansehen!*
**Bitte beachte: Wenn Sie innerhalb von 48h keine Nachricht erhalten, wurden Sie abgelehnt!**
                `
                */
            } //)
            
        })

        client.on('modalSubmit', async (modal) => {
          if(modal.customId === 'bewerbungmodal') {
            modal.reply({
              ephemeral: true,
              content: `
✅ **|** *Danke für Ihre Bewerbung*
*Wir werden uns Ihre Bewerbung bald ansehen!*
**Bitte beachte: Wenn Sie innerhalb von 48h keine Nachricht erhalten, wurden Sie abgelehnt!**
              `
            })

            const antwort1 = modal.getTextInputValue('frageq-customid');
            const antwort2 = modal.getTextInputValue('frageqq-customid');
            const antwort3 = modal.getTextInputValue('frageqqq-customid');
            const antwort4 = modal.getTextInputValue('frageqqqq-customid');
            const antwort5 = modal.getTextInputValue('frageqqqqq-customid');

       


            let channel_tosend = modal.guild.channels.cache.get(config.applicationChannel);
            if(!channel_tosend) return console.log("ERR * ERR");   

            channel_tosend.send({embeds: [new MessageEmbed()
              .setDescription(`**INFO:** <@${modal.user.id}> **|** \`${modal.user.username}\` **|** \`${modal.user.id}\``)
            .setAuthor({
              name: client.user.username,
              iconURL: client.user.avatarURL()
          })
 .setFooter({
              text: client.user.username,
              iconURL: client.user.avatarURL()
          })
.setThumbnail(client.user.avatarURL())
            .setTimestamp()
            .setDescription(`**__BOT COMMANDS 🤖__**
            *m?setup-apply* \n *m?annehmen* \n *m?ablehnen*

            > *__${config.QUESTIONS[0]}__*
            *${antwort1}*

            > *__${config.QUESTIONS[2]}__*
            *${antwort2}*

            > *__${config.QUESTIONS[3]}__*
            *${antwort3}*

            > *__${config.QUESTIONS[4]}__*
            *${antwort4}*

            > *__${config.QUESTIONS[5]}__*
            *${antwort5}*


            
            `)], content: `<@${modal.user.id}>`, components: [devdelete]});



          }})
         



client.on("message", async message => {
  try {
  const args = message.content.slice().trim().split(/ +/g);
  const user = message.author
  let User = message.mentions.users.first()
  if (message.content.startsWith(`${config.prefix}annehmen`)) {
    if(!User) return message.channel.send("Ping User.. `<@id>`")
    message.channel.send({ embeds: [new MessageEmbed()
    .setDescription(`${User} Wurde Angenommen.. (zu einen Gespräch) von: ${message.author.username} 💪 **TERMIN MUSS DER USER DEN ANNEHMER PER DM SCHREIBEN**`)
    .setAuthor({
      name: client.user.username,
      iconURL: client.user.avatarURL()
  })
.setFooter({
      text: client.user.username,
      iconURL: client.user.avatarURL()
  })
.setThumbnail(client.user.avatarURL())
    ]})

    User.send({
      embeds: [new MessageEmbed()
        .setDescription(`**Hallo ${User},**
       *Wie du siehst gefällt uns deine Bewerbung darum hat: ${message.author.username} dich zu einen Bewerbungs Gespräch Eingeladen... Schreibe einfach <@${message.author.id}> an und macht ein Termin aus...* 💪`)
       .setAuthor({
        name: client.user.username,
        iconURL: client.user.avatarURL()
    })
.setFooter({
        text: client.user.username,
        iconURL: client.user.avatarURL()
    })
.setThumbnail(client.user.avatarURL())
      ], components: [gesendentvonbtn]
    })

  }
 } catch(e) {
    message.channel.send({content: 'ERR * ER HAT SIE DMS AUS'})
  }
})

  client.on("message", async message => {
    try {
    const args = message.content.slice().trim().split(/ +/g);
    const user = message.author
    let User = message.mentions.users.first()
    if (message.content.startsWith(`${config.prefix}ablehnen`)) {
      if(!User) return message.channel.send("Ping User.. `<@id>`")
      message.channel.send({ embeds: [new MessageEmbed()
      .setDescription(`${User} Wurde Abgelehnt von: ${message.author.username} ☠️`)
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.avatarURL()
    })
.setFooter({
        text: client.user.username,
        iconURL: client.user.avatarURL()
    })
.setThumbnail(client.user.avatarURL())
      ]})
  
      User.send({
        embeds: [new MessageEmbed()
          .setDescription(`**Hallo ${User},**
         *Wie du siehst hat uns deine bewerbung leider nicht Überzeugt, darum müssen wir dir mitteilen das du abgelehnt wurdest von: ${message.author.username} | <@${message.author.id}>*  ☠️`)
         .setAuthor({
          name: client.user.username,
          iconURL: client.user.avatarURL()
      })
.setFooter({
          text: client.user.username,
          iconURL: client.user.avatarURL()
      })
.setThumbnail(client.user.avatarURL())
        ], components: [gesendentvonbtn]
      })
  
    }
    } catch(e) {
      message.channel.send({content: 'ERR * ER HAT SIE DMS AUS'})
    }
  }
    
    )
client.login(config.token)

