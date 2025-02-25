import User from "../users/users.model.js";
import {encrypt, checkPassword}  from "../../utils/encrypt.js";

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