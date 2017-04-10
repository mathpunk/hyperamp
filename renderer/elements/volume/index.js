var html = require('choo/html')
var styles = require('./styles')
var button = require('../button')
var buttonStyles = require('../button/styles')

var opts = {
  min: 0,
  max: 1,
  step: 0.01
}

function volumeSlider (vol, emit) {
  return html`
      <input id="volume" type='range'
        class='${styles.volumeControl}'
        min='${opts.min}' max='${opts.max}' step='${opts.step}'
        oninput=${(e) => emit('player:changeVolume', e.target.value)}
        value='${vol}'>
    `
}

function volume (state, emit) {
  return html`
    <div class='${buttonStyles.btnGroup}'>
      ${button({
        onclick: () => (state.player.muted ? emit('player:unmute') : emit('player:mute')),
        iconName: state.player.muted ? 'entypo-sound-mute' : 'entypo-sound'
      })}
      ${button({ className: styles.volumeButton }, volumeSlider(state.player.volume, emit))}
    </div>
  `
}

module.exports = volume
