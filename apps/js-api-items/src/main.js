import packageJson from "express/package.json" with { type: "json" };
import { ServerRunner } from './core/server'

(async () => {
  const server = await ServerRunner.run();

  const port = process.env.PORT

  server.listen(port, () => console.log(`Server running on port ${port} with express ${packageJson.version}`));
})()
