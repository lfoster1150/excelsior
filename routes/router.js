const { Router } = require('express')
const router = Router()
const controllers = require('../controllers/controller.js')
const marvelControllers = require('../controllers/marvel_controller.js')

// router.get('/', (req, res) => res.send('This is root!'))

router.post('/user', controllers.postUser)
router.get('/user/:username', controllers.getByUsername)

router.post('/user/:username/stack', controllers.postStack)
router.get('/user/:username/stack', controllers.GetStacksByUserId)
router.get('/user/:username/stack/:id', controllers.getStackById)
router.delete('/user/:username/stack/:id', controllers.deleteStackById)

router.post('/user/:username/stack/:id/comic', controllers.postComicByStackId)
router.get('/user/:username/stack/:id/comic', controllers.getComicsByStackId)
router.get(
  '/user/:username/stack/:id/comic/:comic_id',
  controllers.getComicDetailsById
)
router.delete(
  '/user/:username/stack/:id/comic/:comic_id',
  controllers.deleteComicById
)

// routers for Marvel Api
router.post(
  '/user/:username/stack/:id/comic',
  marvelControllers.postMarvelComicByStackId
)

module.exports = router
