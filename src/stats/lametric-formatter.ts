import { ChampDictionary } from "../league/champ-dictionary";

interface ILaMetricOutput {
    frames: ILaMetricFrame[];
}

interface ILaMetricFrame {
    text: string;
    icon: string;
}

// const LOGO_WARD_ICON_STRING = "i7386";
const LOGO_ICON_STRING = "i14209";
const WARD_ICON = "i14221";
const LOGO_HEALING_ICON_STRING = "i14222";
const LOGO_DEATH_ICON_STRING = "i14223";
const LOGO_KDA_ICON_STRING = "i14226";
const COIN_ICON_STRING = "i9360";
const SWORD_ICON_STRING = "i7620";
const BROKEN_WARD_ICON = "i14341";

export class LaMetricFormatter {
    private readonly champDictionary: ChampDictionary;

    constructor() {
        this.champDictionary = new ChampDictionary();
    }

    public async format(lastGame: MatchParticipant): Promise<ILaMetricOutput> {
        const frames: ILaMetricFrame[] = [];

        frames.push({
            text: `${lastGame.stats.kills}/${lastGame.stats.deaths}/${lastGame.stats.assists}`,
            icon: LOGO_KDA_ICON_STRING,
        });

        frames.push({
            text: `${this.kFormatter(lastGame.stats.totalDamageDealt)} dmg done`,
            icon: SWORD_ICON_STRING,
        });

        frames.push({
            text: `${this.kFormatter(lastGame.stats.totalDamageTaken)} dmg taken`,
            icon: SWORD_ICON_STRING,
        });

        frames.push({
            text: `${lastGame.stats.wardsPlaced} ward`,
            icon: WARD_ICON,
        });

        frames.push({
            text: `${lastGame.stats.wardsKilled} ward`,
            icon: BROKEN_WARD_ICON,
        });

        frames.push({
            text: `${this.kFormatter(lastGame.stats.goldEarned)} G`,
            icon: COIN_ICON_STRING,
        });

        frames.push({
            text: `${this.kFormatter(lastGame.stats.totalHeal)} HP`,
            icon: LOGO_HEALING_ICON_STRING,
        });

        frames.push({
            text: `${lastGame.stats.largestKillingSpree} Kill Streak`,
            icon: LOGO_DEATH_ICON_STRING,
        });

        // if (!!lastGame.stats.killingSprees && lastGame.stats.killingSprees > 1) {
        //     frames.push({
        //         text: `${this.fetchSpree(lastGame.stats.killingSprees)}`,
        //         icon: LOGO_DEATH_ICON_STRING,
        //     });
        // }

        frames.push({
            text: `${lastGame.stats.win ? "won" : "lost"}`,
            icon: LOGO_ICON_STRING,
        });

        const champTable = await this.champDictionary.fetch();

        frames.push({
            text: `${champTable[lastGame.championId].name}`,
            icon: LOGO_ICON_STRING,
        });

        return {
            frames,
        };
    }

    // private getRatio(firstNumber: number, secondNumber: number): string {
    //     const rawRatio = firstNumber / secondNumber;

    //     if (isNaN(rawRatio)) {
    //         return "1.00";
    //     }
    //     return rawRatio.toFixed(2);
    // }

    // private calculateHowManyExtraGamesWon(thisSeasonStats: AggregatedChampStats, lastSeasonStats: AggregatedChampStats): ILaMetricFrame {
    //     const thisSeasonWinRatio = this.getRatio(thisSeasonStats.stats.totalSessionsWon, thisSeasonStats.stats.totalSessionsLost);
    //     const lastSeasonWinRatio = this.getRatio(lastSeasonStats.stats.totalSessionsWon, lastSeasonStats.stats.totalSessionsLost);

    //     const totalWonRatio = this.getRatio(parseFloat(thisSeasonWinRatio), parseFloat(lastSeasonWinRatio));
    //     const totalWonRatioNumber = parseFloat(totalWonRatio);

    //     if (totalWonRatioNumber > 1) {
    //         return {
    //             text: `You have won ${totalWonRatio} times compared to Ranked ${Utility.currentRankedYear - 1}`,
    //             icon: LOGO_ICON_STRING,
    //         };
    //     } else {
    //         return {
    //             text: `You have lost ${totalWonRatio} times compared to Ranked ${Utility.currentRankedYear - 1}`,
    //             icon: LOGO_ICON_STRING,
    //         };
    //     }
    // }

    // tslint:disable-next-line:no-any
    private kFormatter(input: any): string | number {
        const num = isNaN(input) ? parseInt(input, 10) : input;

        return num > 999 ? (num / 1000).toFixed(0) + "k" : num;
    }

    // private fetchSpree(kills: number): string {
    //     switch (kills) {
    //         case 2:
    //             return "double kill";
    //         case 3:
    //             return "triple kill";
    //         case 4:
    //             return "quadra kill";
    //         case 5:
    //             return "penta kill";
    //         case 6:
    //             return "hexa kill";
    //         default:
    //             return "";
    //     }
    // }
}
