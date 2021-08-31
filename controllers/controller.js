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

const postStack = async (req, res) => {
  console.log(req.body)
  try {
    const newStack = await Stack.create(req.body)
    await newStack.save()
    if (newStack) {
      return res.status(201).json({ newStack })
    }
  } catch (error) {
    return res.status(500).send({ error: error.message })
  }
}

const GetStacksByUserId = async (req, res) => {
  try {
    const { username } = req.params
    const user = await User.find({ username: username })
    const stacks = await Stack.find({ user: user[0]._id })
    if (stacks) {
      return res.status(200).json({ stacks })
    }
    return res
      .status(404)
      .send('User with the specified Username does not exists')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const deleteStackById = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Stack.findByIdAndDelete(id)
    if (deleted) {
      return res.status(200).send('Stack deleted')
    }
    throw new Error('Stack not found')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  postUser,
  getByUsername,
  postStack,
  GetStacksByUserId,
  deleteStackById
}
