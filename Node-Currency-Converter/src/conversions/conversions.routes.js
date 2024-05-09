import { Router } from 'express'
import { convertData } from './conversions.controller.js'

const api = Router()

api.post('/', convertData)

export default api