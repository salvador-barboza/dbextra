const c = require('./db')
const { toSQLDate } = require('./lib')

exports.insertReceta = () => c.query(`INSERT INTO RecetaMedica VALUES();`)

exports.insertMedicamentosReceta = (medicamentos, recetaId) => c.query(`
  START TRANSACTION;
  ${medicamentos.reduce((str, {id, instrucciones, dias, frecuencia, dosis}) => `${str}
    INSERT INTO MedicamentosPorReceta VALUES(
      ${recetaId},
      ${id},
      '${instrucciones}',
      ${dias},
      ${frecuencia},
      ${dosis}
    );`, '')}
  COMMIT;
`)

exports.insertConsulta = (date, motivo, notaClinica, peso, estatura, doctorId, pacienteId, testResultId, recetaId) => c.query(`
    INSERT INTO Consulta(consulta_date, motivo, nota_clinica, peso, estatura, doctor_id, paciente_id, test_result_id, receta_id) VALUES (
    '${toSQLDate(new Date())}',
    '${motivo}',
    '${notaClinica}',
    ${peso},
    ${estatura},
    ${doctorId},
    ${pacienteId},
    ${testResultId},
    ${recetaId});
  `)