import express from "express";
import {StatisticController } from '../controllers/statisticController.js'
import { authenticateJWT,hasPermission } from "../utils/authMiddleWare.js";
import { ROLES } from "../utils/helper.js";
export const router= express.Router()
const controller = new StatisticController()
router.get('/summary',authenticateJWT, (req, res, next) => hasPermission(req, res, next,[ROLES.ADMIN]),(req, res, next) => controller.getSummary(req, res, next))
router.post('/views',(req, res, next) => controller.addView(req, res, next))

