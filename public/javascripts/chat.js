
const idGrupo = document.getElementById('refGrupo').innerText;

const buscaChat = () =>{
    return fetch(`/chat/${idGrupo}`,{
        method:"GET",
    }).then(resul =>{
        return resul.json()
    }).then(data =>{
        return data.mensagens;
    })
}

setTimeout(async()=>{
    var socket = io('http://localhost:3000');

    socket.on('outrasMsg', (mensagem) =>{
        showMessage(mensagem);
    })

    let mensagens = await buscaChat();
    let x = 0;
    for(mensagem of mensagens){
        if(x != 0){
            showMessage(mensagem);
        }
        x++;
    }

    // socket.on('msgAntigas', (mensagens)=>{
    //     for(mensagem of mensagens){
    //         showMessage(mensagem)
    //     }
    // })

    document.getElementById('formChat').addEventListener('submit',evento=>{
        evento.preventDefault();

        let autor = document.getElementById('userAtual').innerText;
        let mensagem = document.getElementById('mensagem').value;

        document.getElementById('mensagem').value = '';

        let objMsg;
        if(autor.length && mensagem.length){
            objMsg ={
                autor,
                mensagem,
                idGrupo
            }
        }

        showMessage(objMsg);

        socket.emit('enviaMsg', objMsg);
    })
})

const showMessage = (mensagem) =>{
    if(mensagem.autor == document.getElementById('userAtual').innerText){
        $('.message-area').append(
            `<div class="chat-msg my-msg">
                <h4>Você</h4>
                <p>${mensagem.mensagem}</p>
                <p class="datetime">${mensagem.horaMsg || ""}</p>
          </div>`
        )
    }
    else{
        $('.message-area').append(
            `<div class="chat-msg">
                <h4>${mensagem.autor}</h4>
                <p>${mensagem.mensagem}</p>
                <p class="datetime"> ${mensagem.horaMsg || ""}</p>
          </div>`
        )
    }
}

