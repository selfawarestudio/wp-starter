import gsap from 'gsap'
import { qs } from 'martha'

export default function scrollTo({ href, duration = 0.7, pushState = true }) {
  if (href.indexOf('#') > -1) {
    const id = href.split('#').pop()
    const target = qs(`#${id}`)

    if (target) {
      if (pushState) {
        const url = new URL(window.location.href)
        url.hash = id
        window.history.pushState(null, '', url.toString())
      }

      const y = Math.min(
        target.offsetTop - 100,
        document.body.offsetHeight - window.innerHeight,
      )

      const scroll = { y: window.scrollY }

      requestAnimationFrame(() => {
        if (duration > 0) {
          gsap.to(scroll, {
            y: y < 0 ? 0 : y,
            duration,
            ease: 'expo.inOut',
            onUpdate: () => window.scroll(0, scroll.y),
          })
        } else {
          window.scroll(0, y)
        }
      })
    }
  }
}
