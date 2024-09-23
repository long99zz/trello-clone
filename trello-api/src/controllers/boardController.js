import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'


const createNew = async (req, res, next) => {
  try {
    // console.log('req.body: ', req.body)
    // throw new ApiError(StatusCodes.BAD_GATEWAY, 'test error!')
    const createdBoard = await boardService,createNew(req.body)
    res.status(StatusCodes.CREATED).json({ message: 'POST form Controller: API create new board' })
  } catch (error) {
    next(error)}
}
export const boardController = {
  createNew
}