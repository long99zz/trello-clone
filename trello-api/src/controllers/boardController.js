import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'


const createNew = async (req, res, next) => {
  try {
    // console.log('req.body: ', req.body)
    // throw new ApiError(StatusCodes.BAD_GATEWAY, 'test error!')
    const createdBoard = await boardService.createNew(req.body)
    res.status(StatusCodes.CREATED).json({ createdBoard })
  } catch (error) {
    next(error)}
}

const getDetails = async (req, res, next) => {
  try {
    const boardId = req.params.id
    const board = await boardService.createNew(boardId)
    res.status(StatusCodes.OK).json(board)
  } catch (error) {
    next(error)
  }
}

export const boardController = {
  createNew,
  getDetails
}