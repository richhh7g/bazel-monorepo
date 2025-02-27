import express from "express";

/**
 * @typedef {import('../../service').CreateProductService} CreateProductService
 * @typedef {import('../../service').UpdateProductService} UpdateProductService
 */

/**
 * @typedef {Object}  CreateProductBody
 * @property {string} nome
 * @property {number} preco
 * @property {string} categoria
 */

/**
 * @typedef {Object}  UpdateProductBody
 * @property {string} [nome]
 * @property {number} [preco]
 * @property {string} [categoria]
 */

export class ProductController {
  /**
   * @param {CreateProductService} createProductService
   * @param {UpdateProductService} updateProductService
   */
  constructor(createProductService, updateProductService) {
    this.createProductService = createProductService;
    this.updateProductService = updateProductService;

    this.router = express.Router();

    this.registerV1Routes();
  }

  registerV1Routes() {
    const prefixV1 = "/v1/products";

    this.router.post(prefixV1, this.create.bind(this));
    this.router.put(`${prefixV1}/:id`, this.update.bind(this));
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

  /**
   * Rota para atualizar um produto
   *
   * @param {express.Request} req
   * @param {express.Response} res
   * @returns {express.Response}
   */
  async update(req, res) {
    try {
      /** @type {UpdateProductBody} */
      const body = req.body;

      await this.updateProductService.run({
        id: req.params.id,
        name: body.nome,
        price: body.preco,
        category: body.categoria,
      });

      return res.status(200).send();
    } catch (err) {
      return res.status(404).json({ error: err.message });
    }
  }
}
