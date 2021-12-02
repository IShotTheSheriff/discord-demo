export default function allowUserBotting(client: any): void {
  client.rest.getAuth = function () {
    const token = this.client.token || this.client.accessToken;
    if (token) return `${token}`;
    throw new Error('TOKEN_MISSING');
  };
}
