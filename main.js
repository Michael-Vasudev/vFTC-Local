const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  // Create the browser window.
  const gotTheLock = app.requestSingleInstanceLock();
  if (gotTheLock) { // Enters if no other instance of the app is running
    //Set up main window
    const mainWindow = new BrowserWindow({
      webPreferences: {
        preload: path.join(app.getAppPath(), 'preload.js'),
        devTools: false,
        contextIsolation: false,
      },
      frame: false,
      icon: 'logo.png'
    })

    mainWindow.maximize();
    mainWindow.setMenuBarVisibility(false);

    mainWindow.loadFile('homepage.html')
  } else {
    //Close the app if it is already running
    app.quit();
  }
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
