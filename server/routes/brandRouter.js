const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController.js')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware.js')


router.post('/', checkRoleMiddleware('ADMIN'), brandController.create)
router.get('/', brandController.getAll)



module.exports = router