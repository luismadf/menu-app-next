'use client'

import * as React from 'react'
import classNames from 'classnames'
import { X } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Command as CommandPrimitive } from 'cmdk'

export default function MultiSelect({
  className,
  onChange,
  values,
  options,
  getOptions
}) {
  const inputRef = React.useRef(null)
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState('')

  if (getOptions) {
    options = options.map(getOptions)
  }

  const selectables = options.filter((option) => {
    const valuesId = values?.map((value) => value) || []
    return !valuesId.includes(option.value)
  })

  const selected =
    values?.map((value) => options.find((option) => option.value === value)) ||
    []

  function handleOnSelect(selected) {
    if (values) {
      return onChange([...values, selected.value])
    }
    onChange([selected.value])
  }

  function handleUnselect(selected) {
    const filteredValues = values.filter((value) => value !== selected.value)
    onChange(filteredValues)
  }

  return (
    <Command
      className={classNames('overflow-visible bg-transparent', className)}
    >
      <div
        className={`group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 `}
      >
        <div className="flex gap-1 flex-wrap">
          {selected.map((value) => {
            return (
              <Badge key={value.value} variant="secondary">
                {value.label}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUnselect(value)
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onClick={() => handleUnselect(value)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            )
          })}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
          />
        </div>
      </div>
      <div className="relative mt-2">
        <CommandList>
          {open && (
            <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((value) => {
                  return (
                    <CommandItem
                      key={value.value}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      onSelect={() => {
                        setInputValue('')
                        handleOnSelect(value)
                      }}
                      className={'cursor-pointer'}
                    >
                      {value.label}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </div>
          )}
        </CommandList>
      </div>
    </Command>
  )
}
