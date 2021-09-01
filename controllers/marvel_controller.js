const { Comic } = require('../models/index')

const postMarvelComicByStackId = async (req, res) => {
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

module.exports = {
  postMarvelComicByStackId
}
