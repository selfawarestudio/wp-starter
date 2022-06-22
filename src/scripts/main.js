import './style.css'
import 'focus-visible'
import { listen } from 'quicklink'
import { add, on, remove, size } from 'martha'
import { create } from 'alio'
import app from './app'
// import fonts from './lib/fonts'
import transition from './lib/transition'
import delegate from './lib/delegate'
import scrollTo from './lib/scrollTo'
import gsap from 'gsap'

main()

async function main() {
  if (process.env.NODE_ENV === 'production') listen()

  app.on('app:lock', () => add(document.body, 'overflow-hidden'))
  app.on('app:unlock', () => remove(document.body, 'overflow-hidden'))

  on(window, 'resize', resize)
  on(document, 'mousemove', mousemove)
  gsap.ticker.add(tick)

  delegate(document, '[href*="#"]', 'click', el => {
    scrollTo({ href: el.getAttribute('href') })
  })

  // await Promise.all([
  //   await fonts([
  //     { family: 'ABC Helveesti' },
  //     { family: 'Girott', options: { weight: 400 } },
  //     { family: 'Girott', options: { weight: 700 } },
  //     { family: 'Round' },
  //   ]),
  // ])

  const pjax = create({
    transitions: {
      default: transition,
    },
  })

  pjax.on('beforeLeave', () => {
    app.unmount()
  })

  pjax.on('beforeEnter', () => {
    mount()
  })

  pjax.on('samePage', () => {})
}

function mount() {
  app.mount()
  resize()

  scrollTo({
    href: window.location.href,
    duration: 0,
    pushState: false,
  })
}

function resize() {
  app.emit('resize', size())
}

function tick() {
  app.emit('tick')
}

function mousemove({ x, y }) {
  app.emit('mousemove', { mx: x, my: y })
}
