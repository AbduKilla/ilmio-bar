const { app, BrowserWindow, dialog, shell } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');

let win;
let updateReady = false;

function speakable(message) {
  if (win && !win.isDestroyed()) {
    win.webContents.send('app-announcement', message);
  }
}

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 850,
    minWidth: 800,
    minHeight: 600,
    title: 'Il Mio Bar',
    show: false,
    autoHideMenuBar: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  win.loadFile(path.join(__dirname, 'src', 'index.html'));
  win.once('ready-to-show', () => win.show());
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https://')) shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(() => {
  app.setAppUserModelId('com.killarecordsgames.ilmio-bar');
  createWindow();

  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = true;
  autoUpdater.on('checking-for-update', () => speakable('Controllo aggiornamenti in corso.'));
  autoUpdater.on('update-available', async info => {
    const result = await dialog.showMessageBox(win, {
      type: 'info',
      title: 'Aggiornamento disponibile',
      message: `È disponibile Il Mio Bar versione ${info.version}.`,
      detail: 'Vuoi scaricare e installare l’aggiornamento? Il programma verrà aggiornato alla chiusura.',
      buttons: ['Scarica aggiornamento', 'Più tardi'],
      defaultId: 0,
      cancelId: 1,
      noLink: true
    });
    if (result.response === 0) {
      speakable('Download dell’aggiornamento avviato.');
      autoUpdater.downloadUpdate();
    }
  });
  autoUpdater.on('update-not-available', () => speakable('Il Mio Bar è già aggiornato.'));
  autoUpdater.on('download-progress', p => speakable(`Aggiornamento scaricato al ${Math.floor(p.percent)} per cento.`));
  autoUpdater.on('update-downloaded', () => {
    updateReady = true;
    dialog.showMessageBox(win, {
      type: 'info',
      title: 'Aggiornamento pronto',
      message: 'L’aggiornamento è stato scaricato ed è pronto.',
      detail: 'Il Mio Bar verrà aggiornato quando chiudi il programma.',
      buttons: ['OK'],
      noLink: true
    });
  });
  autoUpdater.on('error', err => {
    speakable('Non è stato possibile controllare o scaricare gli aggiornamenti.');
    console.error('Updater:', err);
  });

  // Controllo automatico dopo l’avvio, senza bloccare il gioco.
  setTimeout(() => autoUpdater.checkForUpdates().catch(console.error), 12000);
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
