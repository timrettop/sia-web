import { cva } from 'class-variance-authority'
import { VariantProps } from '../types'

const styles = cva(
  'border border-gray-500 dark:border-graydark-500 bg-gray-100 dark:bg-graydark-100 rounded p-4'
)

export function Alert({
  className,
  ref,
  ...props
}: VariantProps<typeof styles> &
  React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) {
  return <div {...props} className={styles({ className })} ref={ref} />
}
