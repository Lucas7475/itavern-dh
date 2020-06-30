var idGrupo;

const requsitaDados = (id) =>{
    return fetch(`/info/${id}`,{
        method:'GET'
    }).then(data =>{
        return data.json();
    }).then(resul =>{
        return resul.infGrupo;
    })
}



const montaInfo = (dados)=>{
    let popInfo = document.getElementById('exampleModalCenter');
    popInfo.querySelector('#usuarios').innerText = '';
    popInfo.querySelector('#nomeGrupo').innerHTML = dados.nome;
    popInfo.querySelector('#dataInicio').innerHTML = dados.inicioReuniao;
    if(dados.usuariosDoGrupo == []){
        popInfo.querySelector('.adm').classList.add('invi');
    }
    else{
        dados.usuariosDoGrupo.forEach(usuario =>{
            let articleUsuario = document.createElement('article');
            articleUsuario.setAttribute('class','usuario');
    
            let divImg = document.createElement('div');
            divImg.setAttribute('class','imgUsuario');
    
            let img = document.createElement('img');
            img.setAttribute('id','avatar');
            img.setAttribute('src', "https://vignette.wikia.nocookie.net/dungeonrampage/images/5/5e/Ghost_Samurai.png/revision/latest?cb=20140906175132" );
    
            let label = document.createElement('label');
            label.setAttribute('id','nickname');
            label.innerText = usuario.nickname;
    
            divImg.appendChild(img);
            articleUsuario.appendChild(divImg);
            articleUsuario.appendChild(label);
    
            popInfo.querySelector('#usuarios').appendChild(articleUsuario);
    
            if(usuario.id == dados.id_admin){
                popInfo.querySelector('#nomeAdm').innerHTML = usuario.nickname;
                popInfo.querySelector('.adm').classList.remove('invi');
            }
            else{
                popInfo.querySelector('.adm').classList.add('invi');
            }
        })
    }
    pesquisaCepInfo(dados.cep);
    
}





document.querySelectorAll('.info').forEach(botao => {
    botao.addEventListener('click', async (evento)=>{
        evento.preventDefault();
        idGrupo = evento.composedPath()[2].id;
        let dados = await requsitaDados(idGrupo);
        montaInfo(dados);
    })
});

document.getElementById('fechaInfo').addEventListener('click', evento=>{
    evento.preventDefault();
    document.querySelector('.adm').classList.add('invi');
})