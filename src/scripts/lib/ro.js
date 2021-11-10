export default function ro(el, cb) {
  const instance = new ResizeObserver(entries => {
    for (let entry of entries) {
      if (entry?.devicePixelContentBoxSize?.[0]) {
        const { inlineSize, blockSize } = entry.devicePixelContentBoxSize[0]
        cb(inlineSize, blockSize)
      }
    }
  })

  instance.observe(el)

  return () => instance.unobserve(el)
}
