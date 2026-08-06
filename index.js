import { app, BrowserWindow } from 'electron'

let mainWindow

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    resizable: true,
    title: "Flowdo"
  })

  mainWindow.loadFile('src/index.html')

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})