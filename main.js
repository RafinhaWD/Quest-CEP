var cepsBuscados = []
var consultados = localStorage.getItem('CEP-CONSULTADO')
if(consultados === null) {
    localStorage.setItem('CEP-CONSULTADO', JSON.stringify(cepsBuscados))
} else {
    cepsBuscados = JSON.parse(consultados)
}

function buscarCep() {
    var cepUtilizado = document.getElementById('cep').value
    fetch('https://viacep.com.br/ws/' + cepUtilizado + '/json/')
        .then((resposta) => {
            return resposta.json()
        })
        .then((cep) => {
            var enderecoCompleto = cep.logradouro + ', ' + cep.bairro + ', ' + cep.localidade + ' - ' + cep.uf
            document.getElementById('endereco').innerText = enderecoCompleto
            cepsBuscados.push(cep)
            localStorage.setItem('CEP-CONSULTADO', JSON.stringify(cepsBuscados))
            cepUtilizado = ''
            mostrarEnderecos()
        })     
}

function mostrarEnderecos() {
    var cepsArmazenados = JSON.parse(localStorage.getItem('CEP-CONSULTADO'))
    var listaHTML = ''
    cepsArmazenados.forEach((item) => {
        var enderecoCompleto = item.logradouro + ', ' + item.bairro + ', ' + item.localidade + ' - ' + item.uf
        listaHTML  += '<li>' + enderecoCompleto + '</li>'
    })
    document.getElementById('lista').innerHTML = listaHTML
}