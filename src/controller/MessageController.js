
const Mail =  require('../lib/Mail')

module.exports ={
    async sorteio(name,email,token){
      console.log('mail t ',email)
        
       const a = await Mail.sendMail({
            from: 'Sis Autho <pw2@ifpb.edu.br>',
            to: `${name} <${email}>`,
            subject: 'Confirmação do cadastro',
            html: `<p>Para confirmar seu cadastro clik
            <a href="http://localhost:3333/users/active/${token}">aqui</a></p>`
          });
          
        return

    }
}