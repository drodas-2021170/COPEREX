import {Router} from 'express'
import { validateJwt } from '../../middlewares/validate.js'
import { addCategory } from './category.controller.js'

const api = Router()

api.post('/addCategory', [validateJwt], addCategory)
export default api