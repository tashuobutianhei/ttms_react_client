const user = (state = [], action) => {
    switch (action.type) {
      case 'USER_LOGIN':
        return [
            {
              ...action.userInfo
            }
          ]
          // userId : action.userInfo.userId,
          // userName : action.userInfo.userName,
          // userIdentity : action.userInfo.userIdentity,
          // userAvaterAvatar : action.userInfo.userAvaterAvatar
       
      case 'USER_LOGOUT':
        return {
          userId:'',
          userName:'',
          userIdentity:'',
          userAvaterAvatar:''
        }
      case 'ADD_TODO':
        return [
          ...state,
          {
            id: action.id,
            text: action.text,
            completed: false
          }
        ]
      case 'TOGGLE_TODO':
        return state.map(todo =>
          (todo.id === action.id) 
            ? {...todo, completed: !todo.completed}
            : todo
        )
      default:
        return state
    }
  }
  
  export default user