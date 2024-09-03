import { getMenus } from '@/lib/api/menus/queries'
import { Table } from '../ui/table'
import { columns } from './columns'
import CreateMenuForm from '../ui/menus/create-menu-form'

export default async function Page() {
  const items = await getMenus()

  return (
    <div className="mx-auto py-10">
      <div className="mb-8">
        <CreateMenuForm />
      </div>

      <Table columns={columns} items={items} />
    </div>
  )
}
