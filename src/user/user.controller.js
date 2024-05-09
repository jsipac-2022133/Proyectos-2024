//lÓGICA
'use strict'

import User from './user.model.js'
import { encrypt, checkPassword, checkUpdate } from '../utils/validator.js'
import {tokenSign} from '../helpers/generateToken.js'


export const test=(req,res)=>{
    return res.send('Hello World')
}

//MOSTRAR
export const getAllUsers = async() => {
    return User.find({});
};


export const register = async (req, res) => {
    try {
        
        let data = req.body;
        
        
        data.password = await encrypt(data.password);
        
        
        
        data.role = 'TEACHER_ROLE';            
          
        
        
        let user = new User(data);
        
        
        await user.save();
        
        
        return res.send({ message: 'Registered Successfully teacher' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error registering user', error });
    }
};


// Login
export const login = async(req, res) => {
    try {
        
        let {username, password} = req.body
        
        let user = await User.findOne({username}) 
        
        const tokenSession=await tokenSign(user)
        
        
        if(user && await checkPassword(password, user.password)) {
            
            let loggerUser = {
                username: user.username,
                name: user.name,
                role: user.role,
                tokenSession
            }            

            

            
            return res.send({message: `Welcome ${user.name}`, loggerUser})
        }
        return res.status(404).send({message: 'User or password incorrect'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error logging in', err})
    }
}

export const update =async(req, res)=>{
    try {
        
        let {id} =req.params
        
        let data=req.body
        
        let update=checkUpdate(data, id)
        if(!update) return res.status(400).send({message: 'Have submited some data that cannot be updated or missing data'})
        
        let updatedUser=await User.findOneAndUpdate(
            {_id: id}, 
            data, 
            {new: true} 
        )
        
        if(!updatedUser) return res.status(401).send({message: 'User not found and not updated'})
        
        return res.send({message: 'Updated user', updatedUser})
    } catch (error) {
        console.error(error)
        if(error.keyValue.username) return res.status(400).send({message: `Username ${error.keyValue.username} is already taken`})
        return res.status(500).send({message: 'Error updating account'})
    }
}

export const deleteU=async(req, res)=>{
    try {
        
        let {id}=req.params
        
        let deletedUser=await User.findOneAndDelete({_id: id})
        
        if(!deletedUser) return res.status(404).send({message: 'Account not found and not deleted'})
        
        return res.send({message: `Account with username ${deletedUser.username} deleted sucessfully` })
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error deleting account'})
    }
}






