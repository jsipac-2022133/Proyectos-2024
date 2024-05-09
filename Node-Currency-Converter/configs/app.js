import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from 'dotenv'
import { apiLimiter } from './apiLimiter.js'
import convertRoutes from '../src/conversions/conversions.routes.js'

const app = express()
config()
const port = process.env.PORT || 3000

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(apiLimiter)

app.use('/conversion', convertRoutes)

export const initServer = ()=>{
    app.listen(port)
    console.log(`Server HTTP running on port ${port}`)
}