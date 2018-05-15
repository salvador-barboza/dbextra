const c = require('./db')
const { toSQLDate } = require('./lib')

exports.getPacientes = () => c.query(`
  SELECT * FROM Paciente
`)

exports.insertPacientes = (firstname, lastname, gender, birthDate, bloodType, mainAddr, phoneNum, email) => c.query(`
  INSERT INTO Paciente
    (first_name, last_name, gender, birth_date, blood_type, main_addr, phone_num, email)
  VALUES (
    '${firstname}',
    '${lastname}',
    '${gender}',
    '${toSQLDate(new Date())}',
    '${bloodType}',
    '${mainAddr}',
    '${phoneNum}',
    '${email}'
  );
`)