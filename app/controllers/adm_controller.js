const request = require('request');
var Adm = require('../models/adm');
const TOKEN = "123456789";

const AdmController = {
  index: function(req, res, next) {
    if (req.headers.token == TOKEN) {
      Adm.find().then(dado => res.send(dado));
    } else {
      res.status(401).send({error: "Acesso negado a API."});
    };   
  },

  create: (req, res, next)=> {
    if (req.headers.token == TOKEN) {
      const adm = new Adm({nome: req.body.nome ,senha:req.body.senha, email: req.body.email});
      adm.save(error =>{
        if (error) {
          res.status(401).send(error);
          return;
        }

        res.status(201).send({});
      }); 
    } else {
      res.status(401).send({error: "Acesso negado a API."});
    }; 
  },

  change: async(req, res, next)=> {
    if (req.headers.token == TOKEN) {
      try {
        await Adm.findOneAndUpdate({_id: req.params.adm_id}, {nome: req.body.nome, senha: req.body.senha, email: req.body.email});
        res.status(204).send(`Alterado com o id ${req.params.adm_id}`);
      } catch (error) {
        res.status(401).send(`Erro ${error}`);
      };
    } else {
      res.status(401).send({error: "Acesso negado a API."});
    }; 
  },

  delete:async(req, res, next) =>{
    if (req.headers.token == TOKEN) {
      try {
        await Adm.findByIdAndDelete(req.params.adm_id);
        res.status(204).send({});
      } catch (error) {
        res.status(401).send({});
      };
    } else {
      res.status(401).send({error: "Acesso negado a API."});
    } 
  },
}

module.exports = AdmController;