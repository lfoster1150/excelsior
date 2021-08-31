const { Router } = require('express')
const router = Router()
const controllers = require('../controllers/controller.js')

router.get('/', (req, res) => res.send('This is root!'))

router.post('/user', controllers.postUser)
router.get('/user/:username', controllers.getByUsername)

router.post('/user/:username/stack', controllers.postStack)
router.get('/user/:username/stack', controllers.GetStacksByUserId)
router.delete('/user/:username/stack/:id', controllers.deleteStackById)

module.exports = router
