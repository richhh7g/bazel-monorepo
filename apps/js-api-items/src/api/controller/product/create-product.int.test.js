import request from "supertest";

import { jest } from "@jest/globals";
import { database } from "../../../core/database";

describe("Test Integration | ProductController - create(POST) ", () => {
  afterEach(() => {
    database.products.splice(0, database.products.length);
  });

  it("should create a new product", async () => {
    const payload = {
      nome: "Maquina de lavar",
      preco: 1999.99,
      categoria: "Eletrodomesticos",
    };

    const response = await request(global.server)
      .post("/v1/products")
      .send(payload);

    const productDB = database.products.find(
      (product) =>
        product.nome === payload.nome &&
        product.preco === payload.preco &&
        product.categoria === payload.categoria
    );

    expect(response.statusCode).toBe(201);
    expect(productDB).toBeDefined();
    expect(productDB).toEqual(expect.objectContaining(payload));
  });

  it("should return error if product already exists", async () => {
    const fakeNow = 1740636348269;
    jest.spyOn(Date, "now").mockReturnValue(fakeNow);

    database.products.push({
      _id: "1954602df6d",
      nome: "Maquina de lavar",
      preco: 1999.99,
      categoria: "Eletrodomesticos",
    });

    const payload = {
      nome: "Maquina de lavar",
      preco: 1999.99,
      categoria: "Eletrodomesticos",
    };

    const response = await request(global.server)
      .post("/v1/products")
      .send(payload);

    expect(response.statusCode).toBe(400);
    expect(response.body).toMatchObject({
      error: "Produto já cadastrado.",
    });

    jest.restoreAllMocks();
  });
});
