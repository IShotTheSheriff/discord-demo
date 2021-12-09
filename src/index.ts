import dotenv from 'dotenv';
import { Client, TextChannel } from 'discord.js';
import allowUserBotting from './utils/allowUserBotting';
import { setRestToken } from './discord/restClient';

dotenv.config();

const userToken = process.env.USER_TOKEN as string;
let drugsChannel: TextChannel | null = null;
const drugsChannelId = '910282233959579659';
let isReady = false;
const client = new Client();

async function main() {
  setRestToken(userToken);

  allowUserBotting(client);

  client.on('ready', async () => {
    isReady = true;
    console.log('🔥', 'ready');

    drugsChannel = (await client.channels.fetch(drugsChannelId)) as TextChannel;
    if (drugsChannel) {
      takeDrug();
    }
  });

  client.on('error', e => {
    console.log('🔥err', e);
  });

  client.login(userToken);

  // send using channelId

  return;
}

main();

let count = 0;
async function takeDrug() {
  const drugCmd = '!blueglass';
  if (drugsChannel) {
    await sendMessage(drugCmd, drugsChannelId);
    count++;
    console.log('🔥 taken: ', count);
  }
  const timeout = getRandom(34000, 41000);
  setTimeout(takeDrug, timeout);
}

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

function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
