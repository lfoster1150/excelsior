const { Router } = require('express')
const router = Router()
const controllers = require('../controllers/controller.js')
const marvelControllers = require('../controllers/marvel_controller.js')
const middleware = require('../middleware')
const authControllers = require('../controllers/AuthController.js')

// Routers for Home page
router.post('/user', controllers.postUser)
router.get('/user/:username', controllers.getByUsername)

// Routers for User page
router.post('/user/:username/stack', controllers.postStack)
router.get('/user/:username/stack', controllers.GetStacksByUserId)
router.get('/user/:username/stack/:id', controllers.getStackById)
router.delete('/user/:username/stack/:id', controllers.deleteStackById)

// Routers for Stack page
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

// routers for Auth
router.post('/auth/login', authControllers.Login)
router.post('/auth/register', authControllers.Register)
// router.post(
//   '/auth/update',
//   middleware.stripToken,
//   middleware.verifyToken,
//   authControllers.UpdatePassword
// )
router.get(
  '/auth/session',
  middleware.stripToken,
  middleware.verifyToken,
  authControllers.CheckSession
)

// routers for Marvel Api
router.post(
  '/user/:username/stack/:id/comic',
  marvelControllers.postMarvelComicByStackId
)

module.exports = router
