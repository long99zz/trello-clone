import { WHITELIST_DOMAINS } from '~/utils/constants'
import { env } from '~/config/environment'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

export const corsOptions = {
  origin: function (origin, callback) {
    console.log('CORS Origin: ', origin)
    console.log('Current Build Mode:', env.BUILD_MODE)


    // Cho phép gọi API với Postman khi không có `origin` trong môi trường dev
    if (!origin && env.BUILD_MODE === 'dev') {
      return callback(null, true)
    }

    // Kiểm tra nếu `origin` nằm trong danh sách WHITELIST_DOMAINS
    if (WHITELIST_DOMAINS.includes(origin)) {
      return callback(null, true)
    }

    // Trả về lỗi nếu không có trong danh sách cho phép
    return callback(new ApiError(StatusCodes.FORBIDDEN, `${origin} not allowed by our CORS Policy.`))
  },

  optionsSuccessStatus: 200,
  credentials: true
}
