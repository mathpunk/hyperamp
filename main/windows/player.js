var { BrowserWindow, app } = require('electron')
var windowStateKeeper = require('electron-window-state')
var path = require('path')
var PLAYER_WINDOW = 'file://' + path.resolve(__dirname, '..', '..', 'renderer', 'player', 'index.html')

var player = module.exports = {
  init,
  win: null,
  windowState: null
}

require('electron-debug')({ showDevTools: 'undocked' })
require('electron-context-menu')()

function init () {
  player.windowState = windowStateKeeper({ width: 800, height: 600 })
  var win = player.win = new BrowserWindow({
    title: 'Hyper Amp',
    x: player.windowState.x,
    y: player.windowState.y,
    width: player.windowState.width,
    height: player.windowState.height,
    minWidth: 580,
    minHeight: 76,
    titleBarStyle: 'hiddenInset',
    useContentSize: true,
    show: false,
    backgroundColor: '#fff',
    thickFrame: true
  })

  player.windowState.manage(win)

  win.loadURL(PLAYER_WINDOW)

  win.once('ready-to-show', win.show)

  win.on('closed', () => {
    player.win = null
  })

  if (process.platform !== 'darwin') { // TODO System tray on windows (maybe linux)
    // since window-all-closed doesn't fire with our hidden audio process
    player.win.once('closed', () => {
      app.quit()
    })
  }
}
