import { noop } from 'martha'

export default function io(
  el,
  { enter = noop, exit = noop, once = false, ...rest },
) {
  let observer = new IntersectionObserver(
    (entries, observer) => {
      let entry = entries[0]
      if (entry.isIntersecting) {
        enter(entry)
        if (once) observer.disconnect()
      } else {
        exit(entry)
      }
    },
    {
      threshold: 0,
      ...rest,
    },
  )

  observer.observe(el)

  return () => observer.disconnect()
}
