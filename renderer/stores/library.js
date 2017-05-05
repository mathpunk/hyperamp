var ipcRenderer = require('electron').ipcRenderer

module.exports = libraryStore

function libraryStore (state, emitter) {
  var localState = state.library

  if (!localState) {
    localState = state.library = {}
    localState.paths = []
    localState.trackDict = {}
    localState.trackOrder = []
    localState.search = ''
    localState.selectedIndex = null
  }

  emitter.on('library:search', search)
  emitter.on('library:update-library', updateLibrary)
  emitter.on('library:track-dict', updateTrackDict)
  emitter.on('library:track-order', updateTrackOrder)
  emitter.on('library:paths', updatePaths)
  emitter.on('library:select', select)

  function updateTrackDict (newTrackDict) {
    localState.trackDict = newTrackDict
  }

  function updateTrackOrder (newTrackOrder) {
    localState.trackOrder = newTrackOrder
  }

  function updatePaths (newPaths) {
    localState.paths = newPaths
  }

  function updateLibrary (paths) {
    console.log(paths)
    ipcRenderer.send('update-library', paths)
  }

  function search (string) {
    ipcRenderer.send('search', string)
    localState.search = string
  }

  function select (selectedIndex) {
    localState.selectedIndex = selectedIndex
    emitter.emit('render')
  }

  function syncState (ev, mainState) {
    localState.paths = mainState.paths
    localState.search = mainState.search
    localState.trackDict = mainState.trackDict
    localState.trackOrder = mainState.trackOrder
    emitter.emit('render')
  }

  ipcRenderer.on('sync-state', syncState)
  ipcRenderer.on('track-dict', (ev, newTrackDict, newTrackOrder, newPaths) => {
    emitter.emit('library:track-dict', newTrackDict)
    emitter.emit('library:track-order', newTrackOrder)
    emitter.emit('library:paths', newPaths)
    emitter.emit('render')
  })
  ipcRenderer.on('track-order', (ev, newTrackOrder) => {
    emitter.emit('library:track-order', newTrackOrder)
    emitter.emit('render')
  })
}
