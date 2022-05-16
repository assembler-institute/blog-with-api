import {getUserName} from './api-communication.js'

//Username & Email
async function loginUser(username) {
    const registeredUsers = await getUserName(username)
    
    console.log(registeredUsers)

    if(registeredUsers.length !== 0){
        sessionStorage.setItem('userId', registeredUsers[0].id)
        sessionStorage.setItem('username', registeredUsers[0].pokemonName)
        sessionStorage.setItem('avatarimg', registeredUsers[0].pokemonImg)

        location.reload()
    }
}

// async function registerUser(...params){
//     const [id, username, email] = params

// }

export default loginUser