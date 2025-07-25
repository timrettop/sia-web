'use client'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { Paragraph } from './Paragraph'
import { cx } from 'class-variance-authority'
import { panelStyles } from './Panel'
import { motion, AnimatePresence, Variants } from 'motion/react'
import { useOpen } from '../hooks/useOpen'
import { Fragment, isValidElement } from 'react'

type TooltipProps = Omit<
  React.ComponentProps<typeof TooltipPrimitive.Root> &
    React.ComponentProps<typeof TooltipPrimitive.Content>,
  'content'
> & {
  children: React.ReactElement
  /** The content to display in the tooltip.
   * If a string or React.Fragment is passed the content will be wrapped in a Paragraph. */
  content: React.ReactNode
}

const variants: Variants = {
  show: {
    opacity: [0, 1],
    scale: [0.95, 1],
    transition: { duration: 0.1, ease: 'easeOut' },
  },
  exit: {
    opacity: [1, 0],
    scale: [1, 0.95],
    transition: { duration: 0.1, ease: 'easeIn' },
  },
}

export function Tooltip({
  children,
  content,
  defaultOpen,
  open: _open,
  onOpenChange: _onOpenChange,
  delayDuration = 300,
  disableHoverableContent,
  ...props
}: TooltipProps) {
  const { open, onOpenChange } = useOpen({
    open: _open,
    onOpenChange: _onOpenChange,
  })

  return (
    <TooltipPrimitive.Root
      open={open}
      delayDuration={delayDuration}
      disableHoverableContent={disableHoverableContent}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <AnimatePresence>
        {content && open ? (
          <TooltipPrimitive.Portal forceMount>
            <TooltipPrimitive.Content
              forceMount
              asChild
              side="top"
              align="center"
              sideOffset={props.sideOffset || 5}
              {...props}
            >
              <motion.div
                variants={variants}
                initial="init"
                animate="show"
                exit="exit"
                className={cx(
                  'relative',
                  'z-50',
                  'data-[side=top]:bottom-1',
                  'data-[side=top]:origin-bottom',
                  'data-[side=bottom]:top-1',
                  'data-[side=bottom]:origin-top',
                  'data-[side=left]:right-1',
                  'data-[side=left]:origin-right',
                  'data-[side=right]:left-1',
                  'data-[side=right]:origin-left'
                )}
              >
                <div
                  className={cx(
                    'py-1 px-2',
                    'max-w-xs',
                    'overflow-hidden',
                    panelStyles()
                  )}
                >
                  {typeof content === 'string' ||
                  (isValidElement(content) && content?.type === Fragment) ? (
                    <Paragraph size="12">{content}</Paragraph>
                  ) : (
                    content
                  )}
                </div>
              </motion.div>
            </TooltipPrimitive.Content>
          </TooltipPrimitive.Portal>
        ) : null}
      </AnimatePresence>
    </TooltipPrimitive.Root>
  )
}
