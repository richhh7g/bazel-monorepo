import request from "supertest";

import { database } from "../../../core/database";

describe("Test Integration | ProductController - index(GET) ", () => {
  afterEach(() => {
    database.products.splice(0, database.products.length);
  });

  it("should list all products", async () => {
    const response = await request(global.server).get("/v1/products").send();

    database.products = [
      {
        _id: "1954602df6d",
        nome: "Maquina de lavar",
        preco: 1999.99,
        categoria: "Eletrodomesticos",
      },
      {
        _id: "1954602df6e",
        nome: "Geladeira",
        preco: 2999.99,
        categoria: "Eletrodomesticos",
      },
      {
        _id: "1954602df6f",
        nome: "Fogao",
        preco: 999.99,
        categoria: "Eletrodomesticos",
      },
    ];

    expect(response.statusCode).toBe(200);
    expect(response.body.total).toEqual(3);
  });
});
