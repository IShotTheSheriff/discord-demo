import { REST } from '@discordjs/rest';

const rest = new REST({ version: '9' });

export const getRestClient = () => {
  return rest;
};

export const setRestToken = (token: string) => {
  rest.setToken(token);
};
