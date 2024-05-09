//configuración de express  

//importaciones
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from 'dotenv'
import userRouters from '../src/user/user.router.js'
import cursosRouters from '../src/cursos/cursos.router.js'
import studentRouters from '../src/student/student.router.js'
/* import Cursos from '../src/cursos/cursos.model.js' */

//configuraciones
const app = express() //crear el servidor
config()
const port = process.env.PORT || 3200

//configurar el servidor de express
app.use(express.urlencoded({ extended: false }))
app.use(express.json()) //para que entienda json
app.use(cors()) //aceptar o denegar solicitudes de diferentes orígenes(local, remota)
app.use(helmet()) //aplica capa de seguridad 
app.use(morgan('dev')) //crea logs de solicitudes al servidor http

//declaración de rutas
app.use(userRouters)
app.use(cursosRouters)
app.use(studentRouters)

//levantar el servidor
//exports solo sirve con callbacks
export const initServer = () => {
    app.listen(port)
    console.log(`Server HTTP is running in port ${port}`)
}

/* const cursosConProfesores = async () => {   
        const resultado = await Cursos.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "teacher",
                    foreignField: "_id",
                    as: "ProfesorCurso"
                }
            },
            { $unwind: "$ProfesorCurso" }
        ]
        )
        console.log('-------------------RESULTADO-----------------', resultado);
    } 


cursosConProfesores(); */
