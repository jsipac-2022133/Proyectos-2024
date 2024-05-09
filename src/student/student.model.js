import mongoose from 'mongoose'

const studentSchema=mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true
    },
    username:{
        type: String,
        unique: true, 
        lowercase: true,
        required: true
    },
    password:{
        type: String,
        minLength: [8, 'Password must be 8 characters'],
        required: true
    },
    phone:{
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    role:{
        type: String,
        uppercase: true,
        enum: ['STUDENT_ROLE'], 
        required: true
    },
    clase1: {
        type: mongoose.Types.ObjectId,
        ref: 'cursos',
        default: null
    },
    clase2: {
        type: mongoose.Types.ObjectId,
        ref: 'cursos',
        default: null
    },
    clase3: {
        type: mongoose.Types.ObjectId,
        ref: 'cursos',
        default: null
    }
})

//premongoose

export default mongoose.model('student',studentSchema)



