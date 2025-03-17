import { Input, Button, Textarea } from '@nextui-org/react'
import SortableTree from '@/app/ui/menus/new/SortableTree'

const initialItems = [
  {
    id: 'Home',
    children: []
  },
  {
    id: 'Collections',
    children: [
      { id: 'Spring', children: [] },
      { id: 'Summer', children: [] },
      { id: 'Fall', children: [] },
      { id: 'Winter', children: [] }
    ]
  },
  {
    id: 'About Us',
    children: []
  },
  {
    id: 'My Account',
    children: [
      { id: 'Addresses', children: [] },
      { id: 'Order History', children: [] }
    ]
  }
]

export default function Page() {
  return <StepThree defaultItems={initialItems} />
}

function StepOne() {
  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <h4 className="text-4xl tracking-tight leading-tight font-semibold">
        ¡Bienvenido! Hoy crearemos un nuevo menú.
      </h4>
      <h5 className="text-xl text-default-500 text-center">
        Primero, ¿cómo quieres llamar a este menú?
      </h5>

      <Input className="w-1/4" label="Nombre del Nuevo Menú" />

      <Button color="primary" radius="full">
        Siguiente
      </Button>
    </div>
  )
}

function StepTwo() {
  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <h4 className="text-4xl tracking-tight leading-tight font-semibold">
        ¡Genial! Seguimos con esto.
      </h4>
      <h5 className="text-xl text-default-500 text-center">
        ¿Cuál es la descripción?
      </h5>

      <Textarea className="w-1/4" label="Descripción del Nuevo Menú" />

      <Button color="primary" radius="full">
        Siguiente
      </Button>
    </div>
  )
}

function StepThree() {
  return (
    <section>
      <div
        style={{
          // maxWidth: 600,
          padding: 10,
          margin: '0 auto',
          marginTop: '10%'
        }}
      >
        <SortableTree collapsible indicator removable />
      </div>
    </section>
  )
}
