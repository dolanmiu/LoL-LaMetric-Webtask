import "babel-polyfill";

import { StatsRouter } from "./stats";
import { RegionConverter } from "./region-converter";

const stats = new StatsRouter("");

module.exports = async (context, cb) => {
    const name = context.query.name as string;
    const regionString = context.query.regionString as string;

    if (name === undefined || regionString === undefined) {
        cb({
            frames: [
                {
                    text: "name and region cannot be empty",
                },
            ],
        } as ILaMetricOutput);
    }

    let region;
    try {
        region = RegionConverter.convert(regionString);
    } catch (e) {
        cb({
            frames: [
                {
                    text: `Unknown region ${regionString}`,
                },
            ],
        } as ILaMetricOutput);
        return;
    }

    const response = await stats.init(name, region);

    cb(null, response);
};
