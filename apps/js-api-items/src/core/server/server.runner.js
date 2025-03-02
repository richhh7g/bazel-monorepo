import { InjectionConfig } from "../injection";
import { ExpressConfig } from "./express.config";

export class ServerRunner {
  static async run() {
    new InjectionConfig();

    const expressConfig = new ExpressConfig();
    const app = await expressConfig.configure();

    return app;
  }
}
