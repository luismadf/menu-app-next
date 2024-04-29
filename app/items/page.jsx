import { getItems } from '@/lib/api/item/queries'
import { Table } from '../ui/table'
import { columns } from './columns'
import CreateItemForm from '../ui/items/create-item-form'

export default async function Page() {
  const items = await getItems()

  return (
    <div className="mx-auto py-10">
      <div className="mb-8">
        <CreateItemForm />
      </div>

      <Table columns={columns} data={items} />
    </div>
  )
}
