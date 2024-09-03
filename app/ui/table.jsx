'use client'

import {
  Table as NextUITable,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell
} from '@nextui-org/react'

export function Table({ columns, items }) {
  return (
    <NextUITable isStriped>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.id} align={column.align || 'start'}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => {
              const currentColumn = columns.find(({ id }) => id === columnKey)
              return (
                <TableCell>
                  {currentColumn.render?.(item) || item[columnKey]}
                </TableCell>
              )
            }}
          </TableRow>
        )}
      </TableBody>
    </NextUITable>
  )
}
