import request from "supertest";

import { jest } from "@jest/globals";
import { database } from "../../../core/database";

describe("Test Integration | ProductController - delete(DELETE) ", () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    database.products.splice(0, database.products.length);
  });

  it("should delete a product", async () => {
    const fakeNow = 1740636348269;
    jest.spyOn(Date, "now").mockReturnValue(fakeNow);

    const productId = "1954602df6d";

    database.products.push({
      _id: productId,
      nome: "Maquina de lavar",
      preco: 1999.99,
      categoria: "Eletrodomesticos",
    });

    const response = await request(global.server)
      .delete(`/v1/products/${productId}`)
      .send();

    expect(response.statusCode).toBe(200);
  });

  it("should return error if product not exists", async () => {
    const productId = "1954602df6d";

    const response = await request(global.server)
      .delete(`/v1/products/${productId}`)
      .send();

    expect(response.statusCode).toBe(404);
    expect(response.body).toMatchObject({
      error: "Produto não encontrado.",
    });
  });
});
