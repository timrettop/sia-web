'use client'

import { AnimatePresence, motion, Variants } from 'motion/react'
import { cva, cx } from 'class-variance-authority'
import { panelStyles } from './Panel'
import { useOpen } from '../hooks/useOpen'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Close24 } from '@siafoundation/react-icons'
import { Button } from './Button'
import { ScrollArea } from './ScrollArea'
import { textStyles } from './Text'
import { VariantProps } from '../types'

const containerStyles = cva(['z-20', 'overflow-hidden'], {
  variants: {
    variant: {
      default: 'flex items-center justify-center w-full h-full',
      none: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const animationVariants: Variants = {
  show: {
    scale: [0.95, 1],
    transition: { duration: 0.1, ease: 'easeOut' },
  },
  exit: {
    opacity: [1, 0],
    scale: [1, 0.95],
    transition: { duration: 0.1, ease: 'easeIn' },
  },
}

type DialogProps = {
  ref?: React.RefObject<HTMLDivElement>
  trigger?: React.ReactNode
  rootProps?: React.ComponentProps<typeof DialogPrimitive.Root>
  open?: boolean
  onOpenChange?: (open: boolean) => void
  containerVariants?: VariantProps<typeof containerStyles>
} & ContentProps

export function Dialog({
  ref,
  trigger,
  rootProps,
  open: _open,
  onOpenChange: _onOpenChange,
  onSubmit,
  title,
  titleVisuallyHidden,
  description,
  descriptionVisuallyHidden,
  containerVariants,
  contentVariants,
  controls,
  children,
  bodyClassName,
  closeClassName,
  dynamicHeight = true,
}: DialogProps) {
  const { open, onOpenChange } = useOpen({
    open: _open,
    onOpenChange: _onOpenChange,
  })

  // The dialog itself only triggers on internal open state change
  useEffect(() => {
    if (open) {
      onOpenChange(open)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
      {...rootProps}
    >
      {trigger && (
        <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      )}
      <AnimatePresence>
        {open ? (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Content
              asChild
              forceMount
              ref={ref}
              // aria-describedby must be explicitly set to undefined if a
              // description is not provided.
              {...(description === undefined
                ? { 'aria-describedby': undefined }
                : {})}
            >
              <div className="fixed w-full h-full top-0 left-0 z-20">
                <DialogPrimitive.Overlay
                  onClick={() => onOpenChange(false)}
                  className="fixed z-10 top-0 right-0 bottom-0 left-0 inset-0 transition-opacity opacity-0 open:opacity-10 dark:open:opacity-20 bg-black"
                />
                <motion.div
                  variants={animationVariants}
                  initial="init"
                  animate="show"
                  exit="exit"
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  className={containerStyles(containerVariants as any)}
                >
                  <Content
                    title={title}
                    description={description}
                    titleVisuallyHidden={titleVisuallyHidden}
                    descriptionVisuallyHidden={descriptionVisuallyHidden}
                    contentVariants={contentVariants}
                    onSubmit={onSubmit}
                    controls={controls}
                    bodyClassName={bodyClassName}
                    closeClassName={closeClassName}
                    dynamicHeight={dynamicHeight}
                  >
                    {children}
                  </Content>
                </motion.div>
              </div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        ) : null}
      </AnimatePresence>
    </DialogPrimitive.Root>
  )
}

export function DialogClose({ className }: { className?: string }) {
  return (
    <DialogPrimitive.Close asChild type="button">
      <div className={cx('appearance-none', className)}>
        <Button size="small" variant="ghost" type="button" aria-label="close">
          <Close24 />
        </Button>
      </div>
    </DialogPrimitive.Close>
  )
}

const contentStyles = cva(['relative', 'z-40', 'overflow-hidden'], {
  variants: {
    variant: {
      default: [panelStyles()],
      none: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

type ContentProps = {
  onSubmit?: React.FormEventHandler<HTMLFormElement>
  title?: React.ReactNode
  description?: React.ReactNode
  titleVisuallyHidden?: boolean
  descriptionVisuallyHidden?: boolean
  controls?: React.ReactNode
  children?: React.ReactNode
  contentVariants?: VariantProps<typeof contentStyles>
  closeClassName?: string
  bodyClassName?: string
  dynamicHeight?: boolean
  ref?: React.RefObject<HTMLDivElement>
}

function Content({
  children,
  onSubmit,
  title,
  description,
  titleVisuallyHidden,
  descriptionVisuallyHidden,
  controls,
  contentVariants,
  closeClassName,
  bodyClassName,
  dynamicHeight = true,
  ref,
}: ContentProps) {
  const { ref: heightRef, height } = useHeight([children, description])
  const [showSeparator, setShowSeparator] = useState<boolean>(false)
  useEffect(() => {
    // 0.7 is eual to the maxHeight: 70vh below
    setShowSeparator(height > window.innerHeight * 0.7)
  }, [height])
  const Tag = onSubmit ? 'form' : 'div'
  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSubmit={onSubmit as any}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      className={contentStyles(contentVariants as any)}
    >
      {title ? (
        titleVisuallyHidden ? (
          <VisuallyHidden.Root>
            <DialogPrimitive.Title>{title}</DialogPrimitive.Title>
          </VisuallyHidden.Root>
        ) : (
          <DialogPrimitive.Title
            className={dialogTitleStyles({ showSeparator })}
          >
            {title}
          </DialogPrimitive.Title>
        )
      ) : null}
      <ScrollArea
        style={{
          height: dynamicHeight ? `${height}px` : undefined,
          maxHeight: dynamicHeight ? '70vh' : undefined,
        }}
      >
        <div ref={heightRef} className={cx('p-4', bodyClassName)}>
          {description ? (
            descriptionVisuallyHidden ? (
              <VisuallyHidden.Root>
                <DialogPrimitive.Description>
                  {description}
                </DialogPrimitive.Description>
              </VisuallyHidden.Root>
            ) : (
              <DialogPrimitive.Description
                className={dialogDescriptionStyles()}
              >
                {description}
              </DialogPrimitive.Description>
            )
          ) : null}
          {children}
        </div>
      </ScrollArea>
      {controls && (
        <DialogControls separator={showSeparator}>{controls}</DialogControls>
      )}
      <DialogClose className={closeClassName || 'absolute top-3.5 right-2'} />
    </Tag>
  )
}

function useHeight(deps: unknown[] = []) {
  const [height, setHeight] = useState<number>(0)
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    if (!ref.current) {
      return
    }
    const node = ref.current
    const update = () => setHeight(node.clientHeight)
    update()
    ref.current.addEventListener('resize', update)
    const resizeOb = new ResizeObserver(update)
    resizeOb.observe(node)

    return () => {
      node.removeEventListener('resize', update)
      resizeOb.unobserve(node)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return {
    ref,
    height,
  }
}

export const dialogTitleStyles = cva(
  [
    'pt-4 pb-2 px-4 w-full',
    textStyles({
      size: '20',
      weight: 'semibold',
      font: 'sans',
      color: 'contrast',
    }),
  ],
  {
    variants: {
      showSeparator: {
        true: 'border-b border-gray-200 dark:border-graydark-200',
      },
    },
  }
)

export const dialogDescriptionStyles = cva([
  textStyles({
    color: 'subtle',
    size: '14',
  }),
  'py-2',
])

type DialogControlsProps = {
  children: React.ReactNode
  separator?: boolean
}

function DialogControls({ children, separator = true }: DialogControlsProps) {
  return (
    <div
      className={cx(
        'py-2 mx-3',
        separator ? 'border-t border-gray-200 dark:border-graydark-200' : ''
      )}
    >
      {children}
    </div>
  )
}
