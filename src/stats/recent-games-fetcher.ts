import * as request from "request";

export class RecentGamesFetcher {
    constructor(private readonly apiKey: string) {}

    public fetchLast(accountId: number, region: Region): Promise<MatchParticipant> {
        return new Promise<MatchParticipant>((resolve, reject) => {
            const url = `https://${region}.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}?api_key=${this.apiKey}`;
            request(
                url,
                {
                    json: true,
                },
                (error, response, body: MatchListResponse & RiotError) => {
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

                    if (body.matches.length === 0) {
                        const message = "No matches";
                        reject(message);
                        console.error("RecentGamesFetcher", message);
                        return;
                    }

                    this.fetchMatch(body.matches[0].gameId, accountId, body.matches[0].champion, region)
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

    private fetchMatch(matchId: number, accountId: number, championId: number, region: Region): Promise<MatchParticipant> {
        return new Promise<MatchParticipant>((resolve, reject) => {
            const url = `https://${region}.api.riotgames.com/lol/match/v3/matches/${matchId}?api_key=${this.apiKey}`;
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

                    const participant = body.participants.find((p, index) => {
                        return p.championId === championId;
                    });

                    resolve(participant);
                },
            );
        });
    }
}
