import { createMocks } from "node-mocks-http";
import updateServices from "./update-services";
import fs from "fs";

const requestBody = {
  name: "Service Name",
  url: "https://example.com",
  logo: "logo.png",
  categoryId: "12345",
};

describe("update-services API", () => {
  it("should create a new service if no id is passed to the body of the request", async () => {
    const { req, res } = createMocks({
      method: "PUT",
      body: {
        ...requestBody,
      },
    });

    await updateServices(req, res);

    expect(res._getStatusCode()).toBe(200);
  });

  it("should update services if id is passed to the body of the request", async () => {
    const { req, res } = createMocks({
      method: "PUT",
      body: {
        id: "123",
        ...requestBody,
      },
    });

    await updateServices(req, res);

    expect(res._getStatusCode()).toBe(200);
  });

  it("should return 405 status for non-PUT requests", async () => {
    const { req, res } = createMocks({
      method: "GET",
      body: {
        id: "123",
        ...requestBody,
      },
    });

    await updateServices(req, res);

    expect(res._getStatusCode()).toBe(405);
  });

  it("should return 400 status if missing required fields", async () => {
    const { req, res } = createMocks({
      method: "PUT",
      body: {
        ...requestBody,
        name: undefined,
      },
    });

    await updateServices(req, res);

    expect(res._getStatusCode()).toBe(400);
  });

  it("should return 500 status if something goes wrong with reading or creating the file", async () => {
    jest.spyOn(fs, "writeFileSync").mockImplementation(() => {
      throw new Error("Mocked file system error");
    });

    const { req, res } = createMocks({
      method: "PUT",
      body: {
        ...requestBody,
      },
    });

    await updateServices(req, res);

    expect(res._getStatusCode()).toBe(500);
  });
});
