const inputs =  document.querySelector("#exampleModalEdit").querySelector(".opcoes").querySelectorAll('input');



const colocaCheck = () =>{
    let p = document.querySelector('#invi');
    let lista = p.innerText.split(',');
    for(let y = 0; y < lista.length; y++){
        for(let x = 0; x < inputs.length; x++){
            if(inputs[x].id == lista[y]){
                inputs[x].setAttribute('checked','checked');
            }
        }
    }
}
const revelaGrupo = () =>{
    let pGrupo = document.querySelectorAll('article').innerText;
    let pSala = document.querySelector('#invi3');
    console.log(pGrupo, pSala)
    pSala.innerText = `<% let grupo = meusGrupos[${pGrupo}] %>`;
}

//verifica se o usuario carregou algum grupo para editar
let lista = document.querySelector('#invi4').innerText;
if(lista != 0){
    document.querySelector('#semGrupo').classList.add('invi');
}