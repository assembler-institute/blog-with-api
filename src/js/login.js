
const loginUser = () => {
    fetch('http://localhost:3000/users', {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => data.map(userData => {

            document.getElementById('loginbutton').addEventListener('click', function () {
                const userName = document.getElementById('login__Username');
                const email = document.getElementById('login__Email');

                if(userName.value === userData.username && email.value === userData.email){
                    localStorage.setItem('idUser', userData.id);
                }
            });
            
        }))
        .catch(err => console.warn(err));


}

export default loginUser;