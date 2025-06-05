import React from 'react';
import { Link } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './Login.css';  
import Calender from "./Calender";
import jQuery from 'jquery';

import axios from 'axios';
//import Approver from '../Approver/Approver';

axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'x-csrftoken' 
class LoginPage extends React.Component{
  
  state = {
    email:"",
    password:"",
    response:"",
  }
  
  handleInput = (e:React.ChangeEvent<HTMLInputElement>) => { 
    this.setState({ 
        [e.target.name]: e.target.value, 
    }); 
  };

  submitLogin=(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    console.log(this.state.email)
    console.log(this.state.password)
    let axioConfig={
      
      Credential:'include',
      withCredentials:true,
    }
    axios.post("http://127.0.0.1:8000/login/",{
        email: this.state.email,
        password: this.state.password,
      },axioConfig)
      .then((res)=>{
        
        console.log(res.data)
        if(res.status===200){
          sessionStorage.setItem('loged',res.data)
          console.log("login success")
          
          const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
          root.render(<Calender />)
                     
        }
        else{
          console.log("error login")
          console.log(res.status)
          
        }
        
    })
    .catch((err) =>{});
    
  };

  render(){
  return (
      <div className='body-login'>
        <div className="container-login">
          
          <div className="left-section">
            <div className="logo-login">
                
            </div>
            <form onSubmit={this.submitLogin} >
              <label htmlFor="username">Email</label>
              <input type="username" id="username" name="email" value={this.state.email} onChange={this.handleInput}/>

              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" value={this.state.password} onChange={this.handleInput}/>

              <button id="button-loginn" type="submit">Sign in</button>
            </form>
            
          </div>

          
        </div>
      </div>
  );
  //};
}
}

export default LoginPage;
