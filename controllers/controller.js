const { User, Stack, Comic } = require('../models/index')

// From Home page: Creates new user
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

// From Home page: Gets User page based on existing username
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

// From Home page: creates new stack
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

// From User page: gets existing stacks from associated user id
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

// From User page: Deletes Stack
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

// From User page: Gets specific stack from Stack _id
const getStackById = async (req, res) => {
  try {
    const { id } = req.params
    const stack = await Stack.findById(id)
    if (stack) {
      return res.status(200).json({ stack })
    }
    return res.status(404).send('Stack with the specified _id does not exists')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

// From Stack page: Adds comic to current Stack _id
const postComicByStackId = async (req, res) => {
  console.log(req.body)
  try {
    const newComic = await Comic.create(req.body)
    await newComic.save()
    if (newComic) {
      return res.status(201).json({ newComic })
    }
  } catch (error) {
    return res.status(500).send({ error: error.message })
  }
}

// From Stack page: Gets all comics associated with current Stack _id
const getComicsByStackId = async (req, res) => {
  try {
    const { id } = req.params
    const comics = await Comic.find({ stack: id })
    console.log(comics)
    if (comics) {
      return res.status(200).json({ comics })
    }
    return res.status(404).send('Stack with the specified id does not exists')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

// From Stack page: Gets comic details for a specific Comic _id
const getComicDetailsById = async (req, res) => {
  try {
    const { comic_id } = req.params
    const comics = await Comic.findById(comic_id)
    console.log(comics)
    if (comics) {
      return res.status(200).json({ comics })
    }
    return res.status(404).send('Stack with the specified id does not exists')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

// From Stack page: Deletes comic from DB based on specific Comic _id
const deleteComicById = async (req, res) => {
  console.log(req.params)
  try {
    const { comic_id } = req.params
    const deleted = await Comic.findByIdAndDelete(comic_id)
    if (deleted) {
      return res.status(200).send('Comic deleted')
    }
    throw new Error('Comic not found')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  postUser,
  getByUsername,
  postStack,
  GetStacksByUserId,
  deleteStackById,
  getStackById,
  postComicByStackId,
  getComicsByStackId,
  deleteComicById,
  getComicDetailsById
}
