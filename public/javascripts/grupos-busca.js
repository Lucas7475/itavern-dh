var idGrupo;

const colocaNoGrupo = (id) =>{
    return fetch('/grupos/addNoGrupo',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({id})
    }).then(resul =>{
        if(resul.status == 200){
            return resul.json();
        }
    }).then(data =>{
        return data;
    })
}

document.querySelectorAll('.entrar').forEach(botao=>{
    botao.addEventListener('click', evento =>{
        evento.preventDefault();
        idGrupo = evento.composedPath()[2].id;
    })
})

document.getElementById('confirmaEntrada').addEventListener('click', async (evento) =>{
    evento.preventDefault();
    let resul = await colocaNoGrupo(idGrupo);
    console.log(resul.situacao);
    document.getElementById(`${idGrupo}`).remove();
    idGrupo = null;
    
})