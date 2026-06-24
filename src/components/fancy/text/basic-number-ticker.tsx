"use client"

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react"
import {
  animate,
  AnimationPlaybackControls,
  motion,
  useMotionValue,
  useTransform,
  ValueAnimationTransition,
} from "framer-motion"

import { cn } from "@/lib/utils"

interface NumberTickerProps {
  from: number // Starting value of the animation
  target: number // End value of the animation
  transition?: ValueAnimationTransition // Animation configuration, refer to motion docs for more details
  className?: string // additional CSS classes for styling
  onStart?: () => void // Callback function when animation starts
  onComplete?: () => void // Callback function when animation completes
  onUpdate?: (value: number) => void // Callback function when animation value updates
  autoStart?: boolean // Whether to start the animation automatically
  format?: (value: number) => string | number // Optional formatting function
}

// Ref interface to allow external control of the animation
export interface NumberTickerRef {
  startAnimation: () => void
}

const NumberTicker = forwardRef<NumberTickerRef, NumberTickerProps>(
  (
    {
      from = 0,
      target = 100,
      transition = {
        duration: 3,
        type: "tween",
        ease: "easeInOut",
      },
      className,
      onStart,
      onComplete,
      onUpdate,
      autoStart = true,
      format,
      ...props
    },
    ref
  ) => {
    const count = useMotionValue(from)
    const rounded = useTransform(count, (latest) => {
      const roundedVal = Math.round(latest)
      return format ? String(format(roundedVal)) : String(roundedVal)
    })
    const controlsRef = useRef<AnimationPlaybackControls | null>(null)

    // Store callbacks in mutable refs to avoid resetting the animation when they change
    const onStartRef = useRef(onStart)
    const onCompleteRef = useRef(onComplete)
    const onUpdateRef = useRef(onUpdate)
    const transitionRef = useRef(transition)

    // Keep refs up-to-date
    useEffect(() => {
      onStartRef.current = onStart
      onCompleteRef.current = onComplete
      onUpdateRef.current = onUpdate
      transitionRef.current = transition
    })

    // Function to start the animation
    const startAnimation = useCallback(() => {
      if (controlsRef.current) controlsRef.current.stop()
      onStartRef.current?.()

      count.set(from)

      const newControls = animate(count, target, {
        ...transitionRef.current,
        onUpdate: (latest) => {
          onUpdateRef.current?.(latest)
        },
        onComplete: () => {
          onCompleteRef.current?.()
        },
      })
      controlsRef.current = newControls
    }, [count, from, target])

    // Expose the startAnimation function via ref
    useImperativeHandle(ref, () => ({
      startAnimation,
    }))

    useEffect(() => {
      if (autoStart) {
        startAnimation()
      }
      return () => {
        if (controlsRef.current) {
          controlsRef.current.stop()
        }
      }
    }, [autoStart, startAnimation])

    return (
      <motion.span className={cn(className)} {...props}>
        {rounded}
      </motion.span>
    )
  }
)

NumberTicker.displayName = "NumberTicker"

export default NumberTicker
