import { Router } from "express"
import { login } from "./auth.controller.js"
import { loginValidator } from "../../middlewares/validation.js"

const api = Router()

api.post('/login',[loginValidator], login)

export default api