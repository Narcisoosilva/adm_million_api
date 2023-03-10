const Adm = require('../../app/models/adm');

beforeEach(function () {
 Adm.deleteMany({email: /@/}).then(error =>{}); 
});

describe('Modelo Adm', () =>{
  it('Deve retornar o modelo de Adm', () =>{
    Adm.find().then(dado => {
      expect(dado != undefined).toBe(true);
    });    
  });

  it('Deve incluir um administrador', () =>{
    let nome =`teste ${new Date().getTime()}`;
    const adm = new Adm({nome: nome, senha:'123456', email: nome + '@torneseumprogramador.com.br'});
    adm.save(error =>{
      expect(error == undefined || error == null).toBe(true);
    });
  });

  it('Não deve incluir um administrador repetido', () =>{
    let nome =`teste ${new Date().getTime()}`;
    const adm = new Adm({nome: nome, senha:'123456', email: nome + '@torneseumprogramador.com.br'});
    adm.save(error =>{
      const adm2 = new Adm({nome: nome, senha:'123456', email: nome + '@torneseumprogramador.com.br'});
      adm2.save(error =>{
        expect(error == undefined || error == null).toBe(false);
      });
    });
  });

  it('Não deve incluir um administrador sem nome', () =>{
    let nome =`teste ${new Date().getTime()}`;
    const adm = new Adm({nome: null, senha:'123456', email: nome + '@torneseumprogramador.com.br'});
    adm.save(error =>{
      expect(error == undefined || error == null).toBe(false);
    });
  });

  it('Não deve alterar um registro', () =>{
    let nome =`teste ${new Date().getTime()}`;
    const adm = new Adm({nome: nome, senha:'123456', email: nome + '@torneseumprogramador.com.br'});
    
    adm.save(error =>{
      adm.nome = "Danilo";
      
      adm.save(error =>{
        let novoNome = "Danilo" + new Date().getTime()
        adm.nome = novoNome;
        expect(error == undefined || error == null).toBe(true);
        
        Adm.find({nome: novoNome}).then(dado =>{
          expect(dado.length > 0).toBe(true);
        });
        
      });

    });

  });
  
});