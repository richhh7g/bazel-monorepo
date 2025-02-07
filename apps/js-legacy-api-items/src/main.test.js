const request = require("supertest");
const app = require("./main.js");
const { Hello } = require("./message/message.js");

describe("Main ", () => {
  describe("GET /", () => {
    it('deve retornar "Hello via Express!"', async () => {
      const response = await request(app).get("/");

      expect(response.statusCode).toBe(200);
      expect(response.text).toBe(Hello);
    });
  });

  describe("POST /items", () => {
    it("deve criar um novo item", async () => {
      const newItem = { name: "Item 1", description: "Descrição do item 1" };
      const response = await request(app).post("/items").send(newItem);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body.name).toBe(newItem.name);
      expect(response.body.description).toBe(newItem.description);
    });
  });

  describe("GET /items", () => {
    it("deve retornar todos os itens", async () => {
      const response = await request(app).get("/items");
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /items/:id", () => {
    it("deve retornar um item pelo ID", async () => {
      const newItem = { name: "Item 2", description: "Descrição do item 2" };
      const createResponse = await request(app).post("/items").send(newItem);
      const itemId = createResponse.body.id;

      const response = await request(app).get(`/items/${itemId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.id).toBe(itemId);
      expect(response.body.name).toBe(newItem.name);
      expect(response.body.description).toBe(newItem.description);
    });

    it("deve retornar 404 se o item não existir", async () => {
      const response = await request(app).get("/items/999");
      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe("Item não encontrado");
    });
  });

  describe("PUT /items/:id", () => {
    it("deve atualizar um item pelo ID", async () => {
      const newItem = { name: "Item 3", description: "Descrição do item 3" };
      const createResponse = await request(app).post("/items").send(newItem);
      const itemId = createResponse.body.id;

      const updatedItem = {
        name: "Item Atualizado",
        description: "Descrição atualizada",
      };

      const response = await request(app)
        .put(`/items/${itemId}`)
        .send(updatedItem);

      expect(response.statusCode).toBe(200);
      expect(response.body.id).toBe(itemId);
      expect(response.body.name).toBe(updatedItem.name);
      expect(response.body.description).toBe(updatedItem.description);
    });

    it("deve retornar 404 se o item não existir", async () => {
      const response = await request(app)
        .put("/items/999")
        .send({ name: "Item Inexistente" });

      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe("Item não encontrado");
    });
  });

  describe("DELETE /items/:id", () => {
    it("deve deletar um item pelo ID", async () => {
      const newItem = { name: "Item 4", description: "Descrição do item 4" };
      const createResponse = await request(app).post("/items").send(newItem);
      const itemId = createResponse.body.id;

      const response = await request(app).delete(`/items/${itemId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.id).toBe(itemId);

      const getResponse = await request(app).get(`/items/${itemId}`);
      expect(getResponse.statusCode).toBe(404);
    });

    it("deve retornar 404 se o item não existir", async () => {
      const response = await request(app).delete("/items/999");

      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe("Item não encontrado");
    });
  });
});
