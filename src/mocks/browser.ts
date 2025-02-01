import { setupWorker, type SetupWorker } from "msw/browser";
import { handlers } from "./handlers";

const worker: SetupWorker = setupWorker(...handlers);

if (typeof window !== "undefined") {
  worker
    ?.start({
      onUnhandledRequest: "bypass",
      serviceWorker: {
        url: "/mockServiceWorker.js",
      },
    })
    .catch(console.error);
}

export { worker };
