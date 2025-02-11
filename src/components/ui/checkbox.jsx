import * as React from "react"

const Checkbox = React.forwardRef(({ className, checked, onCheckedChange, ...props }, ref) => {
  return (
    <div className="flex items-center">
      <button
        ref={ref}
        role="checkbox"
        aria-checked={checked}
        onClick={() => onCheckedChange(!checked)}
        className={`
          peer h-4 w-4 shrink-0 rounded-sm border border-primary
          ring-offset-background focus-visible:outline-none 
          focus-visible:ring-2 focus-visible:ring-ring 
          focus-visible:ring-offset-2 disabled:cursor-not-allowed 
          disabled:opacity-50 
          ${checked ? 'bg-primary text-primary-foreground' : 'bg-background'} 
          ${className}
        `}
        {...props}
      >
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-white"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </button>
    </div>
  )
})

Checkbox.displayName = "Checkbox"

export { Checkbox }