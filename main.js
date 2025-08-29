const { app, BrowserWindow, nativeTheme } = require('electron');
const path = require('path');
require('electron-context-menu')({ showInspectElement: false });

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
    backgroundColor: '#00000000',
    hasShadow: false,
    webPreferences: { preload: path.join(__dirname, 'preload.js') }
  });

  win.loadFile(path.join(__dirname, 'public', 'index.html'));
  win.setMenuBarVisibility(false);
}

app.whenReady().then(() => {
  nativeTheme.themeSource = 'dark';
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => app.quit());
