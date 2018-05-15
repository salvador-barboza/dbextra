const { createConnection } = require('mysql')

const c = createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hospital',
  multipleStatements: true
})

exports.query = SQLquery => new Promise((resolve, reject) =>
  c.query(SQLquery, (err, results) => {
    if (err) {
      reject(err)
     }

    resolve(results)
  }))

exports.end = c.end

