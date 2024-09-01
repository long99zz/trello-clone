import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { defaultDropAnimationSideEffects, DndContext, DragOverlay, PointerSensor, useSensor, useSensors, closestCorners } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep } from 'lodash'

const ACTIVE_DRAG_ITEM_TYPE = {
    COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
    CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {
    const pointerSensor = useSensor(PointerSensor, {
        activationConstraint: {
            distance: 10
        }
    })
    const sensors = useSensors(pointerSensor)
    const [orderedColumns, setOrderedColumns] = useState([])
    const [activeDragItemId, setActiveDragItemId] = useState(null)
    const [activeDragItemType, setActiveDragItemType] = useState(null)
    const [activeDragItemData, setActiveDragItemData] = useState(null)

    useEffect(() => {
        setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
    }, [board])

    const findColumnByCardId = (cardId) => {
        return orderedColumns.find(column => column?.cards?.some(card => card._id === cardId))
    }

    const handleDragStart = (event) => {
        setActiveDragItemId(event?.active?.id)
        setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
        setActiveDragItemData(event?.active?.data?.current)
    }

    const handleDragOver = (event) => {
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
        const { active, over } = event
        if (!over) return

        const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
        const { id: overCardId } = over
        const activeColumn = findColumnByCardId(activeDraggingCardId)
        const overColumn = findColumnByCardId(overCardId)

        if (!activeColumn || !overColumn) return

        if (activeColumn._id !== overColumn._id) {
            setOrderedColumns(prevColumns => {
                const overCardIndex = overColumn.cards.findIndex(card => card._id === overCardId)
                const isBelowOverItem = active.rect.current.translated &&
                    active.rect.current.translated.top > over.rect.top + over.rect.height

                const newCardIndex = isBelowOverItem ? overCardIndex + 1 : overCardIndex

                const nextColumns = cloneDeep(prevColumns)
                const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
                const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

                if (nextActiveColumn) {
                    nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
                    nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
                }

                if (nextOverColumn) {
                    nextOverColumn.cards.splice(newCardIndex, 0, activeDraggingCardData)
                    nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
                }

                return nextColumns
            })
        }
    }

    const handleDragEnd = (event) => {
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) return

        const { active, over } = event
        if (!over) return

        if (active.id !== over.id) {
            const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
            const newIndex = orderedColumns.findIndex(c => c._id === over.id)
            const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
            setOrderedColumns(dndOrderedColumns)
            setActiveDragItemId(null)
            setActiveDragItemType(null)
            setActiveDragItemData(null)
        }
    }

    const customDropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: '0.5'
                }
            }
        })
    }

    return (
        <DndContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragOver={handleDragOver}
        >
            <Box sx={{
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
                width: '100%',
                height: (theme) => theme.trello.boardContentHeight,
                p: '10px 0'
            }}>
                <ListColumns columns={orderedColumns} />
                <DragOverlay dropAnimation={customDropAnimation}>
                    {(!activeDragItemId || !activeDragItemType) && null}
                    {(activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
                    {(activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} />}
                </DragOverlay>
            </Box>
        </DndContext>
    )
}

export default BoardContent
