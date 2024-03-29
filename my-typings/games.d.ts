declare interface Game {
  fellowPlayers: [
    {
      championId: number;
      teamId: Team;
      summonerId: number;
    }
  ];
  gameType: string;
  stats: {
    totalDamageDealtToChampions: number;
    item2: number;
    barracksKilled: number;
    goldEarned: number;
    item1: number;
    wardPlaced: number;
    item0: number;
    totalDamageTaken: number;
    trueDamageDealtPlayer: number;
    physicalDamageDealtPlayer: number;
    trueDamageDealtToChampions: number;
    killingSprees: number;
    playerRole: number;
    totalUnitsHealed: number;
    bountyLevel: number;
    playerPosition: number;
    largestCriticalStrike: number;
    level: number;
    doubleKills: number;
    neutralMinionsKilledYourJungle: number;
    totalDamageDealtToBuildings: number;
    magicDamageDealtToChampions: number;
    turretsKilled: number;
    magicDamageDealtPlayer: number;
    neutralMinionsKilledEnemyJungle: number;
    assists: number;
    magicDamageTaken: number;
    numDeaths: number;
    totalTimeCrowdControlDealt: number;
    largestMultiKill: number;
    physicalDamageTaken: number;
    team: Team;
    win: boolean;
    totalDamageDealt: number;
    largestKillingSpree: number;
    totalHeal: number;
    item4: number;
    item3: number;
    item6: number;
    item5: number;
    minionsKilled: number;
    timePlayed: number;
    wardKilled: number;
    physicalDamageDealtToChampions: number;
    championsKilled: number;
    trueDamageTaken: number;
    goldSpent: number;
    neutralMinionsKilled: number;
  };
  gameId: number;
  ipEarned: number;
  spell1: number;
  teamId: number;
  spell2: number;
  gameMode: string;
  mapId: number;
  level: number;
  invalid: boolean;
  subType: number;
  createDate: number;
  championId: number;
}

declare interface GamesResponse {
  games: Game[];
  summonerId: number;
}
