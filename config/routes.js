const express = require('express');
const auth = require('./auth')

module.exports = (server) => {
  /*
  * Rotas abertas
  */
  const openApi = express.Router()
  server.use('/oapi', openApi)

  const AuthService = require('../api/user/authService')
  openApi.post('/logar', AuthService.logar)
  openApi.post('/cadastrar', AuthService.cadastrar)
  openApi.post('/validarToken', AuthService.validarToken)

  /*
  * Rotas protegidas por Token JWT
  */
  const protectedApi = express.Router()
  server.use('/api', protectedApi)

  protectedApi.use(auth)

  const obraService = require('../api/obra/obraService');
  obraService.register(protectedApi, '/obras');

}
