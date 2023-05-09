import UAParser from "ua-parser-js";

export const getDeviceType = (userAgent: string): "desktop" | "mobile" => {
  const UA = new UAParser(userAgent);
  const device = UA.getDevice();
  return device?.type === "mobile" ? "mobile" : "desktop";
};
