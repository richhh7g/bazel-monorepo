import { ServerRunner } from "../src/core/server/index.js";

beforeAll(async () => {
  global.server = await ServerRunner.run();
});
