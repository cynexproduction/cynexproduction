import { getRouter } from "./router";
import { StartClient } from "@tanstack/react-start";
import { hydrateRoot } from "react-dom/client";

const router = getRouter();

hydrateRoot(document, <StartClient router={router} />);
