const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Example: Send a message to the main process
  sendMessage: (message) => ipcRenderer.send('message', message),
  
  // Example: Receive a message from the main process
  onMessage: (callback) => ipcRenderer.on('message', callback),
  
  // Example: Get app version
  getVersion: () => process.versions.electron,
  
  // Example: Platform info
  getPlatform: () => process.platform,
  
  // Example: App info
  getAppName: () => process.env.npm_package_name || 'SeeNote',
  
  // Example: Quit app
  quitApp: () => ipcRenderer.send('quit-app'),
  
  // Example: Minimize window
  minimizeWindow: () => ipcRenderer.send('minimize-window'),
  
  // Example: Maximize window
  maximizeWindow: () => ipcRenderer.send('maximize-window'),
  
  // Example: Close window
  closeWindow: () => ipcRenderer.send('close-window')
});

// Remove all listeners when the window is closed
window.addEventListener('beforeunload', () => {
  ipcRenderer.removeAllListeners('message');
});
