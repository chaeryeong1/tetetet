const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('windowControl','myAPI', {
  minimize: () => ipcRenderer.send('minimize-window'),
  maximize: () => ipcRenderer.send('maximize-window'),
  close: () => ipcRenderer.send('close-window'),
  
});
