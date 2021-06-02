import React from 'react'
import LoginForm from '../../LoginForm/loginform'
import Button from '../../LoginForm/button'
import {auth, createUser} from '../../firebase'

// import './sign-up.scss'
import '../sign-in/web-sign.scss'


class SignUp extends React.Component{
    constructor(){
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmpassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const {displayName, email, password, confirmpassword} = this.state;
        if(password !== confirmpassword){
            alert("passwords dont match")
            return;
        }

        try{
            const user = await auth.createUserWithEmailAndPassword(email, password);

            createUser(user, {displayName})

            this.setState(
            { 
                displayName: '',
                email: '',
                password: '',
                confirmpassword: ''
            })
        }catch(error){
            alert(error)
            console.log(error);
        }

    }

    handleChange = event => {
        const {value, name} = event.target;
        this.setState({[name]: value})
    }

    render(){
        const {displayName, email, password, confirmpassword} = this.state;

        return(
            <div className="signin">
                <div className="back-img">
                    <div className="sign-in-text">
                        <h3 className="active">Sign Up</h3>
                    </div>
                    <div className="layer"></div>
                </div> 
                <div className="form-section">
                    <form onSubmit={this.handleSubmit}>
                        <LoginForm type = 'text' name = 'displayName' value={displayName} changed={this.handleChange} label='Display Name' required></LoginForm>
                        <LoginForm type = 'email' name = 'email' value={email} changed={this.handleChange} label='Email' required></LoginForm>
                        <LoginForm type = 'password' name = 'password' value={password} changed={this.handleChange} label='Password' required></LoginForm>
                        <LoginForm type = 'password' name = 'confirmpassword' value={confirmpassword} changed={this.handleChange} label='Confirm Password' required></LoginForm>
                        <div className='buttons'>
                            <Button className="sign-in-btn big" type='submit'>Sign up</Button>
                        </div>   
                    </form>

                </div>
            </div>
        )
    }
}

export default SignUp
