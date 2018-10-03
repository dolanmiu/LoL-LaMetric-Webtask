import "babel-polyfill";

import { RegionConverter } from "./region-converter";
import { StatsRouter } from "./stats";
import { StatusRouter } from "./status";

const ERROR_RESPONSE: ILaMetricOutput = {
    frames: [
        {
            text: `Error occurred when trying to get stats. Email dolan_miu@hotmail.com, so I can fix.`,
        },
    ],
};

module.exports = async (context, cb) => {
    const name = context.query.name as string;
    const regionString = context.query.region as string;
    const route = context.query.route as string;

    console.log(`${name} from ${regionString} is requesting`);

    if (regionString === undefined) {
        cb(null, {
            frames: [
                {
                    text: "Region cannot be empty",
                },
            ],
        } as ILaMetricOutput);
        return;
    }

    let region: Region;
    try {
        region = RegionConverter.convert(regionString);
    } catch (e) {
        cb(null, {
            frames: [
                {
                    text: `Unknown region ${regionString}`,
                },
            ],
        } as ILaMetricOutput);
        console.error("Entry Point", e);
        return;
    }

    switch (route) {
        case "stats":
            statsRoute(context.secrets.RIOT_API_KEY, name, region, cb);
            break;
        case "status":
            statusRoute(context.secrets.RIOT_API_KEY, region, cb);
            break;
        default:
            cb(404);
    }
};

async function statsRoute(apiKey: string, name: string, region: Region, cb: (err: Error, res: ILaMetricOutput) => void): Promise<void> {
    const stats = new StatsRouter(apiKey);

    if (name === undefined) {
        cb(null, {
            frames: [
                {
                    text: "name cannot be empty",
                },
            ],
        } as ILaMetricOutput);
        return;
    }

    try {
        const response = await stats.init(name, region);
        cb(null, response);
    } catch (e) {
        console.error("Stats Point", e);
        cb(null, ERROR_RESPONSE);
    }
}

async function statusRoute(apiKey: string, region: Region, cb: (err: Error, res: ILaMetricOutput) => void): Promise<void> {
    const stats = new StatusRouter(apiKey);

    try {
        const response = await stats.init(region);
        cb(null, response);
    } catch (e) {
        console.error("Status Route", e);
        cb(null, ERROR_RESPONSE);
    }
}
