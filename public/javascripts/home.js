var idGrupo;
var idCandidato;

const requsitaDados = (id) =>{
    return fetch(`/info/${id}`,{
        method:'GET'
    }).then(data =>{
        return data.json();
    }).then(resul =>{
        return resul.infGrupo;
    })
}

const requisitaNotificacoes = (id) =>{
    return fetch(`/notificacoes/${id}`,{
        method:"GET"
    }).then(data =>{
        return data.json();
    }).then(resul =>{
        return resul.pedidos;
    })
}

const mudaStatus = (novoStatus) =>{
    return fetch('/mudaStatus',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({novoStatus, idGrupo, idCandidato})
    }).then(data =>{
        return data.json();
    }).then(resul =>{
        return resul.resposta;
    })
}

const montaInfo = async (dados)=>{
    let popInfo = document.getElementById('exampleModalCenter');
    popInfo.querySelector('#usuarios').innerText = '';
    popInfo.querySelector('#nomeGrupo').innerHTML = dados.nome;
    popInfo.querySelector('#dataInicio').innerHTML = dados.inicioReuniao;

    pesquisaCepInfo(dados.cep);

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
        }
    })
    if(dados.id_admin == dados.idLogado){
        popInfo.querySelector('.adm').classList.remove('invi');
        let pedidos = await requisitaNotificacoes(idGrupo);
        montaPedidos(pedidos);
    }
    else{
        popInfo.querySelector('.adm').classList.add('invi');
    }
    
}

const montaPedidos = (pedidos) =>{
    //array de obj
    let boxPedidos = document.getElementById('style-1');
    document.getElementById('style-1').innerText = "";

    pedidos.forEach(pedido =>{
        let notificacao = document.createElement('div');
        notificacao.setAttribute('class','notificacao');
        notificacao.setAttribute('id', `${pedido.id_usuario}`)

        let frasePedido = document.createElement('span');
        frasePedido.setAttribute('class', 'frasePedido');
        frasePedido.innerText = `Deseja aceitar ${pedido.nickname} em seu grupo`;

        let aprovar = document.createElement('i');
        aprovar.setAttribute('class', 'fa fa-beer');
        aprovar.setAttribute('id', 'aprovar');
        eventoAprovar(aprovar, pedido.id_usuario, pedido.nickname);

        let reprovar = document.createElement('i');
        reprovar.setAttribute('class', 'fa fa-beer');
        reprovar.setAttribute('id', 'reprovar');
        eventoReprovar(reprovar, pedido.id_usuario, pedido.nickname);

        notificacao.appendChild(frasePedido);
        notificacao.appendChild(aprovar);
        notificacao.appendChild(reprovar);

        boxPedidos.appendChild(notificacao);
    })
}

const eventoAprovar = (botao, id, nickname) =>{
    botao.addEventListener('click', async (evento) =>{
        evento.preventDefault();
        idCandidato = evento.composedPath()[1].id
        let resul = await mudaStatus('aprovado');
        let frasePedido = document.getElementById(`${id}`);
        frasePedido.innerHTML = `${nickname} foi aprovado`;
    })
}

const eventoReprovar = (botao, id, nickname) =>{
    botao.addEventListener('click', async (evento) =>{
        evento.preventDefault();
        idCandidato = evento.composedPath()[1].id;
        let resul = await mudaStatus('recusado');
        let frasePedido = document.getElementById(`${id}`);
        frasePedido.innerHTML = `${nickname} foi recusado`;
    })
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