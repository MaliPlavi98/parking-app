import { clsx } from 'clsx'

export function Container({ className, children, mxAuto = true }) {
  return (
    <div className={clsx(className, 'px-6 lg:px-8')}>
      <div
        className={clsx(
          {
            'mx-auto': mxAuto,
          },
          'max-w-2xl lg:max-w-7xl',
        )}
      >
        {children}
      </div>
    </div>
  )
}
