const request = require('request');
var Adm = require('../models/adm');
const AdmController = {
  index: function(req, res, next) {
    Adm.find().then(dado => res.send(dado));
  /*
    const adm = new Adm({nome: 'Suporte',senha:'123456', email: 'suporte@torneseumprogramador.com.br'});
    adm.save(error =>{
      if (error) {
        res.send(error);
        return;
      }

      Adm.find().then(dado =>{
        res.send(dado);
      });
    }); 
  */
  },

  create: (req, res, next)=> {
    const adm = new Adm({nome: req.body.nome ,senha:req.body.senha, email: req.body.email});
    adm.save(error =>{
      if (error) {
        res.send(error, 401);
        return;
      }

      res.send({}, 201);
    }); 
  },

  change: (req, res, next)=> {
    Adm.find({_id: req.params.adm_id}).then(dado => {
      if (dado.length > 0) {
        adm = dado[0];
        adm.nome = req.body.nome
        adm.senha = req.body.senha
        adm.email = req.req.email
        adm.save(error =>{
          if (error) {
            res.send(error, 401);
            return;
          }
    
          res.send(adm, 200);
        }); 
      }
    });
  }
}

module.exports = AdmController;