import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import authConfig from '../../config/auth';
import User from '../models/User';
import alert from 'alert'



class SessionController { 
   
  async store(req, res) {
    
     /*valida dados recebidos*/
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validacao Falhou' });
    }

    const { email, password } = req.body;
     /*verifica se ha admin com o email digitado pelo usuario*/
     console.log(email, password)
    const user = await User.findOne({
      email: email
      //
    });
   
     /*retorna erro se nao achar email cadastrado*/
    if (!user) {
      alert('admin nao encontrado')
      return res.status(401).json({ error: 'admin nao encontrado' });
    }
  
    
    if (!(await user.comparePassword(password))) {
      alert('Senha nao encontrada')
      return res.status(401).json({ error: 'Password nao encontrado' });
    }
   
    const { id, name} = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
       /*admin fazendo login define token que permite acesso as rotas privadas do frontend*/
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();