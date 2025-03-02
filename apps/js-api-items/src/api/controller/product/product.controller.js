import express from "express";

/**
 * @typedef {import('../../service').ListProductsService} ListProductsService
 * @typedef {import('../../service').CreateProductService} CreateProductService
 * @typedef {import('../../service').UpdateProductService} UpdateProductService
 * @typedef {import('../../service').DeleteProductService} DeleteProductService
 *
 * @typedef {import('../../model').Product} Product
 */

/**
 * @typedef {Object} ProductSchema
 * @property {string} id
 * @property {string} nome
 * @property {number} preco
 * @property {string} categoria
 */

/**
 * @typedef {Object}  ListProductsResponse
 * @property {ProductSchema[]} products
 * @property {number} total
 */

/**
 * @typedef {Object}  CreateProductPayload
 * @property {string} nome
 * @property {number} preco
 * @property {string} categoria
 */

/**
 * @typedef {Object}  UpdateProductPayload
 * @property {string} [nome]
 * @property {number} [preco]
 * @property {string} [categoria]
 */

export class ProductController {
  /**
   * @param {ListProductsService} listProductsService
   * @param {CreateProductService} createProductService
   * @param {UpdateProductService} updateProductService
   * @param {DeleteProductService} deleteProductService
   */
  constructor(
    listProductsService,
    createProductService,
    updateProductService,
    deleteProductService
  ) {
    this.listProductsService = listProductsService;
    this.createProductService = createProductService;
    this.updateProductService = updateProductService;
    this.deleteProductService = deleteProductService;

    this.router = express.Router();

    this.registerV1Routes();
  }

  registerV1Routes() {
    const prefixV1 = "/v1/products";

    this.router.get(prefixV1, this.index.bind(this));
    this.router.post(prefixV1, this.create.bind(this));
    this.router.put(`${prefixV1}/:id`, this.update.bind(this));
    this.router.delete(`${prefixV1}/:id`, this.delete.bind(this));
  }

  /**
   * Rota para retornar todos os produtos
   *
   * @param {express.Request} req
   * @param {express.Response} res
   * @returns {express.Response}
   */
  async index(_, res) {
    const products = await this.listProductsService.run();

    /** @type {ListProductsResponse} */
    const response = {
      products: products.map((product) => ({
        id: product.id,
        nome: product.name,
        preco: product.price,
        categoria: product.category,
      })),
      total: products.length,
    };

    return res.json(response);
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
      /** @type {CreateProductPayload} */
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
      /** @type {UpdateProductPayload} */
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

  /**
   * Rota para deletar um produto
   *
   * @param {express.Request} req
   * @param {express.Response} res
   * @returns {express.Response}
   */
  async delete(req, res) {
    try {
      const productId = req.params.id;

      await this.deleteProductService.run({
        id: productId,
      });

      return res.status(200).send();
    } catch (err) {
      return res.status(404).json({ error: err.message });
    }
  }
}
