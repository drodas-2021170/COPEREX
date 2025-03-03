import {Router} from 'express'
import { validateJwt } from '../../middlewares/validate.js'
import { addCategory } from './category.controller.js'
import { addCetegoryValidator } from '../../middlewares/validation.js'

const api = Router()

api.post('/addCategory', [validateJwt, addCetegoryValidator], addCategory)
export default api