const { User } = require('../models/index')
const middleware = require('../middleware')

const Register = async (req, res) => {
    try {
      const { username, password, name } = req.body
      let passwordDigest = await middleware.hashPassword(password)
        const user = await User.create({ username: username, passwordDigest: passwordDigest, name: name })
      res.send(user)
    } catch (error) {
      throw error
    }
  }

const Login = async (req, res) => {
    try {
      const user = await User.findOne({username: req.body.username}).option({ raw: true })
      if (
        user &&
        (await middleware.comparePassword(user.passwordDigest, req.body.password))
      ) {
        let payload = {
          id: user.id,
          email: user.email
        }
        let token = middleware.createToken(payload)
        return res.send({ user: payload, token })
      }
      res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
    } catch (error) {
      throw error
    }
  }

  module.exports = {
    Login,
    Register,
    // UpdatePassword,
    // CheckSession
  }
  