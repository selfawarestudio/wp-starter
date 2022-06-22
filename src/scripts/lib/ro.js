export default function ro(el, cb) {
  const observer = new ResizeObserver(entries => {
    for (let entry of entries) {
      if (entry?.contentBoxSize?.[0]) {
        const { inlineSize, blockSize } = entry.contentBoxSize[0]
        cb(inlineSize, blockSize)
      }
    }
  })

  observer.observe(el)

  return () => observer.disconnect()
}
