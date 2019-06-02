    export const userLogin = userInfo => {
        return {
        type: 'USER_LOGIN',
        userInfo
        }
    }

    export const userLogout = userInfo => {
        return {
        type: 'USER_LOGOUT'
        }
    }

    // userId:'1997120300001',
    // userName:'她说不天黑',
    // userIdentity:'manger',
    // userAvaterAvatar:'avater'