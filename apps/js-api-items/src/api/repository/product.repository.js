import { database } from "../../core/database";

/**
 * @typedef {Object}  CreateProductRepositoryInput
 * @property {string} name
 * @property {number} price
 * @property {string} category
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
}
