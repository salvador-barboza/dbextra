const c = require('./db')
const { toSQLDate } = require('./lib')

exports.getMedicamentos = () => c.query(`
  SELECT * FROM Medicamento
`)
