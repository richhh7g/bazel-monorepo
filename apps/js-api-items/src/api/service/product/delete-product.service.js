/**
 * @typedef {import('../../repository').ProductRepository} ProductRepository
 */

/**
 * @typedef {Object}  DeleteProductServiceInput
 * @property {string} id
 */

export class DeleteProductService {
  /**
   * @param {ProductRepository} repository
   */
  constructor(repository) {
    this.repository = repository;
  }

  /**
   * Remove um produto
   *
   * @param {DeleteProductServiceInput} input
   */
  async run(input) {
    return this.repository.deleteById(input.id);
  }
}
