import Axios from 'axios'

export const Client = Axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public'
  // headers: { Authorization: `Bearer ${process.env.REACT_APP_MARVEL_KEY}`
})

export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? `${window.location.origin}/api`
    : 'http://localhost:3001/api'

export const MARVEL_KEY = process.env.REACT_APP_MARVEL_KEY
export const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY
