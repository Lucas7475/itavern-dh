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
// document.querySelectorAll('.btn-grupo').forEach(botao =>{
//     botao.addEventListener("click", (event)=>{
//         let p = event.composedPath();
//         document.querySelector('#muda').innerHTML = `<p id=${p[2].id}><% grupo = meusGrupos[${ p[2].id}] %>`;
//     })
// })

//verifica se o usuario carregou algum grupo para editar
let lista = document.querySelector('#invi4').innerText;
if(lista != 0){
    document.querySelector('#semGrupo').classList.add('invi');
}
