import express from 'express'
import { router as userRouter } from './userRouter.js'
import {router as  statisticRouter } from './statisticRouter.js'
import {router as categoryRouter } from './categoryRouter.js'
import {router as articleRouter } from './articleRouter.js'

 export  const router = express.Router()
 
 router.use('/users',userRouter)
 router.use('/category',categoryRouter)
 router.use('/article',articleRouter)
 router.use('/statistic',statisticRouter)


 router.get('/', (req, res) => res.json({ message: ' Welcome to authentication server' }))