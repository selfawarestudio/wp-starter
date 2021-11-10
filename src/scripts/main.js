import '../styles/main.css'
import Highway from '@dogstudio/highway'
import * as quicklink from 'quicklink'
import gsap from 'gsap'
import app from './app'
import raf from './lib/raf'
import fonts from './lib/fonts'
import { on, once, size, remove } from 'martha'
import Fade from './transitions/Fade'

class Main extends Highway.Renderer {
  onLoad() {
    quicklink.listen()
    on(window, 'resize', this.resize)
    on(document, 'mousemove', this.mousemove)
    raf(app)
    gsap.set('[data-router-view]', { autoAlpha: 1 })
    fonts(app.getState().fonts).then(this.onLoadCompleted).catch(console.log)
  }

  onLoadCompleted = () => {
    this.onEnter()
    const { dom } = app.getState()
    once(dom.body, 'transitionend', this.onEnterCompleted)
    remove(dom.body, 'opacity-0')
  }

  onEnter() {
    const page = this.properties.view.dataset.page
    const { dom } = app.getState()

    if (page) {
      dom.body.setAttribute('data-page', page)
    } else {
      dom.body.removeAttribute('data-page')
    }

    this.mount()
  }

  onEnterCompleted() {
    app.emit('enter:completed')
  }

  onLeave() {
    this.unmount()
  }

  onLeaveCompleted() {}

  mount = () => {
    app.mount()
    this.resize()
  }

  unmount = () => {
    app.unmount()
  }

  resize = () => {
    app.emit('resize', size())
  }

  mousemove = ({ clientX: mx, clientY: my }) => {
    app.emit('mousemove', { mx, my })
  }

  setup() {
    this.onLoad()
  }
}

app.router = new Highway.Core({
  renderers: {
    default: Main,
  },
  transitions: {
    default: Fade,
    contextual: {},
  },
})
