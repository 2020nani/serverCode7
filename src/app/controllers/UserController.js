import * as Yup from 'yup';
import User from '../models/User';
import alert from 'alert'


class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validacao Falhou' });
    }

    const userExists = await User.findOne({ email: req.body.email  });
    
    if (userExists !== null) {
      alert(`Email ja esta cadastrado`)
      return res.status(400).json({ error: 'Este email ja esta cadastrado' });
    }
    const { id, name, email } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validacao falhou' });
    }

    const { email, oldPassword, name } = req.body;
   
    const user = await User.findById(req.params.id)
 
   if (email !== user.email) {
      const userExists = await User.findOne({  email : email  });
      
      if (userExists) {
        return res.status(400).json({ error: 'Usuario ja existe.' });
      }
    }

    if (oldPassword && !(await user.comparePassword(oldPassword))) {
      return res.status(401).json({ error: 'Senha difere da atual' });
    }
    
    
     await user.update(req.body);

   return res.json({ name, email});
  }

  
  async delete(req, res) {
    const user = await User.findById(req.params.id)
     await user.delete(req.body);
    res.json({})
  }
}

export default new UserController();