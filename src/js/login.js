import {getUsers} from './api-communication.js'

//Username & Email
async function loginUser(username, email) {
    const registeredUsers = await getUsers()
    const registeredUsernames = registeredUsers.map(user => user.username)
    const userPos = registeredUsernames.indexOf(username)
    if(userPos !== -1){
        sessionStorage.setItem('userId', registeredUsers[userPos].id)
        sessionStorage.setItem('username', registeredUsers[userPos].username)
    } //write else to register new user
}

// async function registerUser(...params){
//     const [id, username, email] = params

// }

export default loginUser