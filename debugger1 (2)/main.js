const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    transparent:true,
    width: 1130,
    height: 750,
    frame: false, // 상단바를 숨김
    // backgroundColor: '#000000ff', // 투명한 배경색
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: false,
    },
    resizable: false,
    shadow: true,
  });

  mainWindow.setBackgroundColor('rgba(0, 0, 0, 0)')
  mainWindow.webContents.session.clearStorageData()
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
ipcMain.on('minimize-window', (event) => {
  const win = BrowserWindow.getFocusedWindow();

  if (win) win.minimize();
});

ipcMain.on('maximize-window', (event) => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  }

});

ipcMain.on('close-window', (event) => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) win.close();
});

