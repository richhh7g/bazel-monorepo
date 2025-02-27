import { database } from "../../core/database";

/**
 * @typedef {Object}  CreateProductRepositoryInput
 * @property {string} name
 * @property {number} price
 * @property {string} category
 */

/**
 * @typedef {Object}  UpdateProductRepositoryInput
 * @property {string} id
 * @property {string} [name]
 * @property {number} [price]
 * @property {string} [category]
 */

export class ProductRepository {
  /**
   * @private Verifica se um produto com o id informado já existe na base de dados.
   *
   * @param {string} productId - ID do produto
   *
   * @throws {Error}
   * @returns {Promise<boolean>}
   */
  async #alreadyExists(productId) {
    const product = database.products.some(
      (product) => product._id === productId
    );

    if (product) {
      throw new Error("Produto já cadastrado.");
    }

    return !product;
  }

  /**
   * Cria um novo produto no banco de dados
   *
   * @param {CreateProductRepositoryInput} input
   * @throws {Error}
   * @returns {Promise<void>}
   */
  async create(input) {
    const generatedId = Date.now().toString(16);

    await this.#alreadyExists(generatedId);

    database.products.push({
      _id: generatedId,
      nome: input.name,
      preco: input.price,
      categoria: input.category,
    });
  }

  /**
   * Cria um novo produto no banco de dados
   *
   * @param {UpdateProductRepositoryInput} input
   * @throws {Error}
   * @returns {Promise<void>}
   */
  async updateById(input) {
    const { id, ...updateFields } = input;

    const product = database.products.find((product) => product._id === id);
    if (!product) {
      throw new Error("Produto não encontrado.");
    }

    Object.assign(product, {
      nome: updateFields.name || product.nome,
      preco: updateFields.price || product.preco,
      categoria: updateFields.category || product.categoria,
    });
  }
}
