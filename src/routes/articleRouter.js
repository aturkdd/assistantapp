import express from 'express'
import { articleController } from '../controllers/articlecontroller.js'
import { authenticateJWT, hasPermission} from '../utils/authMiddleWare.js'
import { ROLES } from '../utils/helper.js'
import multer from 'multer'
import path from 'path';
import { fileURLToPath } from 'url';


export const router = express.Router()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname,'ÅÅÅÅÅÅÅÅÅÅÅ')
const upload = multer({ dest: `${__dirname}/../uploads` });
const controller = new articleController()


router.post('/',authenticateJWT, (req, res, next) => hasPermission(req, res, next,[ROLES.ADMIN]), upload.any(),(req, res, next) => controller.addNewArticle(req, res, next))

router.put('/:id',authenticateJWT, (req, res, next) => hasPermission(req, res, next,[ROLES.ADMIN]), (req, res, next) => controller.updateArticle(req, res, next))
router.get('/:id',authenticateJWT, (req, res, next) => hasPermission(req, res, next,[ROLES.ADMIN,ROLES.USER]), (req, res, next) => controller.getOneArticle(req, res, next))
router.delete('/:id',authenticateJWT, (req, res, next) => hasPermission(req, res, next,[ROLES.ADMIN]), (req, res, next) => controller.deleteArticle(req, res, next))
router.get('/',authenticateJWT, (req, res, next) => hasPermission(req, res, next,[ROLES.ADMIN,ROLES.USER]), (req, res, next) => controller.getAllArticles(req, res, next))
