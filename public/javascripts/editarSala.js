var idGrupo;
var dataInicial;
var dataAlterada;

$("#inicio").mask("99/99/9999"); 

//função para marcar os dias de reunião
const colocaCheck = (tag) =>{
    let p = document.querySelector(`${tag}`).querySelector("p").innerText;
    let inputs =  document.querySelector(`${tag}`).querySelector(".opcoes").querySelectorAll('input');
    let lista = p.split(',');
    for(let y = 0; y < lista.length; y++){
        for(let x = 0; x < inputs.length; x++){
            if(inputs[x].id == lista[y]){
                inputs[x].setAttribute('checked','checked');
            }
        }
    }
}
//função que deleta um grupo
const deletaGrupo = (id) =>{
    return fetch(`/grupos/${id}/delete?_method=DELETE`,{
        method:"POST",
        headers:{
            "Content-Type":'application/json'
        },
        body: JSON.stringify({id})
    })
}
//função que remove o article do grupo excluído
const removeArticle = (id)=>{
    document.getElementById(`${id}`).remove();
    return true;
}
//adicionando um evento que captura o id do grupo selecionado
document.querySelectorAll('.deletar').forEach(botao=>{
    botao.addEventListener('click', async (evento) =>{
        evento.preventDefault();
        idGrupo = evento.composedPath()[2].id;
    })
})
// adicionando evento que confirma a exclusão de um grupo
document.getElementById("confirma").addEventListener('click', async (evento)=>{
    evento.preventDefault();
    await deletaGrupo(idGrupo).then(response =>{
        if(response.status == 200){
            removeArticle(idGrupo);
            return idGrupo = null;
        }
    })
})
// adicionando evento que abre o popup do grupo a ser editado
document.querySelectorAll('.edit').forEach(botao =>{
    botao.addEventListener("click", (event)=>{
        event.preventDefault();
        let p = event.composedPath()[0].dataset.target;
        colocaCheck(p);
    })
})
document.querySelectorAll('.inicio-edit').forEach(inpInicio =>{
    inpInicio.addEventListener('focus', evento =>{
        dataInicial = inpInicio.value;
        inpInicio.value = "";
        $(inpInicio).mask("99/99/9999");
    })
})
document.querySelectorAll('.inicio-edit').forEach(inpInicio =>{
    inpInicio.addEventListener('blur', evento =>{
        dataAlterada = inpInicio.value;
        if(dataAlterada != ""){
            inpInicio.value = dataAlterada;
        }else{
            inpInicio.value = dataInicial;
        }
    })
})

//verifica se o usuario carregou algum grupo para editar
let lista = document.querySelector('#invi4').innerText;
if(lista == 0){
    document.querySelector('#semGrupo').classList.remove('invi');
}
