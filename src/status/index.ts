import { LaMetricFormatter } from "./lametric-formatter";
import { StatusFetcher } from "./status-fetcher";

export class StatusRouter {
    public statusFetcher: StatusFetcher;
    public laMetricFormatter: LaMetricFormatter;

    constructor(apiKey: string) {
        this.statusFetcher = new StatusFetcher(apiKey);
        this.laMetricFormatter = new LaMetricFormatter();
    }

    public async init(region: Region): Promise<ILaMetricOutput> {
        const status = await this.statusFetcher.fetch(region);
        const laMetricFrames = this.laMetricFormatter.format(status);

        return laMetricFrames;
    }
}
