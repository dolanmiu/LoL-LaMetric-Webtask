declare type GameMode = "CLASSIC";
declare type GameType = "MATCHED_GAME";
declare const enum Team {
  Blue = 200,
  Red = 200,
}
declare type WinLose = "Win" | "Fail";
declare type Tier = "BRONZE" | "SILVER" | "GOLD" | "PLAT" | "DIAMOND" | "CHALLENGER";
declare type LanePosition = "JUNGLE" | "TOP" | "MID" | "BOTTOM" | "SUPPORT";

declare interface MatchParticipant {
  assists: number;
  baronKills: number;
  bountyLevel: number;
  champExperience: number;
  champLevel: number;
  championId: number;
  championName: string;
  championTransform: number;
  consumablesPurchased: number;
  damageDealtToBuildings: number;
  damageDealtToObjectives: number;
  damageDealtToTurrets: number;
  damageSelfMitigated: number;
  deaths: number;
  detectorWardsPlaced: number;
  doubleKills: number;
  dragonKills: number;
  firstBloodAssist: boolean;
  firstBloodKill: boolean;
  firstTowerAssist: boolean;
  firstTowerKill: boolean;
  gameEndedInEarlySurrender: boolean;
  gameEndedInSurrender: boolean;
  goldEarned: number;
  goldSpent: number;
  individualPosition: LanePosition;
  inhibitorKills: number;
  inhibitorTakedowns: number;
  inhibitorsLost: number;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
  itemsPurchased: number;
  killingSprees: number;
  kills: number;
  lane: LanePosition;
  largestCriticalStrike: number;
  largestKillingSpree: number;
  largestMultiKill: number;
  longestTimeSpentLiving: number;
  magicDamageDealt: number;
  magicDamageDealtToChampions: number;
  magicDamageTaken: number;
  neutralMinionsKilled: number;
  nexusKills: number;
  nexusLost: number;
  nexusTakedowns: number;
  objectivesStolen: number;
  objectivesStolenAssists: number;
  participantId: number;
  pentaKills: number;
  perks: {
    statPerks: {
      defense: number;
      flex: number;
      offense: number;
    };
    styles: [
      {
        description: string;
        selections: [
          {
            perk: number;
            var1: number;
            var2: number;
            var3: number;
          },
          {
            perk: number;
            var1: number;
            var2: number;
            var3: number;
          },
          {
            perk: number;
            var1: number;
            var2: number;
            var3: number;
          },
          {
            perk: number;
            var1: number;
            var2: number;
            var3: number;
          }
        ];
        style: number;
      },
      {
        description: string;
        selections: [
          {
            perk: number;
            var1: number;
            var2: number;
            var3: number;
          },
          {
            perk: number;
            var1: number;
            var2: number;
            var3: number;
          }
        ];
        style: number;
      }
    ];
  };
  physicalDamageDealt: number;
  physicalDamageDealtToChampions: number;
  physicalDamageTaken: number;
  profileIcon: number;
  puuid: string;
  quadraKills: number;
  riotIdName: string;
  riotIdTagline: string;
  role: string;
  sightWardsBoughtInGame: number;
  spell1Casts: number;
  spell2Casts: number;
  spell3Casts: number;
  spell4Casts: number;
  summoner1Casts: number;
  summoner1Id: number;
  summoner2Casts: number;
  summoner2Id: number;
  summonerId: string;
  summonerLevel: number;
  summonerName: string;
  teamEarlySurrendered: boolean;
  teamId: number;
  teamPosition: LanePosition;
  timeCCingOthers: number;
  timePlayed: number;
  totalDamageDealt: number;
  totalDamageDealtToChampions: number;
  totalDamageShieldedOnTeammates: number;
  totalDamageTaken: number;
  totalHeal: number;
  totalHealsOnTeammates: number;
  totalMinionsKilled: number;
  totalTimeCCDealt: number;
  totalTimeSpentDead: number;
  totalUnitsHealed: number;
  tripleKills: number;
  trueDamageDealt: number;
  trueDamageDealtToChampions: number;
  trueDamageTaken: number;
  turretKills: number;
  turretTakedowns: number;
  turretsLost: number;
  unrealKills: number;
  visionScore: number;
  visionWardsBoughtInGame: number;
  wardsKilled: number;
  wardsPlaced: number;
  win: boolean;
}

declare interface MatchResponse {
  gameId: Number;
  platformId: Region;
  gameCreation: Number;
  gameDuration: Number;
  queueId: Number;
  mapId: Number;
  seasonId: Number;
  gameVersion: string;
  gameMode: GameMode;
  gameType: GameType;
  teams: [
    {
      teamId: Team;
      win: WinLose;
      firstBlood: boolean;
      firstTower: boolean;
      firstInhibitor: boolean;
      firstBaron: boolean;
      firstDragon: boolean;
      firstRiftHerald: boolean;
      towerKills: number;
      inhibitorKills: number;
      baronKills: number;
      dragonKills: number;
      vilemawKills: number;
      riftHeraldKills: number;
      dominionVictoryScore: number;
      bans: [
        {
          championId: number;
          pickTurn: number;
        }
      ];
    }
  ];
  metadata: {
    participants: string[];
  };
  info: {
    participants: MatchParticipant[];
  };
  participantIdentities: [
    {
      participantId: number;
      player?: {
        platformId: Region;
        accountId: number;
        summonerName: string;
        summonerId: number;
        currentPlatformId: Region;
        currentAccountId: number;
        matchHistoryUri: string;
        profileIcon: number;
      };
    }
  ];
}
