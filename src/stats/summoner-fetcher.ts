import * as request from "request";

export class SummonerFetcher {
    constructor(private readonly apiKey: string) {}

    public fetchSummoner(name: string, region: Region): Promise<Summoner> {
        return new Promise<Summoner>((resolve, reject) => {
            const newName = encodeURIComponent(name);
            const url = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${newName}?api_key=${this.apiKey}`;
            console.log(url);
            request.get(
                url,
                {
                    json: true,
                },
                (error, response, body: Summoner & RiotError) => {
                    if (response === undefined || (error && response.statusCode !== 200)) {
                        reject(error);
                        console.error("SummonerFetcher", error);
                        return;
                    }

                    if (body.status !== undefined) {
                        reject(body);
                        console.error("SummonerFetcher", JSON.stringify(body.status.message));
                        return;
                    }

                    if (body === undefined) {
                        reject("No Summoner found");
                        console.error("No Summoner found");
                        console.error("SummonerFetcher", body.toString());
                        return;
                    }

                    resolve(body);
                },
            );
        });
    }
}
