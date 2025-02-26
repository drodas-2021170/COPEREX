import Company from "./company.model.js"
import Category from "../category/category.model.js"
import XlsxPopulate from "xlsx-populate"


export const addCompany = async(req,res) =>{
    try {
        let data = req.body
        let category = await Category.findOne({_id: data.category})
        
        if(!category) return res.status(404).send({status:false, message:'Category not found'})
        
            let company = new Company({...data, category:data.category})
        await company.save()
        return res.send({success: true, message:'Company Saved'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error', err})
    }
} 

export const getCompany = async(req, res)=>{
    try {
        let company = await Company.find()

        return res.send({success: true, message:'Companies Found', company})
    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error', err}) 
    }
}

export const getExcelCompanies = async(req,res) =>{
    try {
        const excel = await XlsxPopulate.fromBlankAsync()
        let company = await Company.find()

        excel.sheet(0).cell('A1').value([
            ['Nombre de la Empresa', 'Nivel de impacto', 'Años de trayectoria', 'Telefono', 'Categoria'],
            [company.name, company.impactLevel, company.trayectoryYears, company.businessPhone, company.businessEmail, company.category]
        ])

        excel.toFileAsync("./companies2.xlsx")
        return res.send({success:true, message:'Generating Excel'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error', err}) 
    }
}