const user = (state = {}, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return {
        ...action.userInfo
      }
    case 'USER_LOGOUT':
      return {
        userId: '',
        userName: '',
        userIdentity: '',
        userAvaterAvatar: ''
      }
    case 'USER_MANGER':
      return {
        ...state,
        userIdentity: action.userIdentity
      }
    default:
      return state
  }
}

export default user

  // userId : action.userInfo.userId,
    // userName : action.userInfo.userName,
    // userIdentity : action.userInfo.userIdentity,
    // userAvaterAvatar : action.userInfo.userAvaterAvatar