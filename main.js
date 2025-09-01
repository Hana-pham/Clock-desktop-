// ESM version of the Electron main process

import { app, BrowserWindow, nativeTheme } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import contextMenu from "electron-context-menu";

// __dirname replacement in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 360,
    height: 130,
    frame: false,
    transparent: true,
    resizable: true,
    skipTaskbar: true,
    alwaysOnTop: true,
    backgroundColor: "#00000000",
    hasShadow: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  win.loadFile(path.join(__dirname, "public", "index.html"));
  win.setMenuBarVisibility(false);
}

app.whenReady().then(() => {
  nativeTheme.themeSource = "dark";
  // right-click menu (safe, minimal)
  contextMenu({ showInspectElement: false });

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  app.quit();
});
