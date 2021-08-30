const { User, Stack, Comic } = require('../models/index')

const postUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body)
    await newUser.save()
    if (newUser) {
      return res.status(201).json({ newUser })
    }
  } catch (error) {
    return res.status(500).send({ error: error.message })
  }
}

const getByUsername = async (req, res) => {
  try {
    const { username } = req.params
    const user = await User.find({ username: username })
    if (user) {
      return res.status(200).json({ user })
    }
    return res
      .status(404)
      .send('User with the specified Username does not exists')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  postUser,
  getByUsername
}
