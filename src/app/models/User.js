const Mongoose = require('../../database')

import bcrypt from 'bcryptjs';

const UserSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  password_hash: {
    type: String,
    
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  }

}
);
UserSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);

          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
  });
});
UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
}


module.exports = Mongoose.model('user', UserSchema)