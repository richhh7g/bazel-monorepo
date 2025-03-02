import { jest } from "@jest/globals";
import fs from "node:fs";
import { ExpressConfig } from "./express.config.js";

describe("Test Unit | ExpressConfig", () => {
  /** @type { ExpressConfig } */
  let expressConfig;

  afterAll(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    expressConfig = new ExpressConfig();
  });

  it.skip("should log an error message if controllers are not configured correctly", async () => {
    jest.unstable_mockModule(
      "../../api/controller/test.controller.js",
      () => ({
        default: class TestController {
          constructor() {}
        },
      }),
      { virtual: true }
    );

    jest.spyOn(fs, "readdirSync").mockReturnValue(["test.controller.js"]);
    jest.spyOn(fs, "statSync").mockReturnValue({ isDirectory: () => false });
    const logSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    await expressConfig.configure();

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(
      "Controller TestController is not configured correctly"
    );
  });

  it("should log an error message if no controllers are found", async () => {
    jest.spyOn(fs, "readdirSync").mockReturnValue([]);
    const logSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    await expressConfig.configure();

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith("No controllers found");
  });
});
