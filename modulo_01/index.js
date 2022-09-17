/*
    0 Obter um usuario
    1 Obter o numero de telefone de um usuario a partor de seu Id
    2 Obter o enderenço do usuario pelo Id
*/

//importamos um módulo interno do node .js
const util = require("util");
const obterEnderecoAsync = util.promisify(obterEndereco);
function obterUsuario() {
  //quando der algum problema -> reject(ERRO)
  //quando sucess -> RESOLV
  return new Promise(function resolvePromisse(resolve, reject) {
    setTimeout(function () {
      //   return reject(new Error("DEU RUIM DE VERDADE!"));
      return resolve({
        id: 1,
        nome: "Nana",
        dataNascimento: new Date(),
      });
    }, 1000);
  });
}

function obterTelefone(idUsuario) {
  return new Promise(function resolverPromisse(resolve, reject) {
    setTimeout(() => {
      return resolve({
        telefone: "981936996",
        ddd: 19,
      });
    }, 2000);
  });
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: "rua teste",
      numero: 0,
    });
  }, 2000);
}

const usuarioPromisse = obterUsuario();
//Para manipular o sucesso usamos a função .then
//Para manipular o erros usamos a .catch

//usuario -> telefone -> telefone
usuarioPromisse
  .then(function (usuario) {
    return obterTelefone(usuario.id).then(function resolverTelefone(result) {
      return {
        usuario: {
          nome: usuario.nome,
          id: usuario.id,
        },
        telefone: result,
      };
    });
  })
  .then(function (resultado) {
    const endereco = obterEnderecoAsync(resultado.usuario.id);
    return endereco.then(function resolverEndereco(result) {
      return {
        usuario: resultado.usuario,
        telefone: resultado.telefone,
        endereco: result,
      };
    });
  })
  .then(function (resultado) {
    console.log(`
    Nome: ${resultado.usuario.nome}
    Endereço: ${resultado.endereco.rua}, ${resultado.endereco.numero}
    Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
    `);
  })
  .catch(function (error) {
    console.error("DEU RUIM", error);
  });
