import React from 'react';
import Header from '../templates/Header';
//service
import {Api_url} from '../services/apirest';
import axios from 'axios';

class Nuevo extends React.Component{
    
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
            "token" : localStorage.getItem('token')
        },
        error:false,
        errorMsg:"Error"
    }

    mNuevo =e=>{
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

    post =()=>{
        let url = Api_url + 'pacientes';
        axios.post(url,this.state.form).then(response=>{
            console.log(response)
            const  {statusText} = response;
            console.log(statusText);
            if(statusText==='OK'){
                this.props.history.push('/dashboard')
            }
        })       
    }

    render(){
       
        return(
            <React.Fragment>
                <Header></Header>
                <div className="container">
                    <br/>
                    <form className="form-horizontal" onSubmit={this.mNuevo}>
                        <div className="row">    
                            <div className="col-sm-6">
                                <div className="form-group text-left">
                                    <label className="control-label">Nombre</label>
                                    <input type="text" className="form-control" name="nombre" placeholder="DNI" onChange={this.manejadorChange} />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group text-left">
                                    <label className="control-label">Correo</label>
                                    <input type="email" className="form-control" name="correo" placeholder="DNI" onChange={this.manejadorChange} />
                                </div>
                            </div>
                            <div className="col-sm-12">    
                                <div className="form-group text-left">
                                    <label className="control-label">Dirección</label>
                                    <input type="text" className="form-control" name="direccion" placeholder="DNI" onChange={this.manejadorChange} />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group text-left">
                                    <label className="control-label">DNI</label>
                                    <input type="text" className="form-control" name="dni" placeholder="DNI" onChange={this.manejadorChange} />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group text-left">
                                    <label className="control-label">Codigo Postal</label>
                                    <input type="text" className="form-control" name="codigoPostal" placeholder="DNI" onChange={this.manejadorChange} />
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group text-left">
                                    <label className="control-label">Genero</label>
                                    <input type="text" className="form-control" name="genero" placeholder="DNI" onChange={this.manejadorChange} />
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group text-left">
                                    <label className="control-label">Telefono</label>
                                    <input type="tel" className="form-control" name="telefono" placeholder="DNI" onChange={this.manejadorChange} />
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group text-left">
                                    <label className="control-label">Fecha de Nacimiento</label>
                                    <input type="date" className="form-control" name="fechaNacimiento" onChange={this.manejadorChange} />
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group text-right">
                                    <button type="button" className="btn btn-primary" onClick={()=>this.post()}>Guardar</button>
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

export default Nuevo
