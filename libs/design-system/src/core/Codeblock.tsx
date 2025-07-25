import { cx } from 'class-variance-authority'
import { VariantProps } from '../types'
import { textStyles } from './Text'

export function Codeblock({
  ref,
  className,
  size,
  color,
  ...props
}: React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof textStyles> & {
    ref?: React.RefObject<HTMLElement>
  }) {
  return (
    <pre>
      <code
        className={cx(
          textStyles({ font: 'mono', size, color }),
          'block',
          'w-full',
          'overflow-auto',
          'p-3',
          'bg-white dark:bg-graydark-200',
          'border border-gray-400 dark:border-graydark-400',
          'rounded',
          className
        )}
        {...props}
        ref={ref}
      />
    </pre>
  )
}
