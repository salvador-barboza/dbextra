const c = require('./db')
const { toSQLDate } = require('./lib')

exports.getDoctores = () => c.query(`
  SELECT * FROM Doctor
`)
