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
      const user = await User.findOne({username: req.body.username})
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

  // Can implement page later
// const UpdatePassword = async (req, res) => {
//     try {
//       const { oldPassword, newPassword } = req.body
//       const user = await User.findByPk(req.params.user_id)
//       if (
//         user &&
//         (await middleware.comparePassword(
//           user.dataValues.passwordDigest,
//           oldPassword
//         ))
//       ) {
//         let passwordDigest = await middleware.hashPassword(newPassword)
//         await user.update({ passwordDigest })
//         return res.send({ status: 'Ok', payload: user })
//       }
//       res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
//     } catch (error) {}
//   }
  
  const CheckSession = async (req, res) => {
    const { payload } = res.locals
    res.send(payload)
  }

  module.exports = {
    Login,
    Register,
    // UpdatePassword,
    CheckSession
  }
  