import express from 'express'
import cors from 'cors'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import AsyncExitHook from 'async-exit-hook'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1/index'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'
import { corsOptions } from '~/config/cors'

const START_SERVER = () => {
  const app = express()
  const port = process.env.PORT || env.LOCAL_APP_PORT
  app.use(cors(corsOptions))

  app.use(express.json())

  app.use('/v1', APIs_V1)

  app.use(errorHandlingMiddleware)

  if (env.BUILD_MODE === 'prod') {
    app.listen(port, () => {
      console.log(`Production: Hello ${env.AUTHOR}, I am running at Port:${port}`)
    })
  } else {
    app.listen(env.LOCAL_APP_PORT, env.LOCAL_APP_HOST, () => {
      console.log(`Local Dev: Hello ${env.AUTHOR}, I am running at ${env.LOCAL_APP_HOST}:${env.LOCAL_APP_PORT}`)
    })
  }


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
