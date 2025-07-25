'use client'

import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import { cx } from 'class-variance-authority'

type Props = {
  id?: string
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  keyToResetScrollbars?: string
  ref?: React.Ref<HTMLDivElement>
}

export function ScrollArea({
  id,
  className,
  style,
  children,
  keyToResetScrollbars,
  ref,
}: Props) {
  return (
    <ScrollAreaPrimitive.Root
      className={cx('w-full h-full overflow-hidden', className)}
      style={style}
    >
      <ScrollAreaPrimitive.Viewport
        id={id}
        ref={ref}
        // Part 1: Temporary fix until removed upstream:
        // https://github.com/radix-ui/primitives/issues/926
        // Part 2: After updating radix there was an issues where the scroll area
        // would adopt its contents width. The following fixed that:
        // https://github.com/radix-ui/primitives/issues/3129
        className="w-full h-full [&>div]:!min-w-0 [&>div]:!block [&>div]:!h-full"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollAreaPrimitive.Scrollbar
        key={keyToResetScrollbars ? `v-${keyToResetScrollbars}` : undefined}
        orientation="vertical"
        className="z-10 flex select-none touch-none transition-colors hover:bg-black/20 w-1.5"
      >
        <ScrollAreaPrimitive.Thumb
          className={cx(
            'flex-1 relative bg-gray-300 rounded',
            'before:content[""] before:absolute before:top-1/2 before:left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full'
          )}
        />
      </ScrollAreaPrimitive.Scrollbar>
      <ScrollAreaPrimitive.Scrollbar
        key={keyToResetScrollbars ? `h-${keyToResetScrollbars}` : undefined}
        orientation="horizontal"
        className="z-10 flex flex-col select-none touch-none transition-colors duration-1000 hover:bg-black/20 h-1"
      >
        <ScrollAreaPrimitive.Thumb
          className={cx(
            'flex-1 relative bg-gray-300 rounded',
            'before:content[""] before:absolute before:top-1/2 before:left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full'
          )}
        />
      </ScrollAreaPrimitive.Scrollbar>
      <ScrollAreaPrimitive.Corner className="bg-black/70" />
    </ScrollAreaPrimitive.Root>
  )
}
