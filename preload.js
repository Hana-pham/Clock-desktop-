const { contextBridge } = require('electron');
contextBridge.exposeInMainWorld('hpClock', {});
