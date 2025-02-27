import express from "express";

/**
 * @typedef {import('../../service').CreateProductService} CreateProductService
 *
 * -----------------------------------------------------------------------------
 *
 * @typedef {Object}  CreateProductBody
 * @property {string} nome
 * @property {number} preco
 * @property {string} categoria
 */

export class ProductController {
  /**
   * @param {CreateProductService} createProductService
   */
  constructor(createProductService) {
    this.createProductService = createProductService;

    this.router = express.Router();

    this.registerV1Routes();
  }

  registerV1Routes() {
    const prefixV1 = "/v1/products";

    this.router.post(prefixV1, this.create.bind(this));
  }

  /**
   * Rota para criar um novo produto
   *
   * @param {express.Request} req
   * @param {express.Response} res
   * @returns {express.Response}
   */
  async create(req, res) {
    try {
      /** @type {CreateProductBody} */
      const body = req.body;

      await this.createProductService.run({
        name: body.nome,
        price: body.preco,
        category: body.categoria,
      });

      return res.status(201).send();
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}
