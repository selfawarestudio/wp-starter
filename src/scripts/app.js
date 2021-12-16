import { picoapp } from 'picoapp'
import { size, has } from 'martha'

const components = {}

const store = {
  ...size(),
  isMobile: has(document.body, 'is-mobile'),
  fonts: [
    // { family: 'GT Walsheim' },
    // { family: 'GT Walsheim', options: { weight: 300 } },
    // { family: 'GT Walsheim', options: { weight: 300, style: 'italic' } },
  ],
}

export default picoapp(components, store)
