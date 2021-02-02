const Mongoose = require('../../database')


const DividaSchema = new Mongoose.Schema({

/*o Id do usuário no JSONPlaceholder
o Motivo da dívida
o Data da dívida
o Valor*/
  usuarioId: {
    type: String,
    required: true
  },
  motivoDivida: {
    type: String,
    required: true
  },
  dataDivida: {
    type: String,
    required: true
  },
  valorDivida: [{
    type: Number,
    required: true
    
  }],
  
  createdAt: {
    type: Date,
    default: Date.now,
  }

}
);



module.exports = Mongoose.model('divida', DividaSchema)