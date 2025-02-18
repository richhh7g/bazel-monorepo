import request from "supertest";

describe("Test Integration | RootController - greeting endpoint (GET)", () => {
  it('should respond with a status code 200 and message "Hello World"', async () => {
    const response = await request(global.server).get("/v1");

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Hello World!");
  });
});
