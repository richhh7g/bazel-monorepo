/**
 * @typedef {import('../../model').Product} Product
 * @typedef {import('../../repository').ProductRepository} ProductRepository
 */

export class ListProductsService {
  /**
   * @param {ProductRepository} repository
   */
  constructor(repository) {
    this.repository = repository;
  }

  /**
   * Retorna todos os produtos
   *
   * @returns {Promise<Product[]>}
   */
  async run() {
    const productsRepository = await this.repository.findAll();

    /** @type {Product[]} */
    const products = productsRepository.map((product) => ({
      id: product._id,
      name: product.nome,
      price: product.preco,
      category: product.categoria,
    }));

    return products;
  }
}
