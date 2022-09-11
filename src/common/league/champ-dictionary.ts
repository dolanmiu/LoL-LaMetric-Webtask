import * as request from "request";

export class ChampDictionary {
  public fetch(): Promise<IChampTable> {
    return this.createPromise();
  }

  private createPromise(): Promise<IChampTable> {
    return new Promise<IChampTable>((resolve, reject) => {
      const url = `http://ddragon.leagueoflegends.com/cdn/8.14.1/data/en_US/champion.json`;
      request.get(
        url,
        {
          json: true,
        },
        (error, response, body: ChampionResponse & RiotError) => {
          if (response === undefined || (error && response.statusCode !== 200)) {
            reject(error);
            console.error("ChampDictionary", body.toString());
            return;
          }

          if (body.status !== undefined) {
            reject(body);
            console.error("ChampDictionary", JSON.stringify(body.status.message));
            return;
          }

          const idDictionary = this.mapChampsToId(body.data);
          resolve(idDictionary);
        },
      );
    });
  }

  private mapChampsToId(champs: { [index: string]: Champion }): { [index: number]: Champion } {
    const newDictionary: { [index: number]: Champion } = {};

    for (const champKey in champs) {
      if (champs.hasOwnProperty(champKey)) {
        const champ = champs[champKey];
        newDictionary[champ.key] = champ;
      }
    }

    return newDictionary;
  }
}
