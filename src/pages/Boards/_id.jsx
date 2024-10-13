
import Container from '@mui/material/Container'
import AppBar from '../../components/AppBars/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect, useState } from 'react'
import {
  createNewColumnAPI,
  createNewCardAPI,
  fetchBoardDetailsAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardToDiffColumnAPI,
  deleteColumnDetailsAPI
} from '~/apis'
import { generatePlaceholderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'
import { mapOrder } from '~/utils/sorts'
import { Box, Typography } from '@mui/material'
import { CircularProgress } from '@mui/material'
import { toast } from 'react-toastify'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '66f8be7ebd699a9138717382'
    fetchBoardDetailsAPI(boardId).then((board) => {
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')
      board.columns.forEach(column => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        } else {
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }

      })

      setBoard(board)
    })
  }, [])

  const createNewColumn = async (newColumnData) => {
    const { createdColumn } = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })

    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  const createNewCard = async (newCardData) => {
    const { createdCard } = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)

    if (columnToUpdate) {
      if (columnToUpdate.cards.some(card => card.FE_Placeholdercard)) {
        columnToUpdate.cards = [createdCard]
        columnToUpdate.cardOrderIds = [createdCard._id]
      } else {
        columnToUpdate.cards.push(createdCard)
        columnToUpdate.cardOrderIds.push(createdCard._id)
      }

    }
    setBoard(newBoard)
  }
  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnIds = dndOrderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnIds
    setBoard(newBoard)

    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderedColumnIds })
  }

  const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    setBoard(newBoard)
    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds })
  }
  const moveCardToDiffColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    const dndOrderedColumnIds = dndOrderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnIds

    setBoard(newBoard)

    let prevCardOrderIds = dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds

    if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = []
    moveCardToDiffColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds: dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(c => c._id === nextColumnId)?.cardOrderIds
    })
  }
  const deleteColumnDetails = (columnId) => {
    const newBoard = { ...board }
    newBoard.columns = newBoard.columns.filter(c => c._id !== columnId)
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(_id => _id !== columnId )
    setBoard(newBoard)

    deleteColumnDetailsAPI(columnId).then(res => {
      toast.success(res?.deleteResult)
    })
  }
  if (!board) {
    return (
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        width: '100vw',
        height: '100vh'
      }}>
        <CircularProgress />
        <Typography>Loading Board...</Typography>
      </Box>
    )
  }
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh', width: '100vw' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        moveCardToDiffColumn={moveCardToDiffColumn}
        deleteColumnDetails={deleteColumnDetails }
      />
    </Container>
  )
}

export default Board