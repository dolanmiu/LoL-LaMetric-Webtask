declare enum Rank {
    I = "I",
    II = "II",
    III = "III",
    IV = "IV",
    V = "V",
}

declare enum LeagueTier {
    BRONZE = "BRONZE",
    SILVER = "SILVER",
    GOLD = "GOLD",
    PLATINUM = "PLATINUM",
    DIAMOND = "DIAMOND",
    MASTER = "MASTER",
}

declare interface LeaguePosition {
    leagueId: string;
    leagueName: string;
    tier: LeagueTier;
    queueType: string;
    rank: Rank;
    playerOrTeamId: string;
    playerOrTeamName: string;
    leaguePoints: number;
    wins: number;
    losses: number;
    veteran: boolean;
    inactive: boolean;
    freshBlood: boolean;
    hotStreak: boolean;
}
