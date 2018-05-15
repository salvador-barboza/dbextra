import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:4000'

export const getPacientes = () => axios.get('/pacientes')
export const getDoctores = () => axios.get('/doctores')

export const putPaciente = ({
  firstname,
  lastname,
  gender,
  birthDate,
  bloodType,
  mainAddr,
  phoneNum,
  email
}) => axios.put('/pacientes', {
  firstname,
  lastname,
  gender,
  birthDate,
  bloodType,
  mainAddr,
  phoneNum,
  email
})
export const getMedicamentos = () => axios.get('/medicamentos')
export const postConsulta = ({
  testAnswers,
  medicamentos,
  motivo,
  notaClinica,
  peso,
  estatura,
  doctorId,
  pacienteId,
}) => axios.put('/consultas', {
  testAnswers,
  medicamentos,
  motivo,
  notaClinica,
  peso,
  estatura,
  doctorId,
  pacienteId,
});
