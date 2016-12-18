const html = require('choo/html')
const css = require('csjs-inject')
const fcStyle = require('./form-control').style

const style = css`
  .searchInput {
    width: auto;
    padding: 1px 5px;
    vertical-align: middle;
    min-height: auto;
    margin: 0 5px;
    height: 24px;
    box-sizing: border-box;
  }
`

function search (oninput) {
  return html`
  <input
    type="text"
    class="${style.searchInput} ${fcStyle.formControl}"
    placeholder="Search"
    oninput=${oninput}>
`
}
module.exports = search
