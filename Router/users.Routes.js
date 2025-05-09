import {Router} from 'express'

import {createUser} from '../controllers/UserControllers.js'
import { AllfieldsRequired} from '../middlewares/AllfieldsRequired.js'

import {CheckEmailPassword} from '../middlewares/UniqueIds.js'
export const usersRouter = Router()

usersRouter.route('/register')
.post(AllfieldsRequired,CheckEmailPassword,createUser)