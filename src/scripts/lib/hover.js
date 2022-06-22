import { on } from 'martha'

export default function hover(el, { enter, leave }) {
  let hovering = false

  let offEnter = on(el, 'mouseenter', e => {
    if (hovering) return
    hovering = true
    enter(e)
  })
  let offLeave = on(el, 'mouseleave', e => {
    if (!hovering) return
    hovering = false
    leave(e)
  })

  return () => {
    offEnter()
    offLeave()
  }
}
