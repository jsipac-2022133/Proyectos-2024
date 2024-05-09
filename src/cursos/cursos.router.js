'use strict'

import express from 'express'
import { checkAuth, checkRoleAuth } from '../middleware/auth.js'
import {registrarCurso, getAllCursos, updateCurso, deleteCurso, todosLosCursos} from './cursos.controller.js'

const api=express.Router()

api.post('/registrarCurso', registrarCurso)
api.get('/selectCursos', getAllCursos); //MOSTRAR LOS CURSOS DEL MAESTRO LOGEADO
api.put('/updateCurso/:id', checkAuth, checkRoleAuth('TEACHER_ROLE'), updateCurso)
api.delete('/deleteCurso/:id', checkAuth, checkRoleAuth('TEACHER_ROLE'), deleteCurso)
api.get('/todosLosCursos', todosLosCursos) //MOSTRAR TODOS LOS CURSOS PARA ALUMNOS

export default api
