import React from 'react'
import glamorous from 'glamorous'
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';

import { putPaciente } from './data/dataService'
import { Button, TextField, Select, MenuItem, FormControl, Input, InputLabel } from 'material-ui'
import DatePicker from 'material-ui-pickers/DatePicker';

import { Formik } from 'formik';
import { toast } from 'react-toastify';



const Container = glamorous.div({
  backgroundColor: '#FAFAFA',
  padding: '24px',
  margin: 'auto',
  width: '600px',
  boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
})

const Title = glamorous.h1({
  margin: 0
})

const TextFieldStyles = {
  display: 'block',
  margin: '10px',
  width: '300px',
}

class PacienteForm extends React.Component {
  submit = ({
    firstname, lastname, gender, birthDate, bloodType, mainAddr, phoneNum, email
  }) => putPaciente({
    firstname, lastname, gender, birthDate, bloodType, mainAddr, phoneNum, email
  }).then(toast.success('Paciente agregado'))
  render = () => (
  <Container>
    <MuiPickersUtilsProvider utils={MomentUtils}>
    <Formik
      onSubmit={this.submit}
      render={({ handleChange, handleSubmit, values, setFieldValue }) => (
      <form onSubmit={handleSubmit}>
        <Title>Alta de paciente</Title>
        <TextField
          style={TextFieldStyles}
          label="Nombre"
          name="firstname"
          onChange={handleChange} />
        <TextField
          style={TextFieldStyles}
          label="Apellido"
          name="lastname"
          onChange={handleChange} />
        <TextField
          style={TextFieldStyles}
          label="Dirección"
          name="mainAddr"
          onChange={handleChange}
          />
          <FormControl
            style={TextFieldStyles}
          >
          <InputLabel htmlFor="gender">Genero</InputLabel>
          <Select
            label="Genero"
            value={values.gender || ''}
            onChange={({target}) => setFieldValue('gender', target.value)}
            name="gender"
            style={{ width: 'auto' }}
            inputProps={{
              name: 'gender',
              id: 'gender',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="M">Masculino</MenuItem>
            <MenuItem value="F">Femenino</MenuItem>
          </Select>
        </FormControl>
        <FormControl
            style={TextFieldStyles}
          >
          <InputLabel htmlFor="bloodType">Tipo de sangre</InputLabel>
          <Select
            label="Genero"
            value={values.bloodType || ''}
            onChange={({target}) => setFieldValue('bloodType', target.value)}
            name="bloodType"
            style={{ width: 'auto' }}
            inputProps={{
              name: 'bloodType',
              id: 'bloodType',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="A+">A+</MenuItem>
            <MenuItem value="A-">A-</MenuItem>
            <MenuItem value="O+">O+</MenuItem>
            <MenuItem value="AB+">AB+</MenuItem>
            <MenuItem value="B+">O+</MenuItem>
            <MenuItem value="B-">B-</MenuItem>
          </Select>
        </FormControl>
        <DatePicker
          style={TextFieldStyles}
          onChange={(date) => setFieldValue('birthDate', date.toDate())} />
        <TextField
          style={TextFieldStyles}
          label="Email"
          name="email"
          type="email"
          onChange={handleChange}
          />
        <TextField
          style={TextFieldStyles}
          label="Telefono"
          name="phoneNum"
          type="phone"
          onChange={handleChange}
          />
        <Button type="submit">Agregar</Button>
      </form>
    )} />
    </MuiPickersUtilsProvider>
  </Container>)
}


export default PacienteForm;