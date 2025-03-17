'use client'

import { getMenu } from '@/lib/api/menus/queries'
import {
  Page as PDFPage,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer
} from '@react-pdf/renderer'
import { useState } from 'react'
import { useEffect } from 'react'

// const styles = StyleSheet.create({
//   page: {
//     // flexDirection: 'row',
//     backgroundColor: '#E4E4E4'
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1
//   }
// })

export default function Page({ params }) {
  const [menu, setMenu] = useState()

  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontSize: 12
    },
    section: {
      marginBottom: 20
    },
    title: {
      fontSize: 24,
      marginBottom: 10,
      textAlign: 'center'
    },
    item: {
      marginBottom: 10
    },
    itemTitle: {
      fontSize: 18,
      fontWeight: 'bold'
    },
    itemDescription: {
      fontSize: 12,
      color: '#666'
    },
    itemPrice: {
      fontSize: 14,
      marginTop: 4
    }
  })

  useEffect(() => {
    async function getMenuInfo() {
      const menu = await getMenu(params.id)
      console.log(menu)
      setMenu(menu)
    }

    getMenuInfo()
  }, [])

  if (!menu) return 'Cargando Menú...'

  return (
    <div className="mx-auto py-10 min-h-[1000px]">
      <PDFViewer className="w-full h-[800px]">
        <Document>
          <PDFPage size="A4" style={styles.page}>
            <Text>{menu.name}</Text>
            {menu.categories.map((category) => (
              <>
                <Text>{category.name}</Text>

                {category.foo?.map((item) => (
                  <Text>{item.name}</Text>
                ))}
              </>
            ))}
          </PDFPage>
        </Document>
      </PDFViewer>
    </div>
  )
}
