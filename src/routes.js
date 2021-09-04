const express = require('express');
const routes = express.Router();
const sessions = require('./controller/sessions')
const userController = require('./controller/UserController')
const login = require('../src/middleware/login');

const { celebrate, Joi, errors, Segments } = require('celebrate');


routes.get('/',(request,response)=>{
    return response.json('API feita com s2')
})
routes.post('/users/login',celebrate({
    [Segments.BODY]: Joi.object().keys({
        password: Joi.string().required().min(8).max(16),
        email: Joi.string().required().email(),
      
    })
}),sessions.login);

routes.post('/users/',celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().min(4).max(60),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8).max(16)
     
      
    })
}),userController.create);

routes.post('/users/:id',celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().min(4).max(60),
        password: Joi.string().required().min(8).max(16)
     
      
    })
}),userController.change);




routes.get('/users',userController.index);

routes.get('/users/:id',userController.findOne);
//routes.delete('/users/',login,userController.delete);

routes.get('/users/active/:token',celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        token: Joi.string().required(),
      
    })
}),sessions.activateAccount);
routes.post('/listar',userController.listar)
routes.delete('/deletar/:email',userController.delete)
module.exports = routes;