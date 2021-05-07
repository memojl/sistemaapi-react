import React from 'react';
import Header from '../templates/Header';
//service
import {Api_url} from '../services/apirest';
import axios from 'axios';

class Dashboard extends React.Component{
    state={
        pacientes:[]
    }

    clickPaciente(id){
        this.props.history.push('/editar/'+id)        
    }

    delete =(id)=>{
        let pacienteId = id;//this.props.match.params.id
        let url = Api_url + 'pacientes';
        let datos = {
            "token": localStorage.getItem('token'),
            "pacienteId": pacienteId
        }   
        axios.delete(url,{headers : datos}).then(response=>{
            console.log(response);
            const  {statusText} = response;
            console.log(statusText);
            if(statusText==='OK'){
              this.props.history.push(this.props.match.url)
              window.location.reload(true);
            }
        })
    }

    componentDidMount(){
        let url = Api_url + 'pacientes?page=1';
        axios.get(url).then(response=>{
            console.log(response.data)
            this.setState({
                pacientes : response.data
            })
        })
    }

    render(){
        return(
            <React.Fragment>
                <Header></Header>
                <div className="container">
                    <br/>
                    <div className="row text-left"><a className="btn btn-primary" href="/nuevo">Nuevo</a></div>
                    <br/>
                <table className="table table-hover">
  <thead className="thead-dark">
    <tr>
      <th scope="col">ID</th>
      <th scope="col">DNI</th>
      <th scope="col">NOMBRE</th>
      <th scope="col">TELEFONO</th>
      <th scope="col">CORREO</th>
      <th scope="col">ACCIONES</th>
    </tr>
  </thead>
  <tbody>
{ this.state.pacientes.map((value,index) =>{
    return(
    <tr key={index} >
      <th scope="row">{value.PacienteId}</th>
      <td>{value.DNI}</td>
      <td>{value.Nombre}</td>
      <td>{value.Telefono}</td>
      <td>{value.Correo}</td>
      <td>
        <button className="btn btn-warning" onClick={()=>this.clickPaciente(value.PacienteId)}><i className="bi bi-trash"></i> Editar</button>
        <button className="btn btn-danger" onClick={()=>this.delete(value.PacienteId)}><i className="bi bi-trash"></i> Eliminar</button>
      </td>
    </tr>
    )
})}    
  </tbody>
</table>

                </div>
            </React.Fragment>
        );
    }
}

export default Dashboard
