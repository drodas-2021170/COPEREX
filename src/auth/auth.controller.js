import User from "../users/users.model.js";
import {encrypt, checkPassword}  from "../../utils/encrypt.js";
import { generatejwt } from "../../utils/jwt.js";

export const defaultAdmin = async(req,res) =>{
    try {
        let defaultAd = await User.findOne({username: 'ADMIN'})
        if(!defaultAd) 
            defaultAd = await User.create(
        {
            name: 'admin',
            surname: 'admin',
            username: 'ADMIN',
            email: 'admin@gmail.com',
            password: await encrypt(process.env.ADMIN_KEY),
        }
    )
        await defaultAd.save()
    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error',err})
    }
}


export const login = async(req,res) =>{
    try {
        let{userData, password} = req.body
        let admin = await User.findOne(
            {
                $or:[
                    {username: userData},
                    {email:userData}
                ]
            }
        )
    if(!admin) return res.status(404).send({success: false, message:'Admin not found' })
    
    let match  = await checkPassword(admin.password, password)

    if(!match ) return res.status(404).send({success:true, message:'Incorrect password, try again'})
    if(admin && match){

        let loggedAdmin = {
            uid: admin._id,
            username: admin.username,
            email: admin.email
        }
        let token = await generatejwt(loggedAdmin)
        return res.send({success: true, message:`Welcome: ${admin.username}`, loggedAdmin, token})
    }
    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error', err})
    }   
}

