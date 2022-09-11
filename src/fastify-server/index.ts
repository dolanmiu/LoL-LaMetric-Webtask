import Fastify from "fastify";

import { ERROR_RESPONSE, RegionConverter, StatsRouter, StatusRouter } from "@common";

const RIOT_API_KEY = process.env.RIOT_API_KEY;

const fastify = Fastify({
  logger: true,
});

fastify.get("/stats", async (request, reply) => {
  const name = request.query["name"] as string;
  const regionString = request.query["region"] as string;

  console.log(`${name} from ${regionString} is requesting`);

  if (regionString === undefined) {
    reply.type("application/json").code(200);
    return {
      frames: [
        {
          text: "Region cannot be empty",
        },
      ],
    } as ILaMetricOutput;
  }

  let region: Region;
  try {
    region = RegionConverter.convert(regionString);
  } catch (e) {
    reply.type("application/json").code(400);
    console.error("Entry Point", e);
    return {
      frames: [
        {
          text: `Unknown region ${regionString}`,
        },
      ],
    } as ILaMetricOutput;
  }

  const stats = new StatsRouter(RIOT_API_KEY);

  if (name === undefined) {
    reply.type("application/json").code(200);
    return {
      frames: [
        {
          text: "name cannot be empty",
        },
      ],
    } as ILaMetricOutput;
  }

  try {
    const response = await stats.init(name, region);
    reply.type("application/json").code(200);
    return response;
  } catch (e) {
    console.error("Stats Point", e);
    reply.type("application/json").code(500);
    return ERROR_RESPONSE;
  }
});

fastify.get("/status", async (request, reply) => {
  const name = request.query["name"] as string;
  const regionString = request.query["region"] as string;

  console.log(`${name} from ${regionString} is requesting`);

  if (regionString === undefined) {
    reply.type("application/json").code(200);
    return {
      frames: [
        {
          text: "Region cannot be empty",
        },
      ],
    } as ILaMetricOutput;
  }

  let region: Region;
  try {
    region = RegionConverter.convert(regionString);
  } catch (e) {
    reply.type("application/json").code(400);
    console.error("Entry Point", e);
    return {
      frames: [
        {
          text: `Unknown region ${regionString}`,
        },
      ],
    } as ILaMetricOutput;
  }

  const stats = new StatusRouter(RIOT_API_KEY);

  try {
    const response = await stats.init(region);
    reply.type("application/json").code(200);
    return response;
  } catch (e) {
    console.error("Status Route", e);
    reply.type("application/json").code(500);
    return ERROR_RESPONSE;
  }
});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
});
