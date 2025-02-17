import { jest } from "@jest/globals";
import { message, greeting } from "./main";

describe("Main ", () => {
  it('deve retornar "Hello World!"', () => {
    expect(message).toBe("Hello World!");
  });

  it('deve vericar se o console imprime "Hello World!"', () => {
    const log = jest.spyOn(console, "log").mockImplementation(() => {});

    greeting(message);

    expect(log).toHaveBeenCalled();
    expect(log).toHaveBeenCalledWith(message);
  });
});
