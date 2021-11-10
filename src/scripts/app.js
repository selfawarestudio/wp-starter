import { picoapp } from 'picoapp'
import { size, qs, has } from 'martha'

import lazy from './components/lazy'
import scroll from './components/scroll'
import sticky from './components/sticky'

const components = {
  lazy,
  scroll,
  sticky,
  cursor,
  themeToggle,
  navMarquee,
  nav,
  navToggle,
  heroShade,
  footerShade,
  workLayoutToggle,
  workLayout,
}

const sizes = size()
const state = {
  ...sizes,
  mx: sizes.ww / 2,
  my: sizes.wh / 2,
  isMobile: has(document.body, 'is-mobile'),
  isNavOpen: false,
  dom: {
    html: document.documentElement,
    body: document.body,
    scrollProxy: qs('.js-scroll-proxy'),
  },
  fonts: [
    // { family: 'GT Walsheim' },
    // { family: 'GT Walsheim', options: { weight: 300 } },
    // { family: 'GT Walsheim', options: { weight: 300, style: 'italic' } },
  ],
}

export default picoapp(components, state)
