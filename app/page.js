'use client'

import { createUser } from '@/lib/api/user/mutations'
import { Card, CardBody, Button } from '@nextui-org/react'
import {
  MonitorSmartphone,
  ArrowRight,
  SwatchBook,
  FileDown,
  PencilRuler
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <main>
      <section className="flex flex-col items-center sm:items-start mb-24  sm:mb-48">
        <div className="text-center sm:text-left sm:max-w-[50%] mb-6">
          <h1 className="tracking-tight leading-tight font-semibold text-5xl">
            Crea Menús Profesionales en Minutos
          </h1>
          <h2 className="w-full md:w-1/2 my-2 text-lg lg:text-xl font-normal text-default-500 block max-w-full !w-full text-center md:text-left mt-6">
            Diseña, personaliza y descarga tus menús en PDF o compártelos en
            línea. Todo desde un solo lugar.
          </h2>
        </div>

        <Button
          color="primary"
          onClick={() => router.push('/app/menus')}
          radius="full"
          className="font-semibold"
          endContent={<ArrowRight size={20} />}
        >
          Crear mi menú
        </Button>
      </section>

      <section>
        <h3 className="font-semibold text-4xl mb-8 text-center sm:text-left">
          ¿Por qué Elegirnos?
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card>
            <CardBody>
              <div className="p-3">
                <div className="flex gap-2 mb-4">
                  <PencilRuler />
                  <p className="text-base font-semibold">
                    Fácil y Personalizable
                  </p>
                </div>
                <p className="text-default-600">
                  Ajusta fuentes, colores, y elementos gráficos con una interfaz
                  intuitiva.
                </p>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="p-3">
                <div className="flex gap-2 mb-4">
                  <SwatchBook />
                  <p className="text-base font-semibold">
                    Diseños Profesionales
                  </p>
                </div>
                <p className="text-default-600">
                  Plantillas modernas y elegantes adaptadas a diferentes tipos
                  de restaurantes.
                </p>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="p-3">
                <div className="flex gap-2 mb-4">
                  <FileDown />
                  <p className="text-base font-semibold">Exporta en PDF</p>
                </div>
                <p className="text-default-600">
                  Descarga tus menús listos para imprimir o compartir en formato
                  PDF.
                </p>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="p-3">
                <div className="flex gap-2 mb-4">
                  <MonitorSmartphone />
                  <p className="text-base font-semibold">Compartir en Línea</p>
                </div>
                <p className="text-default-600">
                  Genera un enlace para que tus clientes accedan a tu menú
                  online desde cualquier dispositivo.
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>
    </main>
  )
}
