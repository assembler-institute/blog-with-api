import {getUserName} from './api-communication.js'

//Username & Email
async function loginUser(username) {
    console.log(username)
    const registeredUsers = await getUserName(username)
    console.log(registeredUsers)

    if(registeredUsers.length !== 0){
        sessionStorage.setItem('userId', registeredUsers[0].id)
        sessionStorage.setItem('username', registeredUsers[0].username)
        sessionStorage.setItem('avatarimg', registeredUsers[0].imgSrc)

        location.reload()
    }
}

export default loginUser