import { Router } from "express"
import { addCompany, getCompany, getCompanyCategory, getCompanyOrder, getCompanyYears, getExcelCompanies } from "./company.controller.js"
import { validateJwt } from "../../middlewares/validate.js"
import { addCompanyValidator, getCategoryValidator, getOrderValidator, getTrayectoryValidator } from "../../middlewares/validation.js"

const api = Router()

api.post('/addCompany',[validateJwt, addCompanyValidator],addCompany)
api.get('/getCompany',[validateJwt], getCompany)

api.get('/getExcel', [validateJwt],getExcelCompanies)
api.get('/getCompaniesByCategory',[validateJwt, getCategoryValidator], getCompanyCategory)
api.get('/getTrayectoryYears', [validateJwt,getTrayectoryValidator],getCompanyYears)
api.get('/getCompanyOrder', [validateJwt, getOrderValidator],getCompanyOrder)

export default api