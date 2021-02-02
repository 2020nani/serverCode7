import request from 'supertest';
import app from '../../src/app'

const MOCK_CADASTRO_ADMIN = {
  name: 'jose',
  email: 'dados@hotmail.com',
  password: '123456'
}

const MOCK_LOGIN = {
  email: "dados@hotmail.com",
  password: "123456"
}
const MOCK_CADASTRO_DIVIDA = {
  usuarioId: '1',
  motivoDivida: 'cartao',
  valorDivida: 55,
  dataDivida: "11/10/1984"
}
const MOCK_CADASTRO_FAIL = {
    usuarioId: '',
    motivoDivida: 'cartao',
    valorDivida: 55,
    dataDivida: "1110/1984"
}
const MOCK_UPDATE_DIVIDAS = {
    usuarioId: '1',
    motivoDivida: 'cartao',
    valorDivida: 500,
    dataDivida: "11/10/1984"
  
}
const MOCK_UPDATE_FAIL = {
    usuarioId: '',
    motivoDivida: '',
    valorDivida: 0,
    dataDivida: ""
}
let token = ""
let idAdmin = ''
let MOCK_ID = ''

describe.only('Dados', () => {
  it('deve ser cadastrado admin', async () => {
    const response = await request(app)
      .post('/admins')
      .send(MOCK_CADASTRO_ADMIN);
    // pega id do usuario cadastrado e seta variavel id 
    idAdmin = response.body.id;
    expect(response.statusCode).toEqual(200)
  });

  it('deve logar se email existir', async () => {
    const response = await request(app)
      .post('/login')
      .send(MOCK_LOGIN);
    token = response.body.token
    expect(response.statusCode).toEqual(200)
  });
  it('deve ser cadastrado dividaPessoa', async () => {

    const response = await request(app)
      .post('/dividas')
      .set("Authorization", `Bearer ${token}`)
      .send(MOCK_CADASTRO_DIVIDA);
    //se cadastrou espera que retorne statuscode 200
    expect(response.statusCode).toEqual(200)
  });
  it('nao deve ser cadastrado dadosPessoa(erro schema)', async () => {

    const response = await request(app)
      .post('/dividas')
      .set("Authorization", `Bearer ${token}`)
      .send(MOCK_CADASTRO_FAIL);

    expect(response.body).toEqual({"error": "Validacao Falhou"})
  });

  it('deve listar itens', async () => {
    const response = await request(app)
      .get('/dividas')
      .set("Authorization", `Bearer ${token}`)
      MOCK_ID = response.body[0]._id
     
    expect(response.statusCode).toEqual(200)
  });
  
  
  it('deve atualizar item cadastrado', async () => {
    const response = await request(app)
      .put(`/dividas/${MOCK_ID}`)
      .set("Authorization", `Bearer ${token}`)
      .send(MOCK_UPDATE_DIVIDAS);
    
    expect(response.body).toEqual(MOCK_UPDATE_DIVIDAS)
  });

  it('nao deve atualizar item cadastrado(erro schema)', async () => {
    const response = await request(app)
      .put(`/dividas/${MOCK_ID}`)
      .set("Authorization", `Bearer ${token}`)
      .send(MOCK_UPDATE_FAIL);
    
      expect(response.body).toEqual({"error": "Validacao Falhou"})
  });


  it('deve deletar item cadastrado', async () => {
    const response = await request(app)
      .delete(`/dividas/${MOCK_ID}`)
      .set("Authorization", `Bearer ${token}`)

    //se deletou retorna objeto vazio
    expect(response.status).toBe(200)
  });

  it('deve deletar administrador', async () => {
    const response = await request(app)
      .delete(`/admins/${idAdmin}`)
      .set("Authorization", `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
  });

}); 