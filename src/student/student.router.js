'use strict'

import express from 'express'
import { loginStudent, añadirCurso, cursosAsignados, eliminarStudent} from '../student/student.controller.js'
import { checkAuth, checkRoleAuth } from '../middleware/auth.js'


const api=express.Router()

api.post('/loginStudent',loginStudent)
api.put('/asignarCurso', añadirCurso)
api.get('/cursosAsignados', cursosAsignados)
api.put('/updateStudent', añadirCurso)
api.delete('/deleteStudent', eliminarStudent)


export default api

//export const api  TENGO SÍ O SÍ EL NOMBRE QUE ESTÁ EN EL ARCHIVO API
//export default api //importar con otro nombre