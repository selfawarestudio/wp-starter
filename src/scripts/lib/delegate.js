import { on } from 'martha'

export default function delegate(parent, selector, type, handler) {
  return on(parent, type, (ev) => {
    let el = ev.target.closest(selector)
    if (el) handler(el, ev)
  })
}
