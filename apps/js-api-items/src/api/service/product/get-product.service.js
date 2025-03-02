/**
 * @typedef {import('../../model').Product} Product
 * @typedef {import('../../repository').ProductRepository} ProductRepository
 */

export class GetProductService {
  /**
   * @param {ProductRepository} repository
   */
  constructor(repository) {
    this.repository = repository;
  }

  /**
   * Retorna um produto pelo id.
   *
   * @param {string} id
   *
   * @throws {Error}
   * @returns {Promise<Product>}
   */
  async run(id) {
    const productDB = await this.repository.findById(id);

    const productModel = {
      id: productDB._id,
      name: productDB.nome,
      price: productDB.preco,
      category: productDB.categoria,
    };

    return productModel;
  }
}
