import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import './App.css';
// import firebase from './firebase'
import LoginPage_signin from './LoginPages/login_signin'
import LoginPage_signup from './LoginPages/login_signup'
import Header from './Header/header'
import HomePage from './Home/home'
import {auth} from './firebase'
import {createUser} from './firebase'
// firebase.firestore().collection('thecollectoin').add({
//   title: 'Laptop',
//   time: 45
// })
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';

class App extends Component{
  constructor(){
    super();
    this.state = {
      isuser: true,
      currentuser: null
    };
  }

  unsubscribe = null;

  componentDidMount(){
    this.unsubscribe = auth.onAuthStateChanged(async user =>{
      console.log(user)
      if(user){
        const userRef = await createUser(user);
        userRef.onSnapshot(snapshot => {
          this.setState({
            isuser: true,
            currentuser: 
            {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        })
      }
      else{
        this.setState({currentuser: null, isuser: false})
      }
    })
    
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  render(){
    console.log(this.state.cur)
    return(
    <div className="App">
      <Header userState={this.state.currentuser} />
        <Switch>
          <Route exact path='/'component = {HomePage}/>
          <Route exact path='/login' component = {!this.state.currentuser ? LoginPage_signin : HomePage}/>
          <Route exact path='/signup'component = {!this.state.currentuser ? LoginPage_signup : HomePage}/>
        </Switch>
    </div>
    )
  }
}

export default App;
