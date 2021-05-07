import React from 'react';
import Header from '../templates/Header';
//service
import {Api_url} from '../services/apirest';
import axios from 'axios';

class Editar extends React.Component{
    
    state={
        form:{
            "nombre" : "",
            "direccion" : "",
            "dni" : "",
            "correo":"",
            "codigoPostal" :"",
            "genero" : "",
            "telefono" : "",
            "fechaNacimiento" : "",
            "token" : "" ,
            "pacienteId" : ""
        },
        error:false,
        errorMsg:"Error"
    }

    mEditar =e=>{
        e.preventDefault();
    }

    manejadorChange = async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
        //console.log(this.state.form);
    }

    put =()=>{
        let url = Api_url + 'pacientes';
        axios.put(url,this.state.form).then(response=>{
            console.log(response)
            const  {statusText} = response;
            console.log(statusText);
            if(statusText==='OK'){
                this.props.history.push('/dashboard')
            }
        })       
    }

    delete =()=>{
        let pacienteId = this.props.match.params.id
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
                this.props.history.push('/dashboard')
            }
        })
    }

    componentDidMount(){
        let pacienteId = this.props.match.params.id;
        let url = Api_url + 'pacientes?id=' + pacienteId;
        axios.get(url).then(response=>{
            console.log(response.data);
            const {Nombre,Direccion,DNI,Correo,CodigoPostal,Genero,Telefono,FechaNacimiento} = response.data[0];
            this.setState({
                form:{
                    nombre : Nombre,
                    direccion : Direccion,
                    dni : DNI,
                    correo : Correo,
                    codigoPostal : CodigoPostal,
                    genero : Genero,
                    telefono : Telefono,
                    fechaNacimiento : FechaNacimiento,
                    token : localStorage.getItem('token'),
                    pacienteId : pacienteId
                }
            })
        })
    }

    render(){
        const {nombre,direccion,dni,correo,codigoPostal,genero,telefono,fechaNacimiento} = this.state.form;
        
        return(
            <React.Fragment>
                <Header></Header>
                <div className="container">
                    <br/>
                    <form className="form-horizontal" onSubmit={this.mEditar}>
                        <div className="row">    
                            <div className="col-sm-6">
                                <div className="form-group text-left">
                                    <label className="control-label">Nombre</label>
                                    <input type="text" className="form-control" name="nombre" placeholder="DNI" value={nombre} onChange={this.manejadorChange} />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group text-left">
                                    <label className="control-label">Correo</label>
                                    <input type="email" className="form-control" name="correo" placeholder="DNI" value={correo} onChange={this.manejadorChange} />
                                </div>
                            </div>
                            <div className="col-sm-12">    
                                <div className="form-group text-left">
                                    <label className="control-label">Dirección</label>
                                    <input type="text" className="form-control" name="direccion" placeholder="DNI" value={direccion} onChange={this.manejadorChange} />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group text-left">
                                    <label className="control-label">DNI</label>
                                    <input type="text" className="form-control" name="dni" placeholder="DNI" value={dni} onChange={this.manejadorChange} />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group text-left">
                                    <label className="control-label">Codigo Postal</label>
                                    <input type="text" className="form-control" name="codigoPostal" placeholder="DNI" value={codigoPostal} onChange={this.manejadorChange} />
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group text-left">
                                    <label className="control-label">Genero</label>
                                    <input type="text" className="form-control" name="genero" placeholder="DNI" value={genero} onChange={this.manejadorChange} />
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group text-left">
                                    <label className="control-label">Telefono</label>
                                    <input type="tel" className="form-control" name="telefono" placeholder="DNI" value={telefono} onChange={this.manejadorChange} />
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group text-left">
                                    <label className="control-label">Fecha de Nacimiento</label>
                                    <input type="date" className="form-control" name="fechaNacimiento" placeholder="DNI" value={fechaNacimiento} onChange={this.manejadorChange} />
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group text-right">
                                    <button type="button" className="btn btn-primary" onClick={()=>this.put()}>Guardar</button>
                                    <button type="button" className="btn btn-danger" onClick={()=>this.delete()}>Eliminar</button>
                                    <a className="btn btn-light" href="/dashboard">Cancelar</a>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                
            </React.Fragment>
        );
    }
}

export default Editar
