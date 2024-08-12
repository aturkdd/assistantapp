import express from 'express'
import { userController } from '../controllers/userController.js'
import { hasPermission,authenticateJWT } from '../utils/authMiddleWare.js'
import { ROLES } from '../utils/helper.js'
export const router = express.Router()

const controller = new userController()

// Map HTTP verbs and route paths to controller actions.

// Log in
router.post('/login', (req, res, next) => controller.login(req, res, next))



router.post('/register', (req, res, next) => controller.register(req, res, next))
router.put('/:id', authenticateJWT, (req, res, next) => hasPermission(req, res, next,[ROLES.OWNER]),(req, res, next) => controller.updateUserInfo(req, res, next))
router.get('/favorites/:id', authenticateJWT, (req, res, next) => hasPermission(req, res, next,[ROLES.OWNER,ROLES.ADMIN]),(req, res, next) => controller.getFavorites(req, res, next))
router.delete('/:id', authenticateJWT, (req, res, next) => hasPermission(req, res, next,[ROLES.OWNER,ROLES.ADMIN]),(req, res, next) => controller.deleteUser(req, res, next))
router.get('/', authenticateJWT, (req, res, next) => hasPermission(req, res, next,[ROLES.ADMIN]),(req, res, next) => controller.getAllUser(req, res, next))
router.put('/changePassword/:id', authenticateJWT, (req, res, next) => hasPermission(req, res, next,[ROLES.OWNER]),(req, res, next) => controller.updatePassword(req, res, next))
router.put('/mangeFavorite/:id', authenticateJWT, (req, res, next) => hasPermission(req, res, next,[ROLES.OWNER]),(req, res, next) => controller.mangeFavorites(req, res, next))
