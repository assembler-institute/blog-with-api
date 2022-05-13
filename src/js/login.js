const url = 'http://localhost:3000/users'

//THIS FUNCTION IS NOT USED BUT COULD BE USED IN SOME OTHER PARTS OF THE CODE!!!
// async function fetchUser(id){
//     try {
//         const response = await fetch(`${url}/${id}`, {
//             method: 'GET'
//         })
//         const user = await response.json()
//         return user
//     } catch (error) {
//         console.error(error)
//     }
// }

async function fetchUsers(){
    try{
        const response = await fetch(`${url}`, {
            method : 'GET'
        })
        const users = await response.json()
        return users
    } catch(error) {
        console.error(error)
    }
}

//Username & Email
async function loginUser(username, email) {
    const registeredUsers = await fetchUsers()
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