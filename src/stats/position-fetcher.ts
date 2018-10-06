import * as request from "request-promise";

export class PositionFetcher {
    constructor(private readonly apiKey: string) {}

    public async fetchPosition(summonerId: number, region: Region): Promise<LeaguePosition[]> {
        const response: LeaguePosition[] = await request({
            url: `https://${region}.api.riotgames.com/lol/league/v3/positions/by-summoner/${summonerId}?api_key=${this.apiKey}`,
            json: true,
        });

        return response;
    }
}
