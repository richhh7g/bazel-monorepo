import express from "express";

export class RootController {
  prefixV1 = "/v1";

  constructor() {
    this.router = express.Router();

    this.registerV1Routes();
  }

  registerV1Routes() {
    this.router.get(this.prefixV1, this.greeting.bind(this));
  }

  /**
   * Retorna um objeto JSON simples com uma mensagem de saudação
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @returns {import("express").Response}
   */
  greeting(req, res) {
    return res.json({ message: "Hello World!" });
  }
}
