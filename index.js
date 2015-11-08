var emitter = require('component-emitter')

module.exports = function createPopup (h, options) {
  options = options || {}
  var popup = {}
  emitter(popup)

  options.visible = false
  options.width = options.width || 320
  options.height = options.height || 320

  popup.render = function popup_render (elements) {
    var width = (window.innerWidth > 800 ? 500 : 320)
    var height = (window.innerWidth > 800 ? 500 : 320)

    if (!options.visible) {
      return h('div.popup-overlay.hidden')
    }

    return h('div.popup-overlay.visible', [
      h('div.popup-wrapper', {
        style: {
          width: width + 'px',
          height: height + 'px',
          marginLeft: -(width / 2) + 'px',
          marginTop: -(height / 2) + 'px',
          top: '50%',
          left: '50%'
        }
      }, [
        h('div.popup-header', [
          h('button.popup-close', {
            onclick: function () {
              popup.close()
            }
          }, 'x')
        ]),
        h('section.popup', elements)
      ])
    ])
  }

  popup.open = function popup_open (elements) {
    options.visible = true
    popup.emit('open')
    return popup.render(elements)
  }

  popup.close = function popup_close () {
    options.visible = false
    popup.emit('close')
    return popup.render()
  }

  return popup
}
