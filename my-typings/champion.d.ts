declare interface Champion {
  id: string;
  title: string;
  name: string;
  key: number;
}

declare interface ChampionResponse {
  data: {
    [index: string]: Champion;
  };
  type: string;
  version: string;
}

declare interface IChampTable {
  [index: string]: Champion;
}
