import Category from "./category.model.js";

export const addCategory = async(req,res) =>{
    try {
        let data = req.body

        let category = new Category(data)

        await category.save()
        return res.send({success:true, message:'Category Saved'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({sucess: false, message:'General Error'})
    }
}

