const c = require('./db')
const { toSQLDate } = require('./lib')

exports.insertTest = (date) => c.query(`
  INSERT INTO TestResult (submition_date, test_id) VALUES (
    '${toSQLDate(date)}',
    1
  );
`)

exports.insertAnswers = (respuestas, testResultId) => c.query(`
  START TRANSACTION;
  ${respuestas.reduce((str, {questionId, val}) => `${str}
  INSERT INTO TestResultAnswer(test_result_id, question_id, val) VALUES (
    ${testResultId},
    ${questionId},
    ${val});`, '')}
  COMMIT;
`)
