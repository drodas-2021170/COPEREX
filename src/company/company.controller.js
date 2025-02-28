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

        if(company.length === 0) return res.status(404).send({success: false, message:'No companies found '})
        return res.send({success: true, message:'Companies Found   ', company})

    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error', err}) 
    }
}

export const getCompanyYears = async(req, res)=>{
    try {
        let {trayectoryYears} = req.body
        let company = await Company.find({trayectoryYears: trayectoryYears})

        if(company.length === 0) return res.status(404).send({success: false, message:'No companies found for this trayectory years'})
        return res.send({success: true, message:'Companies Found by trayectory Years', company})

    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error', err}) 
    }
}


export const getCompanyCategory = async(req,res) =>{
    try {
        let {category} = req.body
        let companyCategory  = await Company.find({category: category})

        if(companyCategory.length === 0) return res.status(404).send({success: false, message:'No companies found for this category'})
            return res.send({success: true, message: `Companies found for category: ${companyCategory.category}`, companyCategory, total: companyCategory.length})
    } catch (err) {
        console.error(err)
        return res.status(500).send({success: false, message: 'General Error', err})
    }
}

export const getCompanyOrder= async(req,res) =>{
    try {
        let {Order} = req.body
        
        if(Order === 1){
            let companyCategory  = await Company.find().asc()
    
            if(companyCategory.length === 0) return res.status(404).send({success: false, message:'No companies found for this category'})
                return res.send({success: true, message: `Companies found for category: ${companyCategory.category}`, companyCategory, total: companyCategory.length})
        }else if(Order === 1){
            let companyCategory  = await Company.find().dsc()
    
            if(companyCategory.length === 0) return res.status(404).send({success: false, message:'No companies found for this category'})
                return res.send({success: true, message: `Companies found for category: ${companyCategory.category}`, companyCategory, total: companyCategory.length})
        }else{
            return res.status(404).send({success: false, message:'Introduce a validate option'})
        }
    } catch (err) {
        console.error(err)
        return res.status(500).send({success: false, message: 'General Error', err})
    }
}

export const getExcelCompanies = async(req,res) =>{
    try {
        const excel = await XlsxPopulate.fromBlankAsync()
        let company = await Company.find().populate("category", "name");

        const data = company.map(company => [
            company.name, 
            company.impactLevel, 
            company.trayectoryYears, 
            company.businessPhone, 
            company.businessEmail, 
            company.category.name
        ]);

        excel.sheet(0).cell('A1').value([
            ['Nombre de la Empresa', 'Nivel de impacto', 'Años de trayectoria', 'Telefono', 'Email', 'Category'],
        ])
        excel.sheet(0).cell('A2').value([...data])

        excel.sheet(0).column('A').width(30);
        excel.sheet(0).column('B').width(20);
        excel.sheet(0).column('C').width(20);
        excel.sheet(0).column('D').width(20);
        excel.sheet(0).column('E').width(30);
        excel.sheet(0).column('F').width(20);

        excel.toFileAsync("./companies2.xlsx")
        return res.send({success:true, message:'Generating Excel'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error', err}) 
    }
}