// components/DatePickerField.tsx
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

interface DatePickerFieldProps {
  label: string
  value: string
  onChange: (date: Date | undefined) => void
}

const parseLocalDate = (dateStr: string) => new Date(dateStr + "T00:00:00")

export function DatePickerField({ label, value, onChange }: DatePickerFieldProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Field className="mx-auto w-44">
      <FieldLabel>{label}</FieldLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="justify-start font-normal">
            {value ? (
              format(parseLocalDate(value), "PPP")
            ) : (
              <span>Seleccione la fecha</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={value ? parseLocalDate(value) : undefined}
            defaultMonth={value ? parseLocalDate(value) : undefined}
            captionLayout="dropdown"  // 👈 habilita mes y año
            onSelect={(date) => {
              onChange(date)
              setOpen(false)  // 👈 cierra al seleccionar
            }}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}