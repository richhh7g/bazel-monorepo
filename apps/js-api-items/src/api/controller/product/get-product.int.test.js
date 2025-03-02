import request from "supertest";

import { database } from "../../../core/database";

describe("Test Integration | ProductController - show(GET) ", () => {
  afterEach(() => {
    database.products.splice(0, database.products.length);
  });

  it("should get one product", async () => {
    const productId = "1954602df6d";

    database.products.push({
      _id: productId,
      nome: "Maquina de lavar",
      preco: 1999.99,
      categoria: "Eletrodomesticos",
    });

    const response = await request(global.server)
      .get(`/v1/products/${productId}`)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      id: productId,
      nome: "Maquina de lavar",
      preco: 1999.99,
      categoria: "Eletrodomesticos",
    });
  });

  it("should return error if product not found", async () => {
    const productId = "1954602df6d";

    const response = await request(global.server)
      .get(`/v1/products/${productId}`)
      .send();

    expect(response.statusCode).toBe(404);
    expect(response.body).toMatchObject({
      error: "Produto não encontrado.",
    });
  });
});
