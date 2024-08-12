import express from "express";
import { categoryController } from '../controllers/categoryController.js'
import { authenticateJWT,hasPermission } from "../utils/authMiddleWare.js";
import { ROLES } from "../utils/helper.js";
export const router= express.Router()
const controller = new categoryController()
router.post('/',authenticateJWT, (req, res, next) => hasPermission(req, res, next,[ROLES.ADMIN]),(req, res, next) => controller.addCategory(req, res, next))
router.delete('/:id',authenticateJWT, (req, res, next) => hasPermission(req, res, next,[ROLES.ADMIN]),(req, res, next) => controller.deleteCategory(req, res, next))
router.get('/all',authenticateJWT, (req, res, next) => hasPermission(req, res, next,[ROLES.ADMIN,ROLES.USER]),(req, res, next) => controller.getAllCategory(req, res, next))
