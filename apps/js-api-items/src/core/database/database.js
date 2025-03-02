export const ID_SEQUENCE = 1;

/**
 * @typedef  {Object} Product
 * @property {string} _id - ID do produto
 * @property {string} nome - Nome do produto
 * @property {number} preco - Preço do produto
 * @property {string} categoria - Categoria do produto
 */

/**
 * @typedef {Object} DatabaseSchema
 * @property {Product[]} products - Tabela de produtos
 */

/** @type {DatabaseSchema} */
export const database = {
  products: [],
};
