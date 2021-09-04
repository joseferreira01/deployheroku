const conection = require('../database/conection');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const emailMsg = require('../controller/MessageController')


module.exports = {
  
     
    async index(request, response, next){ 
    //  return  response.json({nome:'jose'});
        const {page = 1} = request.query;
        const [count] = await conection('user').count();
        
       const user = await conection('user').limit(10).
       offset((page -1)*10).
       select('*');
       response.header('X-Total-Count',count['count(*)']);
        response.json({user})
    },
    async listar(request, response, next){
     const {email} = request.body 
      
      const user = await conection('user').select('name','email').whereNot('email', email)
      response.status(200).json({user:user})
    },
    async findOne(request, response,next){
        const {id} =  request.params;
        const user = await conection('user').
        where('id',id).select('id','name');
         response.json({user})
     },

    async create(request, response, next){
     
        const { name,email} = request.body;
        const token = crypto.randomBytes(20).toString('hex');
        const status = "disabled"

        var date = new Date();
        date.setHours(date.getHours() + 24);
        const date_token = date.getTime();
      
        const password = bcrypt.hashSync(request.body.password, 10)
        console.log("erro savar usuario",name);
      

      const result = await conection('user').insert({
          name,
          password,
          token,
          email,
          status,
          date_token
        }).then(message =>{
          emailMsg.sorteio(name,email,token)
          return  response.status(200).json({success:message});
        }).catch(err =>{
          console.log("erro savar usuario",err.message);
          return  response.status(201).json({error:err});
        });
   
     
    },
    async change(request, response, next){
      const {id} =  request.params;
      console.log(id)
       
      const {name, password} = request.body
      console.log(name + " "+ password)
  
        const result = await conection('user').where('id',id).update({
          name,
          password
      }).returning('*')

      const user = await conection('user').where('id',id).select('*')
      
      if(result==1){
        return  response.status(200).json(user[0]);
      }else{
        return  response.status(400).json({err:'err'});
      }
    },
  async delete(request, response, next){
    const {email} = request.params
    console.log(request.params)
    await conection('user').del().where('email',email)
          .then(() => {

            return  response.status(200).json({success:'success'});

          }).catch(err =>{
            return  response.status(404).json({err:err});
          });
     
        
  },
    
    
};