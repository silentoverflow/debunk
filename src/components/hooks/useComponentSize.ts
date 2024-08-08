import { RefObject, useEffect, useState } from 'react'

export default function useComponentSize<T extends HTMLElement>(ref: RefObject<T>) {
  const getSize = () => ({
    width: ref?.current?.getBoundingClientRect().width ?? 0,
    height: ref?.current?.getBoundingClientRect().height ?? 0,
  })

  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      setSize(getSize())
    }

    if (ref.current) setSize(getSize())

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current])

  return size
}
