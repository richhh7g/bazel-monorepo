/**
 * @typedef {import('../../repository').ProductRepository} ProductRepository
 */

/**
 * @typedef {Object}  UpdateProductServiceInput
 * @property {string} id
 * @property {string} [name]
 * @property {number} [price]
 * @property {string} [category]
 */

export class UpdateProductService {
  /**
   * @param {ProductRepository} repository
   */
  constructor(repository) {
    this.repository = repository;
  }

  /**
   * Atualiza um produto
   *
   * @param {UpdateProductServiceInput} input
   */
  async run(input) {
    return this.repository.updateById({
      id: input.id,
      name: input.name,
      price: input.price,
      category: input.category,
    });
  }
}
