// Puxando os elementos do HTML
var nome = document.getElementById('nome');
var email = document.getElementById('email');
var alert = document.getElementById('alert');

// Puxando a biblioteca MySQL2
var mySQL2 = require('mysql2');


// Função para cadastrar o usuário
function cadastrarUsuario(event) {

  // Previnindo o comportamento padrão do formulário
  event.preventDefault();

  // Verificando se os campos estão vazios
  if (nome.value == '' || email.value == '') {
    alert.innerText = 'Preencha todos os campos';
    return;
  }

  // Conectando ao MySQL
  var conexao = mySQL2.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'cadastro'
  });

  // Verificando se conectou
  conexao.connect(function (error) {
    if (error) {
      console.log(error.code);
      console.log(error.fatal);
    } else {
      console.log('Conectado ao MySQL');
    }
  });
  
  // Cadastrando o usuário
  var query = `INSERT INTO cadastrados (nome, email) VALUES ("${nome.value}", "${email.value}")`;

  // Verificando se o usuário foi inserido
  conexao.query(query, function (error) {
    if (error) {
      console.log('O usuário não foi inserido', error);
    } else {
      console.log('O usuário foi inserido');
    }
  })


  // Limpando os campos
  nome.value = '';
  email.value = '';

}

// Função para não deixar o campo vazio
function campoVazio() {
  // Limpando o alerta
  alert.innerText = '';
}

// Adicionando o evento de keyup aos campos
nome.addEventListener('keyup', campoVazio);
email.addEventListener('keyup', campoVazio);

// Adicionando o evento de submit ao formulário
var formulario = document.getElementById('formulario');
formulario.addEventListener('submit', cadastrarUsuario);