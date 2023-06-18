import React, { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from 'react'

export type TransitionState = {
  enter: {
    transition: string,
    from: CSSProperties,
    to?: CSSProperties,
  },
  leave: {
    transition: string,
    from?: CSSProperties,
    to: CSSProperties,
  },
}

export const UITransitionPresets: Record<string, TransitionState> = {
  Fade: {
    enter: {
      transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
    },
    leave: {
      transition: 'opacity 195ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      from: {
        opacity: 1,
      },
      to: {
        opacity: 0,
      },
    },
  },
  Grow: {
    enter: {
      transition: 'opacity 242ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 161ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      from: {
        opacity: 0,
        transform: 'scale(0.56)',
      },
      to: {
        opacity: 1,
        transform: 'scale(1)',
      },
    },
    leave: {
      transition: 'opacity 242ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 161ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      from: {
        opacity: 1,
        transform: 'scale(1)',
      },
      to: {
        opacity: 0,
        transform: 'scale(0.56)',
      },
    },
  },
  SlideUp: {
    enter: {
      transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
      from: {
        transform: 'translateY(100%)',
      },
      to: {
        transform: 'translateY(0)',
      },
    },
    leave: {
      transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
      from: {
        transform: 'translateY(0)',
      },
      to: {
        transform: 'translateY(100%)',
      },
    },
  },
  SlideLeft: {
    enter: {
      transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms, opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      from: {
        transform: 'translateX(100%)',
        opacity: 0,
      },
      to: {
        transform: 'translateX(0)',
        opacity: 1,
      },
    },
    leave: {
      transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms, opacity 195ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      from: {
        transform: 'translateX(0)',
        opacity: 1,
      },
      to: {
        transform: 'translateX(100%)',
        opacity: 0,
      },
    },
  },
}

export type UITransitionProps<C extends React.ElementType = 'div'> = {
  active?: boolean,
  keepAlive?: boolean,
  animateOnMount?: boolean,
  component?: C,
  transition: TransitionState,
  children?: React.ReactNode,
  componentRef?: React.ForwardedRef<HTMLElement>,
  onLeft?: () => void,
} & React.ComponentProps<C>

type VisibilityState = 'enter-from' | 'enter-to' | 'leave-from' | 'leave-to' | 'hidden' | 'visible'

export function UITransition<C extends React.ElementType = 'div'>(props: UITransitionProps<C>) {
  const {
    component: Component = 'div',
    keepAlive,
    active,
    style = {},
    transition,
    componentRef,
    onLeft,
    animateOnMount,
    ...componentProps
  } = props
  const [transitionState, setTransitionState] = useState<VisibilityState>('hidden')
  const contentRef = useRef<HTMLElement>()
  const activeRef = useRef(animateOnMount ? false : active)
  const contentRefHandler = useCallback((element: HTMLElement) => {
    contentRef.current = element
    if (componentRef) {
      if (typeof componentRef === 'function') {
        componentRef(element)
      } else {
        componentRef.current = element
      }
    }
  }, [componentRef])
  const transitionFinishHandler = useCallback(() => {
    if (onLeft) {
      onLeft()
    }
    setTransitionState('hidden')
  }, [onLeft])
  useEffect(() => {
    const content = contentRef.current!
    if (!content) {
      return
    }
    if (transitionState === 'enter-from') {
      requestAnimationFrame(() => setTransitionState('enter-to'))
      content.removeEventListener('transitionend', transitionFinishHandler)
    }
    if (transitionState === 'leave-from') {
      requestAnimationFrame(() => setTransitionState('leave-to'))
      content.addEventListener('transitionend', transitionFinishHandler)
    }

    return () => {
      content.removeEventListener('transitionend', () => null)
    }
  }, [transitionState, transitionFinishHandler])
  useEffect(() => {
    if (activeRef.current !== active) {
      activeRef.current = active
      if (active) {
        setTransitionState('enter-from')
      } else {
        setTransitionState('leave-from')
      }
    }
  }, [active])

  const transitionStyles = useMemo(() => {
    if (['hidden', 'visible'].includes(transitionState)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return style
    }
    const [transitionPhase, transitionStage] = transitionState?.split('-') ?? []
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return {
      ...style,
      transition: transition[transitionPhase]?.transition,
      ...transition[transitionPhase][transitionStage],
    }
  }, [style, transitionState, transition])

  if (!keepAlive && transitionState === 'hidden') {
    return null
  }
  return <Component ref={contentRefHandler} style={transitionStyles} {...componentProps} />
}
