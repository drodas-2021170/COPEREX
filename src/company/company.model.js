import { Schema, model } from "mongoose";

const companySchema = Schema(
    {
        name:{
            type: String,
            maxLenght:[25,'Cant be overcome 25 characters'],
            required:[true, 'Name is required']
        },
        impactLevel:{
            type:String,
            maxLenght:[25,'Cant be overcome 25 characters'],
            required:[true, 'Impact level is required']
        },
        trayectoryYears:{
            type: Number,
            required:[true, 'Trayectory years is required']
        },
        businessPhone:{
            type: String,
            required:[true, 'Business Phone is required']
        },
        businessEmail:{
            type:String,
            required:[true, 'Business Email is required']
        }
    }
)

export default model('Company', companySchema)