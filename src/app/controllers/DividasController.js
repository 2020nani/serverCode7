
import * as Yup from 'yup';
import Dividas from '../models/Dividas';
import alert from 'alert'
class DividasController {

  async store(req, res) {
    /*valida os dados recebidos */
    const schema = Yup.object().shape({
      usuarioId: Yup.string().required(),
      motivoDivida: Yup.string().required(),
      dataDivida: Yup.string().required(),
      valorDivida: Yup.number().required().min(1),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validacao Falhou' });
    }
   
    const { id, motivoDivida, dataDivida, usuarioId, valorDivida } = req.body
    const dividas = await Dividas.find(
      { usuarioId: usuarioId }
    )
    if (dividas.length > 0) {
      dividas[0].valorDivida.push(valorDivida)
      await Dividas.create(dividas)

      return res.json(
        dividas
      );
    } else {
      await Dividas.create(req.body)
      return res.json(
        req.body
      );
    }


  }
  async listarDividas(req, res) {

    const dividas = await Dividas.find()

    return res.json(dividas)
  }
  async listarDividasPessoa(req, res) {
    const dividas = await Dividas.find(
      { usuarioId: req.params.usuarioId }
    )
    return res.json(dividas)
  }


  async update(req, res) {
    /*valida dados recebidos */
    const schema = Yup.object().shape({
      usuarioId: Yup.string().required(),
      motivoDivida: Yup.string().required(),
      dataDivida: Yup.string().required(),
      valorDivida: Yup.number().required().min(1),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validacao Falhou' });
    }


    const dividaPessoa = await Dividas.findById(req.params.id)

    const {
      usuarioId,
      motivoDivida,
      dataDivida,
      valorDivida
    } = req.body;

    await dividaPessoa.update(req.body);
    return res.json({

      usuarioId,
      motivoDivida,
      dataDivida,
      valorDivida
    })

  }

  async delete(req, res) {
    const dados = await Dividas.findById(req.params.id)
    await dados.delete(req.body);
    res.json({})
  }
}

export default new DividasController();
