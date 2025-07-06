export function getElementPosition(element: HTMLElement | null): { top: number; left: number } {
  if (!element) return { top: 0, left: 0 }

  const rect = element.getBoundingClientRect()
  const pickerWidth = 280

  let left = rect.right + 10
  const top = rect.top

  if (left + pickerWidth > window.innerWidth) {
    left = rect.left - pickerWidth - 10
  }

  if (left < 0) {
    left = (window.innerWidth - pickerWidth) / 2
  }

  return { top, left }
}

export function createClickOutsideHandler(
  refs: Array<React.RefObject<HTMLElement | null>>,
  callback: () => void
) {
  return (event: MouseEvent) => {
    const target = event.target as Node
    const isOutside = refs.every(ref =>
      !ref.current || !ref.current.contains(target)
    )

    if (isOutside) {
      callback()
    }
  }
}
