import '../styles/main.css'
import Highway from '@dogstudio/highway'
import * as quicklink from 'quicklink'
import gsap from 'gsap'
import { on, once, size, remove } from 'martha'
import app from './app'
import fonts from './lib/fonts'
import Fade from './transitions/fade'

class Main extends Highway.Renderer {
  onLoad() {
    quicklink.listen()

    on(window, 'resize', this.resize)
    on(document, 'mousemove', this.mousemove)

    gsap.ticker.add(this.tick)

    gsap.set('[data-router-view]', { autoAlpha: 1 })

    fonts(app.getState().fonts).then(this.onLoadCompleted).catch(console.log)
  }

  onLoadCompleted = () => {
    this.onEnter()
    once(document.body, 'transitionend', this.onEnterCompleted)
    remove(document.body, 'opacity-0')
  }

  onEnter() {
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

  tick = (t, dt, f) => {
    app.emit('tick', { t, dt, f })
  }

  setup() {
    this.onLoad()
  }
}

let router = new Highway.Core({
  renderers: {
    default: Main,
  },
  transitions: {
    default: Fade,
    contextual: {},
  },
})

app.on('router:redirect', (_, { href, transition }) =>
  router.navigate(href, transition),
)
