import { Router } from "express"
import { addCompany, getCompany, getCompanyCategory, getCompanyYears, getExcelCompanies } from "./company.controller.js"
import { validateJwt } from "../../middlewares/validate.js"

const api = Router()

api.post('/addCompany',[validateJwt],addCompany)
api.get('/getCompany',[validateJwt], getCompany)

api.get('/getExcel', getExcelCompanies)
api.get('/getCompaniesByCategory', getCompanyCategory)
api.get('/getTrayectoryYears', getCompanyYears)

export default api