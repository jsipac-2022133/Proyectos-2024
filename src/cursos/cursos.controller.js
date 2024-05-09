'use strict';

import { verifyToken } from '../helpers/generateToken.js';
import { checkUpdateCurso } from '../utils/validator.js'
import Curso from './cursos.model.js';
import Student from '../student/student.model.js'

export const registrarCurso = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];         
        const decodedToken = await verifyToken(token);        
        if (decodedToken) {            
            const data = req.body;            
            const userId = decodedToken._id;            
            data.teacher = userId;
            const curso = new Curso(data);
            await curso.save();
            return res.send({ message: 'Registered Successfully' });
        } else {
            
            return res.status(401).send({ message: 'Unauthorized' });
        }
    } catch (error) {
        console.error(error);        
        return res.status(500).send({ message: 'Error registering course', error });
    }
};


//MOSTRAR
export const getAllCursos = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = await verifyToken(token);
        if (!decodedToken) {
            return res.status(401).send({ message: 'Invalid token' });
        }
        const userId = decodedToken._id;
        const cursos = await Curso.find({ teacher: userId });
        return res.send({ cursos });

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error retrieving courses', error });
    }
};


export const todosLosCursos=async(req,res)=>{
    try {
        const cursos = await Curso.find();
        return res.send({ cursos });
    } catch (error) {
        console.error(error)
    }
}


//UPDATE
export const updateCurso = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const update = checkUpdateCurso(data, id);
        if (!update) {
            return res.status(400).send({ message: 'Have submitted some data that cannot be updated or missing data' });
        }
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = await verifyToken(token);
        if (!decodedToken) {
            return res.status(401).send({ message: 'Invalid token' });
        }
        const userId = decodedToken._id;        
        const cursoToUpdate = await Curso.findOne({ _id: id, teacher: userId });
        if (!cursoToUpdate) {
            return res.status(403).send({ message: 'You are not authorized to update this curso' });
        }
        const updatedCurso = await Curso.findOneAndUpdate(
            { _id: id }, 
            data, 
            { new: true } 
        );
        
        if (!updatedCurso) {
            return res.status(404).send({ message: 'Curso not found or not updated' });
        }
        
        return res.send({ message: 'Updated Curso', updatedCurso });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error updating curso' });
    }
};


export const deleteCurso = async (req, res) => {
    try {
        
        const { id } = req.params;

        
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = await verifyToken(token);
        if (!decodedToken) {
            return res.status(401).send({ message: 'Invalid token' });
        }
        const userId = decodedToken._id;

        
        const cursoToDelete = await Curso.findOne({ _id: id, teacher: userId });
        if (!cursoToDelete) {
            return res.status(403).send({ message: 'You are not authorized to delete this curso' });
        }

        
        const studentsToUpdate = await Student.find({
            $or: [{ clase1: id }, { clase2: id }, { clase3: id }]
        });

        
        for (const student of studentsToUpdate) {
            if (student.clase1 && student.clase1.equals(id)) {
                student.clase1 = null;
            }
            if (student.clase2 && student.clase2.equals(id)) {
                student.clase2 = null;
            }
            if (student.clase3 && student.clase3.equals(id)) {
                student.clase3 = null;
            }
            await student.save();
        }

        
        const deletedCurso = await Curso.findOneAndDelete({ _id: id });

        
        if (!deletedCurso) {
            return res.status(404).send({ message: 'Curso not found and not deleted' });
        }

        
        return res.send({ message: `Curso with name ${deletedCurso.name} deleted successfully` });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error deleting curso', error });
    }
};