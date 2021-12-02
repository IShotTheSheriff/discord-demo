import dotenv from 'dotenv';
import { Client, TextChannel } from 'discord.js';
import allowUserBotting from './utils/allowUserBotting';
import { setRestToken } from './discord/restClient';

dotenv.config();

const userToken = process.env.USER_TOKEN as string;

async function main() {
  let isReady = false;
  setRestToken(userToken);
  const client = new Client();
  allowUserBotting(client);

  client.on('ready', () => {
    isReady = true;
    console.log('🔥', 'ready');
    for (const [id, ch] of client.channels.cache) {
      if (ch.type === 'text') {
        const channel = ch as TextChannel;
        console.log('🔥', channel);
        if (channel.name.includes('shill')) {
          channel.send('yo!');
        }
      }
      const channel = ch as TextChannel;
      console.log('🔥', channel);
      if (channel.name === 'qq') {
        channel.send('yo!');
      }
    }
  });

  client.login(userToken);

  // send using channelId
  async function sendMessage(message: string, channelId: string) {
    const channel = client.channels.cache.get(channelId);
    if (!isReady) {
      return;
    }

    if (channel?.isText()) {
      try {
        await channel.send(message);
      } catch (e: any) {
        console.log('🔥', 'Message failed to send', e.message);
      }
    }
  }

  return;
}

main();
