import CreateCategoryForm from '../../ui/categories/create-category-form'
import { getCategories } from '@/lib/api/categories/queries'
import { Table } from '../../ui/table'
import { columns } from './columns'

export default async function Page() {
  const items = await getCategories()

  return (
    <div className="mx-auto py-10">
      <div className="mb-8">
        <CreateCategoryForm />
      </div>

      <Table columns={columns} items={items} />
    </div>
  )
}
