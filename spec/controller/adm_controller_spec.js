const axios = require('axios').default;
const request = require("request-promise");
const Adm = require("../../app/models/adm");
const host = "http://localhost:3000";

describe("AmdController", () =>{
  beforeEach(async() =>{
    Adm.deleteMany({email: /torneseumprogramador/}).then(error =>{}); 
    await Adm.create([{nome: "Danilo1", senha:'123456', email: 'danilo1@torneseumprogramador.com.br'}, 
                      {nome: "Danilo2", senha:'123456', email: 'danilo2@torneseumprogramador.com.br'}]);    
  });


  describe("GET /adm.jon - deve retornar uma lista de administradores", () =>{
    it("deve retornar o status code de 200", async(done) => {
      const response = await axios.get(`${host}/adm.json`);
      expect(response.status).toBe(200);
      done();
    });
    
    it("deve retornar dados da API", async(done) => {
      const response = await axios.get(`${host}/adm.json`);
      const itens = response.data;
      expect(itens[0].nome).toBe("Danilo1");
      expect(itens[1].nome).toBe("Danilo2");
      done();
    });
  });

  describe("POST /adm.jon - administrador", () =>{
    it("deve cadastrar um administrador", async(done) => {
      let nome = `teste ${new Date().getTime()}`;
      const body = { 
        nome,
        senha: '123456',
        email: nome + '@torneseumprogramador.com.br' 
      }
      const rsponse = await axios.post(`${host}/adm.json`);
    });

    it("deve retornar dados da API", async(done) => {
      const response = axios.get(`${host}/adm.json`).then(response =>{
        itens = JSON.parse(response.body);
        expect(itens[0].nome).toBe("Danilo1");
        expect(itens[1].nome).toBe("Danilo2");
      })
      .catch(function (err){
        throw err.message
      });          
        done();
    });
  });
/*
  describe("PUT /adm.jon - administrador", () =>{
    it("deve alterar um administrador", (done) => {
      let nome =`teste ${new Date().getTime()}`;
      new Adm({nome: nome, senha:'123456', email: nome + '@torneseumprogramador.com.br'});

      let options = {
        method: 'PUT',
        uri:`${host}/adm${adm._id}.json`,
        body:{
          nome: nome, 
          senha:'123456', 
          email: nome + '@torneseumprogramador.com.br'
        },
        JSON: true
      };
      request(options).then(response =>{
        expect(response.statusCode).toBe(200);
      })
      .catch(function (err){
        throw err.message
      });          
        done();
    });
  });*/
});