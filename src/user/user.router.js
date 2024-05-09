'use strict'

import express from 'express'
import {test, register,login, update, deleteU, getAllUsers} from './user.controller.js'
import { registerStudent } from '../student/student.controller.js'
import { checkAuth, checkRoleAuth } from '../middleware/auth.js'


const api=express.Router()

api.get('/test', test)

//HACER QUE SI EL CORREO ES ORG, LLAME AL MÉTODO DE USER Y SI ES EDU, QUE LLAME AL MÉTODO STUDENT
api.post('/register', async (req, res) => {
    try {
        const { email } = req.body;
        if (email && email.includes('@kinal.org')) {
            await register(req, res); 
        } else {
            await registerStudent(req, res); 
        }
    } catch (error) {
        res.status(500).send({ error: 'Error en el registro de usuario' });
    }
});


api.post('/login',login)
api.put('/update/:id',update)
api.delete('/delete/:id', deleteU)

api.get('/select', checkAuth, checkRoleAuth('TEACHER_ROLE'), async (req, res) => {
    try {
        const users = await getAllUsers();
        res.send({ users });
    } catch (error) {
        res.status(500).send({ error: 'Error al obtener usuarios' });
    }
});

export default api

//export const api  TENGO SÍ O SÍ EL NOMBRE QUE ESTÁ EN EL ARCHIVO API
//export default api //importar con otro nombre