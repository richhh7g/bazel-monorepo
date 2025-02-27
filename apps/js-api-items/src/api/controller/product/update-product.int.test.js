import request from "supertest";

import { jest } from "@jest/globals";
import { database } from "../../../core/database";

describe("Test Integration | ProductController - update(PUT) ", () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    database.products.splice(0, database.products.length);
  });

  it("should update a product", async () => {
    const fakeNow = 1740636348269;
    jest.spyOn(Date, "now").mockReturnValue(fakeNow);

    database.products.push({
      _id: "1954602df6d",
      nome: "Maquina de lavar",
      preco: 1999.99,
      categoria: "Eletrodomesticos",
    });

    const payload = {
      nome: "Maquina de lavar Eletrolux",
      preco: 1500,
    };

    const response = await request(global.server)
      .put(`/v1/products/${payload.id}`)
      .send(payload);

    expect(response.statusCode).toBe(200);
  });

  it("should update a product with empty body", async () => {
    const fakeNow = 1740636348269;
    jest.spyOn(Date, "now").mockReturnValue(fakeNow);

    const id = "1954602df6d";

    database.products.push({
      _id: id,
      nome: "Maquina de lavar",
      preco: 1999.99,
      categoria: "Eletrodomesticos",
    });

    const response = await request(global.server)
      .put(`/v1/products/${id}`)
      .send({});

    expect(response.statusCode).toBe(200);
  });

  it("should return error if product not exists", async () => {
    const fakeNow = 1740636348269;
    jest.spyOn(Date, "now").mockReturnValue(fakeNow);

    const payload = {
      nome: "Maquina de lavar Eletrolux",
      preco: 1500,
    };

    const response = await request(global.server)
      .put(`/v1/products/${payload.id}`)
      .send(payload);

    expect(response.statusCode).toBe(404);
    expect(response.body).toMatchObject({
      error: "Produto não encontrado.",
    });
  });
});
