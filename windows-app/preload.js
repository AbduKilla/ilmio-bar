const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('killaDesktop', {
  onAnnouncement(callback) {
    if (typeof callback !== 'function') return;
    ipcRenderer.on('app-announcement', (_event, message) => callback(message));
  }
});
