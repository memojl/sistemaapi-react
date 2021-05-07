import React from 'react';
//css
import '../assets/css/Login.css'
//Logo
import logo from '../assets/img/icon.png'
//service
import {Api_url} from '../services/apirest'
//Axios
import axios from 'axios'

class Login extends React.Component{
    constructor(props){
        super(props);
    }

    state={
        form:{
            "usuario":"",
            "password":""
        },
        error:false,
        errorMsg:"Error"
    }
    mLogin =e=>{
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
    botonEntrar=()=>{
        let url = Api_url + 'auth'
        axios.post(url,this.state.form).then(response=>{
            console.log(response)
            const {status, result} = response.data;
            if(status==='ok'){
                localStorage.setItem('token',result.token);
                this.props.history.push('/dashboard')
            }else{
                this.setState({
                    error: true,
                    errorMsg: result.error_msg
                })
            }
        }).catch(error=>{
            console.log(error);
            this.setState({
                error: true,
                errorMsg: "Error: Al conectar con el Api"
            })
        })
    }

    render(){
        return(
            <React.Fragment>
                <div className="wrapper fadeInDown">
                    <div id="formContent">

                        <div className="fadeIn first">
                            <img src={logo} width="130" alt="User Icon" />
                        </div>

                        <form onSubmit={this.mLogin}>
                            <input type="text" className="fadeIn second" name="usuario" placeholder="Usuario" onChange={this.manejadorChange} />
                            <input type="password" className="fadeIn third" name="password" placeholder="Password" onChange={this.manejadorChange} />
                            <input type="submit" className="fadeIn fourth" value="Entrar" onClick={this.botonEntrar} />
                        </form>

                        <div id="formFooter">
                        {this.state.error === true &&
                            <div className="alert alert-danger" role="alert">
                                {this.state.errorMsg}
                            </div>
                        }
                        </div>

                    </div>
                </div>                
            </React.Fragment>
        );
    }
}

export default Login
