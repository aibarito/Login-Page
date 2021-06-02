import React from 'react'
import {Link} from 'react-router-dom'
// import './sign-in.scss'
import './web-sign.scss'
import LoginForm from '../../LoginForm/loginform'
import Button from '../../LoginForm/button'
import {auth, signInWithGoogle} from '../../firebase'
import '../../LoginForm/button.scss'
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';


class SignIn extends React.Component{
    constructor(){
        super()

        this.state = {
            email: '',
            password: ''
        }
    }

    submitClicked = async event =>{
        event.preventDefault();
        const {email, password} = this.state;
        try{
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({email: '', password: ''})
        }catch(error){
            alert("Credentials are invalid")
            console.log(error)
        }
    }

    changed = event => {
        const {name, value} = event.target;
        this.setState({[name]: value})
    }

    render(){
        return(
            <div className="signin">
                <div className="back-img">
                    <div className="sign-in-text">
                        <h3 className="active">Sign In</h3>
                    </div>
                    <div className="layer"></div>
                </div>
                <div className="form-section">
                    <form onSubmit={this.submitClicked}>
                        {/* <div className='sign-in-text'> */}
                            <div className="">
                                <LoginForm  label='email' name = 'email' type='email' changed={this.changed} value={this.state.email} required></LoginForm>
                                {/* <label className="mdl-textfield__label" htmlFor="sample3">Email</label>
                                <span className="mdl-textfield__error">Enter a correct Email</span> */}
                            </div>
                            <div className="">
                                <LoginForm label='password' name = 'password' id="sample3" type='password' changed={this.changed} value={this.state.password} required></LoginForm>
                                {/* <label className="mdl-textfield__label" htmlFor="sample3">Password</label> */}
                            </div>
                            <br/>
                        {/* </div> */}
                        <div className='buttons'>
                            <Button className="sign-in-btn big" type='submit'>Sign in</Button>
                            <button className="sign-in-btn" onClick={signInWithGoogle}>Sign in with Google</button> 
                        </div>   
                    </form>

                    <div className="sign-up-link">
                        <Link className="sign-up-link" to="/signup">I do not have an account yet</Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default SignIn