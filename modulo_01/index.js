/*
    0 Obter um usuario
    1 Obter o numero de telefone de um usuario a partor de seu Id
    2 Obter o enderenço do usuario pelo Id
*/

function obterUsuario(callback) {
  setTimeout(function () {
    return callback(null, {
      id: 1,
      nome: "Nana",
      dataNascimento: new Date(),
    });
  }, 1000);
}

function obterTelefone(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      telefone: "981936996",
      ddd: 19,
    });
  }, 2000);
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: "rua teste",
      numero: 0,
    });
  }, 2000);
}

function resolverUsuario(erro, usuario) {
  console.log("usuario", usuario);
}

obterUsuario(function resolverUsuario(error, usuario) {
  //null || "" || 0 == false
  if (error) {
    console.error("Erro com USUARIO", error);
    return;
  } else {
    obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
      if (error1) {
        console.error("Erro com TELEFONE", error1);
        return;
      } else {
        obterEndereco(usuario.id, function resolverEndereco(error2, enderenco) {
          if (error2) {
            console.error("Erro com ENDEREÇO", error2);
            return;
          }
          console.log(`
                Nome: ${usuario.nome},
                Endereço: ${enderenco.rua}, ${enderenco.numero},
                Telefone: (${telefone.ddd}) ${telefone.telefone},
                `);
        });
      }
    });
  }
});
