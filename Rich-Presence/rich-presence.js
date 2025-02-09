const Discord = require('discord.js-selfbot-v13');
const fs = require('fs');
const path = require('path');

const presenceConfigPath = path.join(__dirname, 'presence-config.json');
const presenceConfig = JSON.parse(fs.readFileSync(presenceConfigPath, 'utf-8'));

/**
 * 
 * 
 * @param {Object} config
 * @returns {Discord.Client}
 */
const initializeDiscordClient = (config) => {
  const client = new Discord.Client({
    readyStatus: false,
    checkUpdate: false,
  });

  client.once('ready', async () => {
    console.clear();
    console.log(`Connected to Discord Client: ${client.user.tag}`);

    updateRichPresence(client);

    setInterval(() => updateRichPresence(client), 30000);
  });


  client.login(config.Authorization_Token).catch(console.error);

  return client;
};

/**
 * 
 * 
 * @param {Discord.Client} client
 */
const updateRichPresence = (client) => {
  try {
    const richPresence = new Discord.RichPresence()
      .setApplicationId(presenceConfig.1298676906941743197)
      .setType(presenceConfig.WATCHING)
      .setURL(presenceConfig.'https://www.twitch.tv/mrprocrastinatorsensei%22')
      .setState(presenceConfig.'Serving Lord Rimuru..')
      .setName(presenceConfig.'Forest of Jura')
      .setDetails(presenceConfig.'Nation of Tempest')
      .setStartTimestamp(Date.now())
      .setAssetsLargeImage(presenceConfig.'https://media.discordapp.net/attachments/1181461047736029206/1298685483546841088/tumblr_ddfd0c1510a5918a845f37d667721de6_0975f652_400.webp?ex=67a8d89b&is=67a7871b&hm=d9bb4666cc2612acd30c24f9229a94926ce6a51b44e0fae820687800b966286e&animated=true&')
      .setAssetsLargeText(presenceConfig.'Diablo')
      .setAssetsSmallImage(presenceConfig.'https://media.discordapp.net/attachments/1181461047736029206/1298685367519543326/tensura-rimuru.gif?ex=67a8d880&is=67a78700&hm=e67807de6e8abab96a683efeb99c855ade36df73428807a44a76367a1daec7c2&width=800&height=450&')
      .setAssetsSmallText(presenceConfig.'Rimuru Tempest');

    if (presenceConfig.buttons && presenceConfig.buttons.length > 0) {
      presenceConfig.buttons.forEach(button => {
        richPresence.addButton(button.label, button.url);
      });
    }

    client.user.setActivity(richPresence);
    client.user.setPresence({ status: "idle" });

    console.log('Rich Presence updated successfully!');
  } catch (error) {
    console.error('Error updating Rich Presence:', error.message);
  }
};

module.exports = initializeDiscordClient;
