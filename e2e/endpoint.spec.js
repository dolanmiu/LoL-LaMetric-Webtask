const chai = require("chai");
const request = require("request-promise");

const apiKey = process.env.RIOT_API_KEY;

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
    let response = await getEndPoint(`https://euw1.api.riotgames.com/lol/summoner/v3/summoners/by-name/Deemon?api_key=${apiKey}`);
    expect(response).to.include({
        id: 27692762,
        accountId: 31506214,
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

    response = await getEndPoint(`https://euw1.api.riotgames.com/lol/match/v3/matchlists/by-account/31506214?api_key=${apiKey}`);
    expect(response)
        .to.have.property("matches")
        .that.is.an("array").which.is.not.empty;
    expect(response).to.have.property("totalGames");

    response = await getEndPoint(`https://euw1.api.riotgames.com/lol/match/v3/matches/3728998694?api_key=${apiKey}`);
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

    response = await getEndPoint(`https://euw1.api.riotgames.com/lol/league/v3/positions/by-summoner/27692762?api_key=${apiKey}`);
    response.should.all.have.property("queueType");
    response.should.all.have.property("hotStreak");
    response.should.all.have.property("wins");
    response.should.all.have.property("losses");
    response.should.all.have.property("rank");
    response.should.all.have.property("tier");
    response.should.all.have.property("leaguePdoints");
}

test();
