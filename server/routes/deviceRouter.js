const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController.js')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware.js')



router.post('/', checkRoleMiddleware('ADMIN'), deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)




module.exports = router

// (req,res)=>{
  
  
//   return deviceController.getAll(req,res)}