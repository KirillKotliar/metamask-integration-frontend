import { useCallback, useEffect, useRef } from 'react'

type TCallback = (time: number) => void

export function useInterval(callback: TCallback, timeout: number) {
  const savedCallback = useRef(callback)

  const handler = useCallback(
    () => savedCallback.current(new Date().getTime()),
    [],
  )

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (timeout) {
      const id = window.setInterval(handler, timeout)
      return () => window.clearInterval(id)
    }
  }, [handler, timeout])
}
