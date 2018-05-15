import React from 'react'
import { path } from 'ramda'
import glamorous from 'glamorous'
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';

import { getDoctores, getPacientes, getMedicamentos, postConsulta } from './data/dataService'
import { Button, TextField, Select, MenuItem, FormControl, Input, InputLabel } from 'material-ui'
import DatePicker from 'material-ui-pickers/DatePicker';

import { Formik, FieldArray } from 'formik';
import { toast } from 'react-toastify';

const Container = glamorous.div({
  backgroundColor: '#FAFAFA',
  padding: '24px',
  margin: '24px auto',
  width: '600px',
  boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
})

const Title = glamorous.h1({
  margin: 0
})

const Subtitle = glamorous.h2({
  margin: 0
})

const TextFieldStyles = {
  display: 'block',
  margin: '10px',
  width: 300,
  minWidth: 300
}

const Line = glamorous.div({
  margin: '24px auto',
  border: '.5px solid #E0E0E0',
  width: '45px',
  display: 'block',
})

class ConsultaForm extends React.Component {
  submit = ({
    medicamentos, motivo, notaClinica, peso, estatura, doctorId, pacienteId
  }) => postConsulta({
    testAnswers: [], medicamentos, motivo, notaClinica, peso, estatura, doctorId, pacienteId
  })
  .then(toast.success('Paciente agregado'))
  state = { pacientes: [], doctores: [], medicamentos: [] }
  componentWillMount = async () => {
    this.setState({ ...this.state,
       pacientes: (await getPacientes()).data,
       doctores: (await getDoctores()).data,
       medicamentos: (await getMedicamentos()).data
      })
  }

  getList = (label, field, items, values, setFieldValue) => (
       <FormControl style={TextFieldStyles}>
          <InputLabel htmlFor={field}>{label}</InputLabel>
         <Select
            label={label}
            value={path(field.split('.'), values) || ''}
            onChange={({target}) => setFieldValue(field, target.value)}
            name={field}
            style={{ width: 'auto' }}
            inputProps={{
              name: field,
              id: field
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {items.map(({ id, name }) => <MenuItem value={id}>{name}</MenuItem>)}
          </Select>
        </FormControl>
  )

  render = () => (
    <MuiPickersUtilsProvider utils={MomentUtils}>
    <Formik
      onSubmit={this.submit}
      render={({ handleChange, handleSubmit, values, setFieldValue }) => (
      <form onSubmit={handleSubmit}>
          <Container>
          <Title>Consulta</Title>
          {this.getList('Doctor', 'doctorId', this.state.doctores, values, setFieldValue)}
          <TextField
            style={TextFieldStyles}
            label="Motivo"
            name="motivo"
            fullWidth
            onChange={handleChange} />
          <TextField
            style={TextFieldStyles}
            label="Nota Clínica"
            name="notaClinica"
            fullWidth
            onChange={handleChange} />
          <TextField
            style={TextFieldStyles}
            label="Peso"
            name="peso"
            fullWidth
            onChange={handleChange} />
          <TextField
            style={TextFieldStyles}
            label="Estatura"
            name="estatura"
            fullWidth
            onChange={handleChange} />
          {this.getList('Paciente', 'pacienteId', this.state.pacientes, values, setFieldValue)}
        </Container>
        <Container>
          <Subtitle>Preescripción</Subtitle>
          <FieldArray
            name="medicamentos"
            render={({ move, swap, push, insert, unshift, pop }) => (
              <form>
                 {values.medicamentos && values.medicamentos.length > 0 && (
                  values.medicamentos.map(({ dosis, medicamento }, index) => (
                    <div>
                      {this.getList('Medicamento', `medicamentos.${index}.id`, this.state.medicamentos, values, setFieldValue)}
                      <TextField
                        style={TextFieldStyles}
                        label="Instrucciones"
                        name={`medicamentos.${index}.instrucciones`}
                        fullWidth
                        onChange={handleChange} />
                      <TextField
                        style={TextFieldStyles}
                        label="Dias"
                        name={`medicamentos.${index}.dias`}
                        onChange={handleChange} />
                      <TextField
                        style={TextFieldStyles}
                        label="Frecuencia"
                        name={`medicamentos.${index}.frecuencia`}
                        onChange={handleChange} />
                      <TextField
                        style={TextFieldStyles}
                        label="Dosis"
                        name={`medicamentos.${index}.dosis`}
                        onChange={handleChange} />
                        <Line />
                    </div>
                  )))}
                <Button
                  onClick={() => push({})}>
                  Agregar medicamento
                </Button>
              </form>
            )}
          />
        </Container>


        <Button type="submit">Guardar cambios</Button>
      </form>
    )} />
    </MuiPickersUtilsProvider>
  )
}

export default ConsultaForm;