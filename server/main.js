const app = require('express')()
const cors = require('cors')
const jsonParser = require('body-parser').json()
const pacientes = require('./data/pacientes')
const doctores = require('./data/doctores')
const medicamentos = require('./data/medicamentos')
const consultas = require('./data/consultas')
const tests  = require('./data/tests')

const PORT = 4000

app.use(cors())
app.use(jsonParser)

app.get('/pacientes', async (req, res) => {
  const q = await pacientes.getPacientes()

  res.json(q.map(r => ({
    id: r.paciente_id,
    name: `${r.first_name} ${r.last_name}`,
  })))
})

app.get('/doctores', async (req, res) => {
  const q = await doctores.getDoctores()

  res.json(q.map(r => ({
    id: r.doctor_id,
    name: `${r.first_name} ${r.last_name}`,
  })))
})

app.put('/pacientes', (req, res) => {
  const { firstname, lastname, gender, birthDate, bloodType, mainAddr, phoneNum, email } = (req.body)

  pacientes
    .insertPacientes(firstname, lastname, gender, birthDate, bloodType, mainAddr, phoneNum, email)
    .then(() => res.sendStatus(201))
    .catch(err => {
      console.error(err)
      res.sendStatus(500)
    })
})


app.get('/medicamentos', async (req, res) => {
  const q = await medicamentos.getMedicamentos()

  res.json(q.map(r => ({
    id: r.medicamento_id,
    name: `${r.nombre}`,
  })))
})

app.put('/consultas', (req, res) => {
  const {
    testAnswers,
    medicamentos,
    motivo,
    notaClinica,
    peso,
    estatura,
    doctorId,
    pacienteId
  } = req.body

  console.log(req.body)

  return tests.insertTest(new Date())
    .then(({ insertId }) => insertId)
    .then(testId => Promise.all([
      Promise.resolve(console.log(testId)),
      tests.insertAnswers(testAnswers, testId),
      consultas.insertReceta()
      .then(({ insertId }) => insertId)
      .then(recetaId => Promise.all([
        consultas.insertMedicamentosReceta(medicamentos, recetaId),
        consultas.insertConsulta(new Date(), motivo, notaClinica, peso, estatura, doctorId, pacienteId, testId, recetaId)
      ]))
    ]))
    .then(() => res.sendStatus(201))
    .catch(err => {
      console.error(err)
      res.sendStatus(500)
    })
})

app.listen(PORT, () => console.log(`listening port: ${PORT}`))