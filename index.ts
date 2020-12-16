import { createApp } from "./src/infraestructure/api/index.ts";
import Settings, {
  isEtcdAvailable,
  getConfigFromLocalEtcdInstance,
} from "./src/Settings.ts";

let settings = Settings;

if (await isEtcdAvailable()) {
  settings = await getConfigFromLocalEtcdInstance();
}

const app = createApp();
await app.listen({ port: Settings.PORT as number });
