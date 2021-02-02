/*
    Dados do server
   * Nome : CotaboxTesteServer
   * Objetivo: Fornecer e receber dados para o frontend
   * Desenvolvedor: Hernani Almeida
   * data criacao: 22/12/2020 - 27/12/2020
   
*/

/*exporta variaveis de test e desenvolvimento para acesso ao database*/
require('../bootstrap');
console.log(process.env.NODE_ENV)
module.exports = {
  URL: process.env.MONGO_URL
    
};
