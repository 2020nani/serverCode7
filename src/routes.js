/*
    Dados do server
   * Nome : CotaboxTesteServer
   * Objetivo: Fornecer e receber dados para o frontend
   * Desenvolvedor: Hernani Almeida
   * data criacao: 22/12/2020 - 27/12/2020
   
*/

import { Router } from 'express';
import AdminController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import DadosController from './app/controllers/DividasController';


const routes = new Router();
routes.post('/login', SessionController.store);
routes.post('/admins', AdminController.store);
routes.use(authMiddleware);
/*rotas so serao acessadas com o jwttoken*/
routes.put('/admins/:id', AdminController.update);
routes.delete('/admins/:id', AdminController.delete);
routes.post('/dividas', DadosController.store);
routes.put('/dividas/:id', DadosController.update);
routes.delete('/dividas/:id', DadosController.delete);
routes.get('/dividas', DadosController.listarDividas);
routes.get('/dividas/:usuarioId', DadosController.listarDividasPessoa);


module.exports = routes;