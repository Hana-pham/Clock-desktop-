// ESM preload
import { contextBridge } from "electron";

contextBridge.exposeInMainWorld("hpClock", {
  // reserved for future settings / APIs
});
