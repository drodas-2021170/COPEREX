import { Schema, model } from "mongoose"

const userSchema = Schema({
        name:{
            type: String,
            maxLenght:[25, 'Cant be overcome 25 characters'],
            required: [true,'Name is required']
        },
        surname:{
            type: String,
            maxLenght: [25, 'Cant be overcome 25 characters'],
            required:[true, 'Surname is required']
        },
        username:{
            type: String,
            unique:true,
            required:[true,'Username is required'],
            maxLenght:[15,' Cant be overcome 15 characters']
        },
        email:{
            type:String,
            unique: true,
            required:[true, 'Email is required'],
        },
        password:{
            type: String,
            minLength:[8, 'Password must be 8 characters'],
            maxLenght:[100,'Cant be overcome 16 characters'],
            required:[true, 'Password is required'],
        },
        role:{
            type:String,
            require:[true, 'Role is required'],
            default: 'ADMIN'
        },
        status: {
            type: Boolean,
            default: true
        }
    }
)

export default model('User',userSchema)