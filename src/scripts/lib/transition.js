import gsap from 'gsap'

export default {
  async enter({ from, to }) {
    window.scroll(0, 0)
    from?.remove()
    await gsap.to(to, {
      autoAlpha: 1,
      duration: 0.5,
    })
  },
  async leave({ from }) {
    await gsap.to(from, {
      autoAlpha: 0,
      duration: 0.5,
    })
  },
}
