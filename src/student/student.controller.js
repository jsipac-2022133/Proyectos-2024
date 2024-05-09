//lÓGICA
'use strict'

import Student from './student.model.js'
import { verifyToken } from '../helpers/generateToken.js';
import { encrypt, checkPassword, checkUpdateStudent } from '../utils/validator.js'
import { tokenSign } from '../helpers/generateToken.js'
import Curso from '../cursos/cursos.model.js'


export const registerStudent = async (req, res) => {
    try {
        let data = req.body;
        data.password = await encrypt(data.password);
        data.role = 'STUDENT_ROLE';
        let student = new Student(data);
        await student.save();
        return res.send({ message: 'Registered Successfully student' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error registering user', error });
    }
};

// Login
export const loginStudent = async (req, res) => {
    try {        
        let { username, password } = req.body        
        let student = await Student.findOne({ username }) 
        const tokenSession = await tokenSign(student)
        
        if (student && await checkPassword(password, student.password)) {
            
            let loggerStudent = {
                username: student.username,
                name: student.name,
                role: student.role,
                tokenSession
            }



            
            return res.send({ message: `Welcome ${student.name}`, loggerStudent })
        }
        return res.status(404).send({ message: 'User or password incorrect' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error logging in', err })
    }
}

export const añadirCurso = async (req, res) => {
    try {        
        const token = req.headers.authorization.split(' ')[1];        
        const decodedToken = await verifyToken(token);        
        if (decodedToken) {            
            const studentId = decodedToken._id;            
            const data = req.body;       
            // Verificar si algún curso está repetido
            if ((data.clase1 != null && data.clase2 != null) || (data.clase1 != null && data.clase3 != null) || (data.clase2 != null && data.clase3 != null)) {
                if (data.clase1 === data.clase2 || data.clase1 === data.clase3 || data.clase2 === data.clase3) {
                    return res.status(400).send({ message: 'Los cursos no pueden repetirse' });
                }
            }           
            
            //VERIFICAR SI SÍ EXISTE EN LA BD DEL MODELO CURSOOOO
            if (data.clase1) {
                const curso1 = await Curso.findById(data.clase1);
                if (!curso1) {
                    return res.status(404).send({ message: 'Clase 1 no encontrado' });
                }
            }
            if (data.clase2) {
                const curso2 = await Curso.findById(data.clase2);
                if (!curso2) {
                    return res.status(404).send({ message: 'Clase 2 no encontrado' });
                }
            }
            if (data.clase3) {
                const curso3 = await Curso.findById(data.clase3);
                if (!curso3) {
                    return res.status(404).send({ message: 'Clase 3 no encontrado' });
                }
            }  



            const updatedStudent = await Student.findOneAndUpdate(
                { _id: studentId }, 
                data, 
                { new: true } 
            );
            
            if (!updatedStudent) {
                return res.status(404).send({ message: 'Estudiante no encontrado o no actualizado' });
            }            
            return res.send({ message: 'Estudiante actualizado exitosamente', updatedStudent });
        } else {
            
            return res.status(401).send({ message: 'Token inválido' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al actualizar el estudiante', error });
    }
};


//MOSTRAR CURSOS A LOS QUE ESTÁ INSCRITO EL ESTUDIANTE
export const cursosAsignados = async (req, res) => {
    try {
        
        const token = req.headers.authorization.split(' ')[1];

        
        const decodedToken = await verifyToken(token);

        
        if (decodedToken) {
            
            const studentId = decodedToken._id;

            
            const student = await Student.findById(studentId);

            
            if (!student) {
                return res.status(404).send({ message: 'Estudiante no encontrado' });
            }

            
            const clase1Info = student.clase1 ? await Curso.findById(student.clase1) : 'No se ha asignado ningún curso';
            const clase2Info = student.clase2 ? await Curso.findById(student.clase2) : 'No se ha asignado ningún curso';
            const clase3Info = student.clase3 ? await Curso.findById(student.clase3) : 'No se ha asignado ningún curso';

            
            return res.send({
                clase1: clase1Info,
                clase2: clase2Info,
                clase3: clase3Info
            });
        } else {
            
            return res.status(401).send({ message: 'Token inválido' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al obtener las clases del estudiante', error });
    }
};

//ELIMINAR ESTUDIANTE
export const eliminarStudent = async (req, res) => {
    try {
        
        const token = req.headers.authorization.split(' ')[1];

        
        const decodedToken = await verifyToken(token);

        
        if (decodedToken) {
            
            const studentId = decodedToken._id;

            
            const deletedStudent = await Student.findByIdAndDelete(studentId);

            
            if (!deletedStudent) {
                return res.status(404).send({ message: 'Estudiante no encontrado o no eliminado' });
            }

            
            return res.send({ message: 'Estudiante eliminado exitosamente' });
        } else {
            
            return res.status(401).send({ message: 'Token inválido' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al eliminar al estudiante', error });
    }
};


