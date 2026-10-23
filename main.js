const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');
const startServer = require('./server.js');

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      // No preload script needed for this simple case
    },
    icon: path.join(__dirname, 'logo.ico') // Set the application icon
  });

  // Load the URL of the server that we just started.
  // Your server is configured to run on port 3000.
  mainWindow.loadURL('http://localhost:3000');

  // Optional: Open the DevTools for debugging.
  // mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.whenReady().then(async () => {
  try {
    await startServer();
    createWindow();
  } catch (err) {
    console.error('Unable to start the app:', err.message);
    dialog.showErrorBox('Database or server startup failed', `${err.message}\n\nCheck PostgreSQL and the database settings, then restart the app.`);
    app.quit();
  }

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});