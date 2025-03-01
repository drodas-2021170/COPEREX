import { Router } from "express"
import { addCompany, getCompany, getCompanyCategory, getCompanyOrder, getCompanyYears, getExcelCompanies } from "./company.controller.js"
import { validateJwt } from "../../middlewares/validate.js"

const api = Router()

api.post('/addCompany',[validateJwt],addCompany)
api.get('/getCompany',[validateJwt], getCompany)

api.get('/getExcel', [validateJwt],getExcelCompanies)
api.get('/getCompaniesByCategory',[validateJwt], getCompanyCategory)
api.get('/getTrayectoryYears', [validateJwt],getCompanyYears)
api.get('/getCompanyOrder', [validateJwt],getCompanyOrder)

export default api