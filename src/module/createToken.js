const conection = require('../database/conection');
const emails = require('../communication/email');
const crypto = require('crypto');


module.exports = {

    async  NewToken(email){
        
        const token = crypto.randomBytes(20).toString('hex');  
        var date = new Date();
        date.setHours(date.getHours()+12);
        const  date_token = date.getTime();
           
         try{
              await  conection('user').
          
            where('email','=',email).
      
            update({
                
                token:token,
                date_token:date_token,
                
             
              
              }
      
              );
              
              
         }catch(ex){
            console.error("outer", ex.message)
            return false;
         };
         emails.sendMail({
           
          from: '"GameBet 👻" <joseferreiravieira123@gmail.com>', // sender address
          to: email, // list of receivers
          subject: 'token de validação: ', // Subject line 
          text: 'use o código: '+token, // plain text body
        //  html: html // html body
        
        });
         return true;   
        
    },
};