import { component } from 'picoapp'
import gsap from 'gsap'
import { qs, rect } from 'martha'

export default component((node, ctx) => {
  let el = qs('[data-sticky]', node)
  let minWidth = ctx.getState().screens?.[node.dataset.screen]
  let pos = el.dataset.sticky ?? 'top'

  ctx.on('resize:reset', () => {
    gsap.set(el, { y: 0 })
    node.rect = rect(node)
    el.rect = rect(el)
  })

  ctx.on('tick', ({ scroll, ww, wh }) => {
    if (typeof minWidth === 'undefined' || ww >= minWidth) {
      if (pos === 'top') {
        let top = el.rect.top - scroll
        if (top <= 0) {
          let bottom = node.rect.top + node.rect.height - scroll
          if (bottom > el.rect.height) {
            gsap.set(el, { y: scroll - el.rect.top })
          } else {
            const val =
              node.rect.height - el.rect.height - node.rect.top - el.rect.top
            gsap.set(el, { y: val })
          }
        } else {
          gsap.set(el, { y: null })
        }
      } else if (pos === 'bottom') {
        gsap.set(el, { y: scroll - el.rect.bottom + wh })
      }
    } else {
      gsap.set(el, { clearProps: 'y' })
    }
  })

  return () => {}
})
