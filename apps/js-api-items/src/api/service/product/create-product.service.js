/**
 * @typedef {import('../../repository').ProductRepository} ProductRepository
 *
 * -----------------------------------------------------------------------------
 *
 * @typedef {Object}  CreateProductServiceInput
 * @property {string} name
 * @property {number} price
 * @property {string} category
 */

export class CreateProductService {
  /**
   * @param {ProductRepository} repository
   */
  constructor(repository) {
    this.repository = repository;
  }

  /**
   * Cria um novo produto
   *
   * @param {CreateProductServiceInput} input
   */
  async run(input) {
    return this.repository.create({
      name: input.name,
      price: input.price,
      category: input.category,
    });
  }
}
