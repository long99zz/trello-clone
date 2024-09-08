import express from 'express'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import AsyncExitHook from 'async-exit-hook'
import 'dotenv/config'
import { env } from '~/config/environment'

const START_SERVER = () => {
  const app = express()

  app.get('/', async (req, res) => {
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Hello ${env.AUTHOR}, I am running at ${env.APP_HOST}:${env.APP_PORT}/`)
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
