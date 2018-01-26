const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('./user')
const env = require('../../.env')

const logar = (req, res) => {
  const login = req.body.login || ''
  const senha = req.body.senha || ''

  User.findOne({login}, (err, user) => {
    if(err){
      return res.status(400).send({err: 'Erro'})
    }else if(user && bcrypt.compareSync(senha, user.senha)){
      const token = jwt.sign({id: user.id, login: user.login}, env.secret)
      res.json({token, user})
    }else{
      return res.status(400).send({err: 'Login/Senha invalidos'})
    }
  })
}

const validarToken = (req, res, next) => {
  const token = req.body.token || ''
  jwt.verify(token, env.secret, (err, decode) => {
    return res.status(200).send({valido: !err})
  })
}

const cadastrar = (req, res, next) => {
  const login = req.body.login || ''
  const senha = req.body.senha || ''
  const nome = req.body.nome || ''

  const salt = bcrypt.genSaltSync()
  const passwordHash = bcrypt.hashSync(senha, salt)

  User.findOne({login}, (err, user) => {
    if(err) {
      return sendErrorsFromDB(res, err)
    } else if (user) {
      return res.status(400).send({err: "usuario ja cadastrado"})
    } else {
      const newUser = new User({ login, senha: passwordHash, nome })
      newUser.save(err => {
        if(err) {
          return sendErrorsFromDB(res, err)
        } else {
          logar(req, res, next)
        }
      })
    }
  })
}

module.exports = {logar, validarToken, cadastrar}
