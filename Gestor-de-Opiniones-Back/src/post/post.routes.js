import express from 'express'
import { validateJwt } from '../middlewares/validate-jwt.js';
import { createPost, deletePost, editPost, getPosts, test } from './post.controller.js';

const api = express.Router();

//RUTAS PRIVADAS (solo usuarios logeados)
//Middleware
api.get('/test', [validateJwt], test)
api.post('/createPost', [validateJwt], createPost) //Middleware -> funciones intermedias que sirven para validar.
api.put('/editPost/:id', [validateJwt], editPost)
api.get('/getPosts', [validateJwt], getPosts)
api.delete('/deletePost/:id', [validateJwt], deletePost)

export default api