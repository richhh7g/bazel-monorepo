import { ExpressConfig } from "./express.config";

export class ServerRunner {
  static async run() {
    const expressConfig = new ExpressConfig();
    const app = await expressConfig.configure();

    return app;
  }
}
