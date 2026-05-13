import { getRouter } from "./router";
import { createStartHandler, defaultRenderHandler } from "@tanstack/react-start/server";

export default createStartHandler({
  createRouter: getRouter,
})(defaultRenderHandler);
