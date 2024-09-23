import express from 'express'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import AsyncExitHook from 'async-exit-hook'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1/index'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'

const START_SERVER = () => {
  const app = express()

  app.use(express.json())

  app.use('/v1', APIs_V1)

  app.use(errorHandlingMiddleware)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Hello ${env.AUTHOR}, I am running at ${env.APP_HOST}:${env.APP_PORT}`)
  })

  AsyncExitHook(() => {
    CLOSE_DB()
  })
}

const START_APP = async () => {
  try {
    console.log('Connecting to MongoDB Atlas...')
    await CONNECT_DB()
    console.log('Connected to MongoDB Atlas!!')
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

START_APP()
