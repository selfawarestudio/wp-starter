import { picoapp } from 'picoapp'
import { size, has } from 'martha'

const components = {}

const store = {
  ...size(),
  isMobile: has(document.body, 'is-mobile'),
}

export default picoapp(components, store)
