const { GET_HOME_QUERY, SET_HOME_QUERY } = require('../types')

export const GetHomeQuery = (query) => ({
  type: GET_HOME_QUERY,
  payload: query
})

export const SetHomeQuery = (query) => ({
  type: SET_HOME_QUERY,
  payload: query
})
