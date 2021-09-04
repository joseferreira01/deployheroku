const conection = require('../database/conection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


module.exports = {

    async login(request, response) {
        const { email, password } = request.body;

        try {
            const user = await conection('user')
                .where({
                    email: email,
                }).select('id', 'password','status','email','name');

            if (user.length === 0) {
                throw new Error('Incorrect login')
            }
            
           
            if(user[0].status !=='active'){
                return response.status(403).json('Para fazer login você precisar habilitar sua conta por favor verifique seu e-mail!');
                
            }
            const isSamePassword = await bcrypt.compare(password, user[0].password)

            if (isSamePassword) {
                const token = jwt.sign({
                    id: user[0].id,
                    
                }, process.env.KEY_TOKEN, {
                    expiresIn: '1h'
                })
                user[0].password = undefined
                user[0].token = token
                return response.json(user[0]);
            }
            throw new Error('Incorrect password')
        } catch (err) {
            if (err.message === 'Incorrect login' || err.message === 'Incorrect password') {
                return response.status(400).json(err.message);
            }
            return response.status(400).json('Error in the data expected for request!');
        }

    },
    async activateAccount(request, response) {
        console.log('metodo de ativar conta')

        try {
            const {token} = request.params;
    
          var data_token = new Date();
    
    
          console.log('ativando conta');
          const result = await conection('user').
    
            where('date_token', '>', data_token.getTime()).andWhere('token', '=', token).
    
            update({
              status: 'active',
            }
    
            );
          //  return  response.status(200).json({success:'success'});
          if (result === 1) {
            return response.status(201).json('Conta ativa');
          } else {
            return response.status(400).json({ error: 'Esse token não pertence a ninguém' });
          }
        }
        catch (e) {
          console.log('erro ', e);
    
          return response.status(201).json({ error: e });
        }

      }
    
};