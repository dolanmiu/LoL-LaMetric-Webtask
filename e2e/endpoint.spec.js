const chai = require("chai");
const request = require("request-promise");

const apiKey = "RGAPI-C0676FA0-BA1F-47F1-AD04-321D5DD6067E";

const { expect } = chai;
chai.should();
chai.use(require("chai-things"));

async function getEndPoint(url) {
    return await request({
        uri: url,
        json: true,
    });
}

async function test() {
    let response = await getEndPoint(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Deemon?api_key=${apiKey}`);
    expect(response).to.include({
        id: "pgF2b5z51x3sEPpbVUU1xxWb2ZeQKPwNg1_viU0LtJUJ03s",
        accountId: "qIvfAC3kJDBNSpAFxLOgtp7EmyyLeBSju6eEeL4licXUeA",
        name: "Deemon",
    });

    response = await getEndPoint(`http://ddragon.leagueoflegends.com/cdn/8.14.1/data/en_US/champion.json`);
    expect(response).to.include({
        type: "champion",
        format: "standAloneComplex",
        version: "8.14.1",
    });
    expect(response)
        .to.have.property("data")
        .which.has.property("Aatrox");

    response = await getEndPoint(`https://euw1.api.riotgames.com/lol/match/v4/matchlists/by-account/qIvfAC3kJDBNSpAFxLOgtp7EmyyLeBSju6eEeL4licXUeA?api_key=${apiKey}`);
    expect(response)
        .to.have.property("matches")
        .that.is.an("array").which.is.not.empty;
    expect(response).to.have.property("totalGames");

    response = await getEndPoint(`https://euw1.api.riotgames.com/lol/match/v4/matches/3728998694?api_key=${apiKey}`);
    expect(response)
        .to.have.property("participants")
        .that.is.an("array").which.is.not.empty;

    response = await getEndPoint(`https://euw1.api.riotgames.com/lol/status/v3/shard-data?api_key=${apiKey}`);
    expect(response).to.include({
        name: "EU West",
        slug: "euw",
        region_tag: "eu",
    });
    expect(response)
        .to.have.property("services")
        .that.is.an("array").which.is.not.empty;

    response = await getEndPoint(`https://euw1.api.riotgames.com/lol/league/v4/positions/by-summoner/pgF2b5z51x3sEPpbVUU1xxWb2ZeQKPwNg1_viU0LtJUJ03s?api_key=${apiKey}`);
    response.should.all.have.property("queueType");
    response.should.all.have.property("hotStreak");
    response.should.all.have.property("wins");
    response.should.all.have.property("losses");
    response.should.all.have.property("rank");
    response.should.all.have.property("tier");
    response.should.all.have.property("leaguePoints");
}

test();
