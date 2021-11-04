import * as request from "request";

export class RecentGamesFetcher {
    constructor(private readonly apiKey: string) {}

    public fetchLast(puuid: string, regionGroup: RegionGroup, summonerName: string): Promise<MatchParticipant> {
        return new Promise<MatchParticipant>((resolve, reject) => {
            const url = `https://${regionGroup}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${
                this.apiKey
            }`;
            console.log(url);
            request(
                url,
                {
                    json: true,
                },
                (error, response, body: string[] & RiotError) => {
                    if (response === undefined || (error && response.statusCode !== 200)) {
                        reject(error);
                        console.error("RecentGamesFetcher", error);
                        return;
                    }

                    if (body.status !== undefined) {
                        reject(body);
                        console.error("RecentGamesFetcher", JSON.stringify(body.status.message));
                        return;
                    }

                    if (body.length === 0) {
                        const message = "No matches";
                        reject(message);
                        console.error("RecentGamesFetcher", message);
                        return;
                    }

                    this.fetchMatch(body[0], summonerName, regionGroup)
                        .then((participant) => {
                            resolve(participant);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                },
            );
        });
    }

    private fetchMatch(matchId: string, summonerName: string, regionGroup: RegionGroup): Promise<MatchParticipant> {
        return new Promise<MatchParticipant>((resolve, reject) => {
            const url = `https://${regionGroup}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${this.apiKey}`;
            console.log(url);
            request(
                url,
                {
                    json: true,
                },
                (error, response, body: MatchResponse) => {
                    if (response === undefined || (error && response.statusCode !== 200)) {
                        reject(error);
                        console.error("RecentGamesFetcher", error);
                        return;
                    }

                    
                    const participant = body.info.participants.find((p) => p.summonerName.toLowerCase() === summonerName.toLowerCase());
                    resolve(participant);
                },
            );
        });
    }
}
