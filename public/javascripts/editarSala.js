

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
document.querySelectorAll('.btn-grupo').forEach(botao =>{
    botao.addEventListener("click", (event)=>{
        event.preventDefault();
        let p = event.composedPath()[0].dataset.target;
        colocaCheck(p);
    })
})

//verifica se o usuario carregou algum grupo para editar
let lista = document.querySelector('#invi4').innerText;
if(lista != 0){
    document.querySelector('#semGrupo').classList.add('invi');
}
