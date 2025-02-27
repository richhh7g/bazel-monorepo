import fs from "node:fs";
import url from "node:url";
import path from "node:path";

import chalk from "chalk";
import express from "express";
import { container } from "../injection";

const error = chalk.bold.red.underline;

export class ExpressConfig {
  async configure() {
    const app = express();

    app.use(express.json());

    await this._loadControllers(app);

    return app;
  }

  /**
   * @private Carrega todos os controllers da pasta "src/api/controller" e seus subdiretórios,
   * instanciando cada controller e registrando suas rotas no aplicativo Express.
   *
   * Requisitos e Observações:
   * - Apenas arquivos com a extensão ".controller.js" serão carregados.
   * - O controller deve ser definido como uma classe, podendo ser exportado como default ou nomeado.
   * - É obrigatório que o controller possua uma propriedade chamada `router`, que deve ser uma instância de `express.Router`.
   *
   * @param {express.Application} app - O aplicativo Express
   * @returns {Promise<void>}
   *
   * @example
   * // Exemplo de um controller
   * import express from "express";
   *
   * export default class ExampleController {
   *   constructor() {
   *     this.router = express.Router();
   *     this.router.get("/example", (req, res) => {
   *       res.json({ message: "Example route" });
   *     });
   *   }
   * }
   */
  async _loadControllers(app) {
    const currentDir = path.dirname(url.fileURLToPath(import.meta.url));
    const controllersPath = path.resolve(currentDir, "../../api/controller");
    const files = this._getControllerFiles(controllersPath);

    if (!files.length) {
      return console.error("No controllers found");
    }

    for (const file of files) {
      const modulePath = path.join(controllersPath, file);

      const controllerModule = await import(modulePath);

      const ControllerClass =
        controllerModule.default ||
        controllerModule[Object.keys(controllerModule)[0]];

      const controllerInstance = container.tryGet(
        Symbol.for(ControllerClass.name)
      );

      const isRouterConfigured = controllerInstance.router;
      if (!controllerInstance || !isRouterConfigured) {
        const message = `Controller ${ControllerClass.name} is not configured correctly`;

        return console.error(error(message));
      }

      app.use(controllerInstance.router);
    }
  }

  /**
   * @private Busca por arquivos de controllers recursivamente em um diretorio
   *
   * @param {string} dir - O diretorio a ser pesquisado
   * @param {string} [baseDir=dir] - O diretorio base para calcular o caminho relativo dos arquivos encontrados
   *
   * @returns {string[]} - Uma lista de caminhos relativos para os arquivos de controllers encontrados
   *
   * @example
   * // Exemplo de um controller
   * const currentDir = path.dirname(url.fileURLToPath(import.meta.url));
   * const controllersPath = path.resolve(currentDir, "../../api/controller");
   * const files = this._getControllerFiles(controllersPath);
   *
   * console.log(files); // ["example.controller.js", "example/another.controller.js"]
   */
  _getControllerFiles(dir, baseDir = dir) {
    let files = [];

    const list = fs.readdirSync(dir);
    list.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        files = files.concat(this._getControllerFiles(filePath, baseDir));
      }

      if (!stat.isDirectory() && file.endsWith("controller.js")) {
        files.push(path.relative(baseDir, filePath));
      }
    });

    return files;
  }
}
