const { GET_HOME_QUERY, SET_HOME_QUERY } = require('../types')

const iState = {
  query: { username: '', newUsername: '', newName: '' }
}

const HomeReducer = (state = iState, action) => {
  switch (action.type) {
    case GET_HOME_QUERY:
      return { ...state, query: { ...action.payload } }
    case SET_HOME_QUERY:
      return { ...state, query: { ...action.payload } }
    default:
      return { ...state }
  }
}

export default HomeReducer
