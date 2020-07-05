
const btnLogin = document.getElementById('login');

// verifica login
const verificaLogin = (email, senha) =>{
    return fetch("/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({email, senha})
    }).then(resul =>{
        return resul.json()
    }).then(data =>{
        data.message?
            mostraErro(data.message)
        :
            location.href = 'http://localhost:3000/home'
    })
}

const mostraErro = (erro) =>{
    document.querySelector('h6').innerText = erro;
    document.getElementById('falhaLogin').classList.remove('invi');
}

document.getElementById('login').addEventListener('submit', async (evento) =>{
    evento.preventDefault();
    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;
    await verificaLogin(email, senha)
})