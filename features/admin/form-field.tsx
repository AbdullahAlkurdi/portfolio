"use client"

import { cn } from "@/lib/utils"

type FormFieldProps = {
  label: string
  error?: string
  children: React.ReactNode
  className?: string
}

export function FormField({ label, error, children, className }: FormFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label className="block text-sm font-medium">{label}</label>
      {children}
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  )
}

type InputProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
  multiline?: boolean
  rows?: number
  className?: string
}

export function FormInput({
  value,
  onChange,
  placeholder,
  type = "text",
  multiline,
  rows = 3,
  className,
}: InputProps) {
  const baseClass =
    "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-colors"

  if (multiline) {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={cn(baseClass, "resize-y min-h-[80px]", className)}
      />
    )
  }

  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={cn(baseClass, className)}
    />
  )
}
