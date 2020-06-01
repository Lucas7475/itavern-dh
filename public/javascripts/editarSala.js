const inputs =  document.querySelector("#exampleModalEdit").querySelector(".opcoes").querySelectorAll('input');



const colocaCheck = () =>{
    let p = document.querySelector('.invi');
    let lista = p.innerText.split(',');
    for(let y = 0; y < lista.length; y++){
        for(let x = 0; x < inputs.length; x++){
            if(inputs[x].id == lista[y]){
                inputs[x].setAttribute('checked','checked');
            }
        }
    }
}
