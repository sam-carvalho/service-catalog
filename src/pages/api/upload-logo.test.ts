import { NextApiRequest, NextApiResponse } from "next";
import { createMocks } from "node-mocks-http";
import fs from "fs";

describe("uploadLogo API", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("should return 405 status for non-POST requests", async () => {
    const { default: uploadLogo } = await import("./upload-logo");
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "GET",
    });

    await uploadLogo(req, res);
    expect(res._getStatusCode()).toBe(405);
    expect(res._getJSONData()).toEqual({ message: "Method not allowed" });
  });

  test("should return 500 status if form.parse throws an error", async () => {
    jest.doMock("formidable", () => ({
      IncomingForm: jest.fn().mockImplementation(() => ({
        parse: (_req, callback) => {
          callback(new Error("Parse error"), null, null);
        },
      })),
    }));

    const { default: uploadLogo } = await import("./upload-logo");
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "POST",
    });

    await uploadLogo(req, res);
    expect(res._getStatusCode()).toBe(500);
    expect(res._getJSONData()).toEqual({ message: "Error uploading file" });
  });

  test("should return 200 status and uploaded file data on successful upload", async () => {
    jest.doMock("formidable", () => ({
      IncomingForm: jest.fn().mockImplementation(() => ({
        parse: (_req, callback) => {
          const fields = {};
          const files = {
            logo: {
              path: "mock/temp/file/path",
              name: "mockfile.png",
            },
          };
          callback(null, fields, files);
        },
      })),
    }));

    const { default: uploadLogo } = await import("./upload-logo");
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "POST",
    });

    await uploadLogo(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      uploadedFile: {
        path: "mock/temp/file/path",
        name: "mockfile.png",
      },
    });
  });
});
