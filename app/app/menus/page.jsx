import { getMenus } from '@/lib/api/menus/queries'
import { Table } from '../../ui/table'
import { columns } from './columns'
import CreateMenuForm from '../../ui/menus/create-menu-form'

export default async function Page() {
  const items = await getMenus()

  return (
    <>
      <section className="mx-auto py-10">
        <div className="text-center sm:text-left mb-6">
          <h1 className="tracking-tight leading-tight font-semibold text-5xl">
            Bienvenido a tus menús
          </h1>
          <h2 className="w-full md:w-1/2 my-2 text-lg lg:text-xl font-normal text-default-500 block max-w-full !w-full text-center md:text-left mt-2">
            Diseña, personaliza y descarga tus menús en PDF o compártelos en
            línea. Todo desde un solo lugar.
          </h2>
        </div>

        <div className="mb-8">
          <CreateMenuForm />
        </div>

        <Table columns={columns} items={items} />
      </section>
    </>
  )
}
