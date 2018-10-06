import { LaMetricFormatter } from "./lametric-formatter";
import { PositionFetcher } from "./position-fetcher";
import { RecentGamesFetcher } from "./recent-games-fetcher";
import { SummonerFetcher } from "./summoner-fetcher";

export class StatsRouter {
    private readonly laMetricFormatter: LaMetricFormatter;
    private readonly recentGamesFetcher: RecentGamesFetcher;
    private readonly summonerFetcher: SummonerFetcher;
    private readonly positionFetcher: PositionFetcher;

    constructor(apiKey: string) {
        this.laMetricFormatter = new LaMetricFormatter();
        this.recentGamesFetcher = new RecentGamesFetcher(apiKey);
        this.summonerFetcher = new SummonerFetcher(apiKey);
        this.positionFetcher = new PositionFetcher(apiKey);
    }

    public async init(name: string, region: Region): Promise<ILaMetricOutput> {
        let summoner: Summoner;

        try {
            summoner = await this.summonerFetcher.fetchSummoner(name, region);
        } catch {
            return {
                frames: [
                    {
                        text: `Cannot find ${name} in ${region}. Have you changed your name recently?`,
                    },
                ],
            };
        }

        let stats: MatchParticipant;
        try {
            stats = await this.recentGamesFetcher.fetchLast(summoner.accountId, region);
        } catch (reason) {
            if (reason === "Private game") {
                return {
                    frames: [
                        {
                            text: "Sorry! Due to a new LoL update, the last game needs to be a Ranked Game for it to show stats!",
                        },
                    ],
                };
            }
            console.error("Stats", reason);
            return {
                frames: [
                    {
                        text: "Cannot fetch last played game. Email dolan_miu@hotmail.com, so I can fix.",
                    },
                ],
            };
        }

        let positions: LeaguePosition[];
        try {
            positions = await this.positionFetcher.fetchPosition(summoner.id, region);
        } catch (reason) {
            console.error("Position", reason);
            positions = [];
        }

        console.log(positions);

        const laMetricOutput = await this.laMetricFormatter.format(stats);

        return laMetricOutput;
    }
}
