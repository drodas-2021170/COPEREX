import { Schema, model } from "mongoose"

const categorySchema = Schema(
    {
        name: {
            type: String,
            maxLenght:[25,'Cant be overcome 25 characters'],
            required:[true, 'Name is required']
        },
        description:{
            type: String,
            maxLenght:[25,'Cant be overcome 25 characters'],
            required:[true, 'Name is required']
        }
    }
)

export default model('Category', categorySchema)