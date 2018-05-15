import React, { Component } from 'react';
import PacienteForm from './PacienteForm';
import ConsultaForm from './ConsultaForm';
import glamorous from 'glamorous';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Switch, Route, Link, BrowserRouter } from 'react-router-dom'

const Container = glamorous.div({
  height: '100%',
  width: '100%',
  background: 'linear-gradient(to right, #48b1bf, #06beb6)',
  display: 'block'
})

const linkStyle = {
  textDecoration: 'none',
}

const NavBar = glamorous.div({
  display: 'block',
  backgroundColor: '#FAFAFA',
  height: '64px',
  boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
  marginBottom: '40px',

})

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Container>
        <ToastContainer />
        <NavBar>
          <Link to="/paciente" style={linkStyle}>Alta de pacientes   </Link>
          <Link to="/consulta" style={linkStyle}>   Consultas</Link>
        </NavBar>
        <Switch>
          <Route path="/paciente" component={PacienteForm} />
          <Route path="/consulta" component={ConsultaForm} />
        </Switch>
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;
