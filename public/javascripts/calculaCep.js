function limpaFormulario() {
    document.getElementById('endereco').value=("");
    document.getElementById('cidade').value=("");
}

function callback(conteudo) {
if (!("erro" in conteudo)) {
    document.getElementById('endereco').value=(conteudo.logradouro);
    document.getElementById('cidade').value=(conteudo.localidade);
} 
else {
    limpaFormulario();
}
}

function pesquisaCep(valor) {

let cep = valor.replace(/\D/g, '');

if (cep != "") {
    var validacep = /^[0-9]{8}$/;

    if(validacep.test(cep)) {
        let script = document.createElement('script');
        script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=callback';
        document.body.appendChild(script); 
    } 
    else {
        limpaFormulario();
    }
}
else {
    limpaFormulario();
}
};