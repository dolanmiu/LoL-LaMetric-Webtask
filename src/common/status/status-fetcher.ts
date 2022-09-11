import * as request from "request";

export class StatusFetcher {
  constructor(private readonly apiKey: string) {}

  public fetch(region: Region): Promise<ServerStatus> {
    return new Promise<ServerStatus>((resolve, reject) => {
      const url = `https://${region}.api.riotgames.com/lol/status/v3/shard-data?api_key=${this.apiKey}`;
      console.log(url);
      request(
        url,
        {
          json: true,
        },
        (error, response, body: ServerStatus & RiotError) => {
          if (response === undefined || (error && response.statusCode !== 200)) {
            reject(error);
            return;
          }

          if (body.status !== undefined) {
            reject(body);
            return;
          }

          resolve(body);
        },
      );
    });
  }
}
