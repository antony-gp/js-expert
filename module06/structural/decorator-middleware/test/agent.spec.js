import { describe, it, expect, beforeEach, jest } from "@jest/globals";

import { InjectHttpInterceptor } from "../src/agent.js";
import { Server } from "node:http";

const originalHttp = jest.createMockFromModule("node:http");

describe("Http Interceptor Agent", () => {
  const eventName = "request";
  const request = null;

  beforeEach(jest.clearAllMocks.bind(jest));

  it("should not change header", () => {
    const response = {
      setHeader: jest.fn().mockReturnThis(),
    };

    const serverInstance = new originalHttp.Server();
    serverInstance.emit(eventName, request, response);

    expect(response.setHeader).not.toHaveBeenCalled();
  });

  it("should activate header interceptor", () => {
    const header = ["X-Instrumented-By", "Anonymous"];

    InjectHttpInterceptor({ header });

    const response = {
      setHeader: jest.fn().mockReturnThis(),
    };

    const serverInstance = new Server();
    serverInstance.emit(eventName, request, response);

    expect(response.setHeader).toHaveBeenCalledWith(...header);
  });
});
