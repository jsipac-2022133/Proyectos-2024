import mongoose from 'mongoose'

const cursosSchema=mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    teacher: {
        type:mongoose.Types.ObjectId,
        required: true
    }
})

export default mongoose.model('cursos',cursosSchema)