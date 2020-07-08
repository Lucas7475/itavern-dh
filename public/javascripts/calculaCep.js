const inpCepCriar = document.getElementById('cep-create');

var popupEscolhido;
var listaEnderecos = [];
var endSemId = [];

function limpaFormulario() {
    document.getElementById('endereco').value=("");
    document.getElementById('cidade').value=("");
}
function limpaFormEdit() {
    document.querySelector(`${popupEscolhido}`).querySelector('endereco').value=("");
    document.querySelector(`${popupEscolhido}`).querySelector('cidade').value=("");
}
function limpaInfo(){
    document.querySelector('#exampleModalCenter').querySelector('#enderecoInfo').innerText = "Não definido";
}
function limpaPerfil(){
    document.getElementById("cidadeUser").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("ruaCasa").value = "";
}
// mostra o cep no popup de criar
function callback(conteudo) {
if (!("erro" in conteudo)) {
    document.getElementById('endereco').value=(conteudo.logradouro);
    document.getElementById('cidade').value=(conteudo.localidade);
} 
else {
    limpaFormulario();
}
}
// mostra o cep no popup de editar
function mostraCep(conteudo) {
    if (!("erro" in conteudo)) {
        document.querySelector(`${popupEscolhido}`).querySelector('#endereco').value=(conteudo.logradouro);
        document.querySelector(`${popupEscolhido}`).querySelector('#cidade').value=(conteudo.localidade);
    } 
    else {
        limpaFormEdit();
    }
}
// mostra o cep no popup info
function mostraCepInfo(conteudo){
    if (!("erro" in conteudo)) {
        document.querySelector('#enderecoInfo').innerText = (conteudo.logradouro);
    } 
    else {
        limpaInfo();
    }
}
// mostra o cep no perfil
function mostraCepPerfil(conteudo){
    if (!("erro" in conteudo)) {
        document.getElementById("cidadeUser").value = (conteudo.localidade);
        document.getElementById("bairro").value = (conteudo.bairro);
        document.getElementById("ruaCasa").value = (conteudo.logradouro);
    } 
    else {
        limpaPerfil();
    }
}
// função que busca o cep pro popup criar
function pesquisaCep(valor) {
let cep = valor.replace(/\D/g, '');

if (cep != "") {
    var validacep = /^[0-9]{8}$/;

    if(validacep.test(cep)) {
        let script = document.createElement('script');
        script.src = `https://viacep.com.br/ws/${cep}/json/?callback=callback`
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
//função que busca o cep pro popup editar
function pesquisaCepEdit(valor) {
    let cep = valor.replace(/\D/g, '');
    
    if (cep != "") {
        var validacep = /^[0-9]{8}$/;
    
        if(validacep.test(cep)) {
            let script = document.createElement('script');
            script.src = `https://viacep.com.br/ws/${cep}/json/?callback=mostraCep`
            document.body.appendChild(script); 
        } 
        else {
            limpaFormEdit();
        }
    }
    else {
        limpaFormEdit();
    }
};
// função que pega qual o popup a ser alterado
function setPopup(tag, cep) {
    popupEscolhido = tag;
    pesquisaCepEdit(cep);
}

function pesquisaCepInfo(valor){
    let cep = valor.replace(/\D/g, '');
    
    if (cep != "") {
        var validacep = /^[0-9]{8}$/;
    
        if(validacep.test(cep)) {
            let script = document.createElement('script');
            script.src = `https://viacep.com.br/ws/${cep}/json/?callback=mostraCepInfo`
            document.body.appendChild(script); 
        } 
        else {
            limpaInfo();
        }
    }
    else {
        limpaInfo();
    }
}

function pesquisaCepPerfil(valor){
    let cep = valor.replace(/\D/g, '');
    
    if (cep != "") {
        var validacep = /^[0-9]{8}$/;
    
        if(validacep.test(cep)) {
            let script = document.createElement('script');
            script.src = `https://viacep.com.br/ws/${cep}/json/?callback=mostraCepPerfil`
            document.body.appendChild(script); 
        } 
        else {
            limpaPerfil();
        }
    }
    else {
        limpaPerfil();
    }
}

function transformaCep (lista){
    listaEnderecos = [];
    endSemId = [];
    lista.forEach((obj) =>{
        fetch(`https://viacep.com.br/ws/${obj.cep}/json/`
        ).then(resp =>{
            return resp.json();
        }).then(data =>{
            listaEnderecos.push({end:`${data.logradouro} ${obj.numero}`, id:obj.id});
            endSemId.push(`${data.logradouro} ${obj.numero}`);
        })
    })
    return {listaEnderecos, endSemId};
}

// adicionando evento que pega o valor do cep do grupo a ser criado
inpCepCriar.addEventListener('blur', evento =>{
    pesquisaCep(inpCepCriar.value);
})

