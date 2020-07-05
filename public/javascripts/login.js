var senhaUser;
var senhaDigitada;
var emailUserRec;

const emailDaRec = document.querySelector('h6').innerText;

const btnLogin = document.getElementById('login');


setTimeout(()=>{
    if(emailDaRec.includes("@")){
        document.getElementById('lblEmail').classList.add("invi");
        document.getElementById('informa').classList.add("invi");
        document.getElementById('lblSenha').classList.remove("invi");
        document.getElementById('confirmaSenhaRec').classList.remove("invi");

        emailUserRec = document.querySelector('h6').innerText;

        let formRec = document.getElementById('recupera');
        formRec.setAttribute('action','login/update');

        document.getElementById('btnConf').addEventListener('click', async (evento) =>{
            evento.preventDefault();
            senhaUser == senhaDigitada?
                await atualizaSenha(document.getElementById('senhaRec').value)
            :
                mostraErro('Senhas não compativeis')
        })
        $('#esqueciSenha').modal('show')
    }
})


// verifica login
const verificaLogin = (email, senha) =>{
    fetch("/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({email, senha})
    }).then(resul =>{
        return resul.json();
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

const comparaSenhas = () =>{
    document.getElementById('checkSenha').classList.remove('invi')
    senhaUser = document.getElementById('senhaUser').value;
    let senhaDigitada = document.getElementById('confirmarSenhaUser').value;

    setTimeout(()=>{
        senhaUser == senhaDigitada ? 
        document.getElementById('checkSenha').innerText = "As senhas correspondem"
    :
        document.getElementById('checkSenha').innerText = "As senhas não correspondem"
    })
}

const comparaSenhasRec = () =>{
    document.getElementById('checkSenhaRec').classList.remove('invi')
    senhaDigitada = document.getElementById('confirmaRec').value;
    senhaUser = document.getElementById('senhaRec').value;

    setTimeout(()=>{
        senhaUser == senhaDigitada ? 
        document.getElementById('checkSenhaRec').innerText = "As senhas correspondem"
    :
        document.getElementById('checkSenhaRec').innerText = "As senhas não correspondem"
    })
}

const atualizaSenha = (senha) =>{
    return fetch("/login/update",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({email:emailUserRec, senha})
    }).then(resp =>{
        return resp.json()
    }).then(data =>{
        !data.message?
            location.href = 'http://localhost:3000/home'
        :
            mostraErro(data.message)
    })
}

document.getElementById('login').addEventListener('submit', async (evento) =>{
    evento.preventDefault();
    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;
    verificaLogin(email, senha);
})

document.getElementById('confirmarSenhaUser').addEventListener('keyup', evento =>{
    comparaSenhas();
})
document.getElementById('senhaUser').addEventListener('keyup', evento =>{
    comparaSenhas();
})

document.getElementById('senhaRec').addEventListener('keyup', evento =>{
    comparaSenhasRec();
})

document.getElementById('confirmaRec').addEventListener('keyup', evento=>{
    comparaSenhasRec();
})