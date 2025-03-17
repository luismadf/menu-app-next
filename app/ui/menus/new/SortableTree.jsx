'use client'
import { useMemo, useState, useRef, useEffect } from 'react'
import {
  buildTree,
  flattenTree,
  getChildCount,
  getProjection,
  removeChildrenOf,
  removeItem,
  setProperty
} from './utilities'
import { sortableTreeKeyboardCoordinates } from './keyboardCoordinates'
import {
  Announcements,
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverlay,
  DragMoveEvent,
  DragEndEvent,
  DragOverEvent,
  MeasuringStrategy,
  DropAnimation,
  Modifier,
  defaultDropAnimation,
  UniqueIdentifier
} from '@dnd-kit/core'
import { createPortal } from 'react-dom'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { SortableTreeItem } from './SortableTreeItem'
import { CSS } from '@dnd-kit/utilities'
import { Card, CardBody, Button } from '@nextui-org/react'
import { Salad } from 'lucide-react'
import { Utensils } from 'lucide-react'
import { Plus } from 'lucide-react'

const categories = [
  {
    id: '662d2709d26da839757c0606',
    name: 'Entradas'
  },
  {
    id: '662d2717d26da839757c0609',
    name: 'Platos Principales'
  },
  {
    id: '662d2736d26da839757c060f',
    name: 'Ensaladas y Verduras'
  }
]

const articles = [
  {
    id: '660334a2baa7ae1b7d0bed80',
    name: 'Salmorejo Cordobés'
  },
  {
    id: '660334febaa7ae1b7d0bed84',
    name: 'Gambas al Ajillo'
  },
  {
    id: '66033547baa7ae1b7d0bed94',
    name: 'Ensalada Mediterránea'
  }
]

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

const measuring = {
  droppable: {
    strategy: MeasuringStrategy.Always
  }
}

const dropAnimationConfig = {
  keyframes({ transform }) {
    return [
      { opacity: 1, transform: CSS.Transform.toString(transform.initial) },
      {
        opacity: 0,
        transform: CSS.Transform.toString({
          ...transform.final,
          x: transform.final.x + 5,
          y: transform.final.y + 5
        })
      }
    ]
  },
  easing: 'ease-out',
  sideEffects({ active }) {
    active.node.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: defaultDropAnimation.duration,
      easing: defaultDropAnimation.easing
    })
  }
}

export default function SortableTree({
  collapsible,
  defaultItems = initialItems,
  indicator = false,
  indentationWidth = 50,
  removable
}) {
  const [items, setItems] = useState(() => defaultItems)
  const [activeId, setActiveId] = useState(null)
  const [overId, setOverId] = useState(null)
  const [offsetLeft, setOffsetLeft] = useState(0)
  const [currentPosition, setCurrentPosition] = useState(null)

  useEffect(() => {
    console.log(items)
    console.log(flattenTree(items))
  }, [items])

  const flattenedItems = useMemo(() => {
    const flattenedTree = flattenTree(items)
    const collapsedItems = flattenedTree.reduce(
      (acc, { children, collapsed, id }) =>
        collapsed && children.length ? [...acc, id] : acc,
      []
    )

    return removeChildrenOf(
      flattenedTree,
      activeId ? [activeId, ...collapsedItems] : collapsedItems
    )
  }, [activeId, items])
  const projected =
    activeId && overId
      ? getProjection(
          flattenedItems,
          activeId,
          overId,
          offsetLeft,
          indentationWidth
        )
      : null
  const sensorContext = useRef({
    items: flattenedItems,
    offset: offsetLeft
  })
  const [coordinateGetter] = useState(() =>
    sortableTreeKeyboardCoordinates(sensorContext, indicator, indentationWidth)
  )
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter
    })
  )

  const sortedIds = useMemo(
    () => flattenedItems.map(({ id }) => id),
    [flattenedItems]
  )
  const activeItem = activeId
    ? flattenedItems.find(({ id }) => id === activeId)
    : null

  useEffect(() => {
    sensorContext.current = {
      items: flattenedItems,
      offset: offsetLeft
    }
  }, [flattenedItems, offsetLeft])

  const announcements = {
    onDragStart({ active }) {
      return `Picked up ${active.id}.`
    },
    onDragMove({ active, over }) {
      return getMovementAnnouncement('onDragMove', active.id, over?.id)
    },
    onDragOver({ active, over }) {
      return getMovementAnnouncement('onDragOver', active.id, over?.id)
    },
    onDragEnd({ active, over }) {
      return getMovementAnnouncement('onDragEnd', active.id, over?.id)
    },
    onDragCancel({ active }) {
      return `Moving was cancelled. ${active.id} was dropped in its original position.`
    }
  }

  function getMovementAnnouncement(eventName, activeId, overId) {
    if (overId && projected) {
      if (eventName !== 'onDragEnd') {
        if (
          currentPosition &&
          projected.parentId === currentPosition.parentId &&
          overId === currentPosition.overId
        ) {
          return
        } else {
          setCurrentPosition({
            parentId: projected.parentId,
            overId
          })
        }
      }

      const clonedItems = JSON.parse(JSON.stringify(flattenTree(items)))
      const overIndex = clonedItems.findIndex(({ id }) => id === overId)
      const activeIndex = clonedItems.findIndex(({ id }) => id === activeId)
      const sortedItems = arrayMove(clonedItems, activeIndex, overIndex)

      const previousItem = sortedItems[overIndex - 1]

      let announcement
      const movedVerb = eventName === 'onDragEnd' ? 'dropped' : 'moved'
      const nestedVerb = eventName === 'onDragEnd' ? 'dropped' : 'nested'

      if (!previousItem) {
        const nextItem = sortedItems[overIndex + 1]
        announcement = `${activeId} was ${movedVerb} before ${nextItem.id}.`
      } else {
        if (projected.depth > previousItem.depth) {
          announcement = `${activeId} was ${nestedVerb} under ${previousItem.id}.`
        } else {
          let previousSibling = previousItem
          while (previousSibling && projected.depth < previousSibling.depth) {
            const parentId = previousSibling.parentId
            previousSibling = sortedItems.find(({ id }) => id === parentId)
          }

          if (previousSibling) {
            announcement = `${activeId} was ${movedVerb} after ${previousSibling.id}.`
          }
        }
      }

      return announcement
    }

    return
  }

  function handleDragStart({ active: { id: activeId } }) {
    setActiveId(activeId)
    setOverId(activeId)

    const activeItem = flattenedItems.find(({ id }) => id === activeId)

    if (activeItem) {
      setCurrentPosition({
        parentId: activeItem.parentId,
        overId: activeId
      })
    }

    document.body.style.setProperty('cursor', 'grabbing')
  }

  function handleDragMove({ delta }) {
    setOffsetLeft(delta.x)
  }

  function handleDragOver({ over }) {
    setOverId(over?.id ?? null)
  }

  function handleDragEnd({ active, over }) {
    resetState()

    if (projected && over) {
      const { depth, parentId } = projected
      const clonedItems = JSON.parse(JSON.stringify(flattenTree(items)))
      const overIndex = clonedItems.findIndex(({ id }) => id === over.id)
      const activeIndex = clonedItems.findIndex(({ id }) => id === active.id)
      const activeTreeItem = clonedItems[activeIndex]

      clonedItems[activeIndex] = { ...activeTreeItem, depth, parentId }

      const sortedItems = arrayMove(clonedItems, activeIndex, overIndex)
      const newItems = buildTree(sortedItems)

      setItems(newItems)
    }
  }

  function handleDragCancel() {
    resetState()
  }

  function resetState() {
    setOverId(null)
    setActiveId(null)
    setOffsetLeft(0)
    setCurrentPosition(null)

    document.body.style.setProperty('cursor', '')
  }

  function handleRemove(id) {
    setItems((items) => removeItem(items, id))
  }

  function handleCollapse(id) {
    setItems((items) =>
      items.map((item) => {
        if (item.id === id) return { ...item, collapsed: !item.collapsed }
        return item
      })
    )
  }

  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2">
        <DndContext
          accessibility={{ announcements }}
          sensors={sensors}
          collisionDetection={closestCenter}
          measuring={measuring}
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <SortableContext
            items={sortedIds}
            strategy={verticalListSortingStrategy}
          >
            {flattenedItems.map(({ id, children, collapsed, depth }) => (
              <SortableTreeItem
                key={id}
                id={id}
                value={id}
                depth={id === activeId && projected ? projected.depth : depth}
                indentationWidth={indentationWidth}
                indicator={indicator}
                collapsed={Boolean(collapsed && children.length)}
                onCollapse={
                  collapsible && children.length
                    ? () => handleCollapse(id)
                    : undefined
                }
                onRemove={removable ? () => handleRemove(id) : undefined}
              />
            ))}
            {createPortal(
              <DragOverlay
                dropAnimation={dropAnimationConfig}
                modifiers={indicator ? [adjustTranslate] : undefined}
              >
                {activeId && activeItem ? (
                  <SortableTreeItem
                    id={activeId}
                    depth={activeItem.depth}
                    clone
                    childCount={getChildCount(items, activeId) + 1}
                    value={activeId.toString()}
                    indentationWidth={indentationWidth}
                  />
                ) : null}
              </DragOverlay>,
              document.body
            )}
          </SortableContext>

          {/* <SortableContext items={sortedIds} strategy={verticalListSortingStrategy}>
        {flattenedItems.map(({ id, children, collapsed, depth }) => (
          <SortableTreeItem
          key={id}
          id={id}
          value={id}
          depth={id === activeId && projected ? projected.depth : depth}
          indentationWidth={indentationWidth}
          indicator={indicator}
          collapsed={Boolean(collapsed && children.length)}
          onCollapse={
              collapsible && children.length
                ? () => handleCollapse(id)
                : undefined
            }
            onRemove={removable ? () => handleRemove(id) : undefined}
          />
        ))}
        {createPortal(
          <DragOverlay
            dropAnimation={dropAnimationConfig}
            modifiers={indicator ? [adjustTranslate] : undefined}
          >
            {activeId && activeItem ? (
              <SortableTreeItem
                id={activeId}
                depth={activeItem.depth}
                clone
                childCount={getChildCount(items, activeId) + 1}
                value={activeId.toString()}
                indentationWidth={indentationWidth}
              />
            ) : null}
          </DragOverlay>,
          document.body
        )}
      </SortableContext> */}
        </DndContext>
      </div>

      <section className="flex flex-col gap-8">
        <Card radius="sm">
          <CardBody>
            <div className="p-3">
              <div className="flex gap-2 mb-6">
                <Utensils />
                <p className="text-base font-semibold">Categorías</p>
              </div>

              <div className="flex flex-col gap-4">
                {categories.map(({ id, name }) => (
                  <Card
                    key={id}
                    radius="none"
                    shadow="sm"
                    className="p-3 flex flex-row justify-between items-center"
                  >
                    {name}
                    <Button isIconOnly size="sm" variant="light" disableRipple>
                      <Plus size={20} strokeWidth={0.95} />
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>

        <Card radius="sm">
          <CardBody>
            <div className="p-3">
              <div className="flex gap-2 mb-6">
                <Salad />
                <p className="text-base font-semibold">Artículos</p>
              </div>

              <div className="flex flex-col gap-4">
                {articles.map(({ id, name }) => (
                  <Card
                    key={id}
                    radius="none"
                    shadow="sm"
                    className="p-3 flex flex-row justify-between items-center"
                  >
                    {name}
                    <Button isIconOnly size="sm" variant="light" disableRipple>
                      <Plus size={20} strokeWidth={0.95} />
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>
      </section>
    </div>
  )
}

const adjustTranslate = ({ transform }) => {
  return {
    ...transform,
    y: transform.y - 25
  }
}

{
  /* <Card>
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
</Card> */
}
