export const userLogin = userInfo => {
    return {
        type: 'USER_LOGIN',
        userInfo
    }
}

export const userManger = userIdentity => {
    return {
        type: 'USER_MANGER',
        userIdentity
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