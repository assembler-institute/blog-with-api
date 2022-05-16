import {postUser} from './api-communication.js'
const url = `https://pokeapi.co/api/v2/pokemon`

async function getPokemon(){

    try {
        for (let id = 1; id<=20; id++){
            const response = await fetch(`${url}/${id}`)
            const data = await response.json()
            postUser(id, data.name, data.sprites.front_default)
        }
    } catch(error) {
        console.error(error)
    }

}

export default getPokemon