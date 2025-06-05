import React from 'react';
import ReactDOM from 'react-dom/client';
import './Signup.css'; 
import axios from 'axios'; 
import Login from './Login'

class Signup extends React.Component {

    state = {
        details:[],
        firstname:"",
        lastname:"",
        email:"",
        phone:"",
        password:"",
        password2:"",
        
    };

    
    handleInput = (e:React.ChangeEvent<HTMLInputElement>) =>{
        this.setState({
            [e.target.name]:e.target.value,
        });
    };

    login = () =>{
        const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
            root.render(<Login/>);
    };
    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
       
        axios.post("http://127.0.0.1:8000/createAccount/",{
            
            first_name:this.state.firstname,
            last_name:this.state.lastname,
            email:this.state.email,
            phone:this.state.phone,
            password1:this.state.password,
            password2:this.state.password2,
            
        })
        .then((res) => {
            console.log(res.data)
            console.log(res.status)
            const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
            root.render(<Login/>);
        })
        .catch((err)=>{
            console.log(err.status)
            
        });
    };

    
   render(){ 
    return (
        <>
        <div className='body-signup'>
          <div className="container-signup">
            <div className="header-signup">
                <div className="top-right">
                    <div className="login-link">Already have an account? <button onClick={this.login}>Log in</button></div>
                    
                </div>
            </div>
            
            <h1>Create an account</h1>
            <p id='errorsta'></p>
            <div className="form-container">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <div className="left">
                            <label htmlFor="firstname">FirstName</label>
                            <input type="text" id="firstname" name="firstname" value={this.state.firstname} onChange={this.handleInput}/>
                        </div>
                        <div className="right">
                            <label htmlFor="lastname">LastName</label>
                            <input type="text" id="lastname" name="lastname"value={this.state.lastname} onChange={this.handleInput}/>
                        </div>
                        
                    </div>
                    
                    <div className="form-group">
                        <div className="left">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" value={this.state.email} onChange={this.handleInput}/>
                           
                        </div>
                        <div className="right">
                            <label htmlFor="phone">Phone</label>
                            <input type="phone" id="phone" name="phone" value={this.state.phone} onChange={this.handleInput}/>
                            
                        </div>                
                    </div>

                    <div className="form-group">
                        <div className="left">
                            <div className="password-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" value={this.state.password} onChange={this.handleInput}/>
                            </div> 
                            <ul className="password-hints">
                                <li>Use 8 or more characters</li>
                                <li>Use a symbol (e.g. !@#$)</li>
                                <li>Use a number (e.g. 1234)</li>
                            </ul>                   
                        </div>
                        <div className="right">
                
                            <div className="password-group">
                                <label htmlFor="password">Confirm Password</label>
                                <input type="password" id="password2" name="password2" value={this.state.password2} onChange={this.handleInput}/> 

                            </div>                    
                        </div>
                        
                    </div>
                    
                    <button className="register-button" type="submit">Register</button>
                </form>
                
            </div>
            
        </div>
        </div>
        </>
    );
}
}

export default Signup;
