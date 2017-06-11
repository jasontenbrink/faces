import RaisedButton from 'material-ui/RaisedButton'
import React, {Component} from 'react'
import Paper from 'material-ui/Paper'
import axios from 'axios'
import styles from './styles.js'

const style = {
    height: 300,
    width: 400,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
}

export default class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: ""
    }
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  handleFieldChange(inputName, e){
    console.log(e.target)
    this.setState({[inputName]: e.target.value})
  }

  render(){
    return (
      <div>
        <div style={styles.background}></div>
        <div style={styles.container}>
          <div style={styles.welcome}>Nora UU Faces</div>
          <form style={styles.mainBox} action="/" method="post" onSubmit={submit}>
            <input style={styles.input}
              placeholder = "user name"
              type="text"
              name="username" 
              value={this.state.username} 
              onChange={e => this.handleFieldChange("username",e)}
              autoFocus />
        
            <input style={styles.input}
              type="password"
              name="password" 
              placeholder = "password"
              value={this.state.password}
              onChange={e => this.handleFieldChange("password",e)}
              />
            {/*<RaisedButton 
              type="submit"
              labelColor="gainsboro"
              style={styles.submitButton}
              labelStyle={styles.submitLabel}
              buttonStyle={styles.submitButton}
              label="submit" 
              value="submit"/>*/}
              <RaisedButton 
              onClick={(e) => submit(e, this.state)}
              labelColor="gainsboro"
              style={styles.submitButton}
              labelStyle={styles.submitLabel}
              buttonStyle={styles.submitButton}
              />
          </form>
        </div>
      </div>
    )
  }
}

function submit(e, {username, password}){
  if (false) e.preventDefault()
  console.log('submit was pressed');
  

  let data = {username, password}

  axios.post('/login', data)
    .then(response => {
      // document.querySelector('html').innerHTML = response.data;
      window.location.assign('/')
  })
}

{/*<div class="container" layout="column" layout-align="start center">
  <div class="log-in md-whiteframe-1dp">

    <div class="logo-login" layout="row" layout-align="space-between end">
      <img src="assets/images/logo1.png" class="logo" width="50">

        <h1 class="logo-text-login">First Universalist Church of Minneapolis</h1>
    </div>

    
    <form>
      <md-input-container class="md-primary">
        <label for="username">Email</label>
        <input type="text" name="username" id="username" ng-model="user.username" 
          ng-focus="resetForm()" ng-change="resetForm()" autofocus
        />
      </md-input-container>
      
      <md-input-container>
        <label for="password">Password</label>
        <input type="password" name="password" id="password" ng-model="user.password"/>
      </md-input-container>

      <error show-error="isError"></error>

      <div layout="column" layout-align="center center">
        <md-button aria-label="Submit Button" class="md-raised login-button"
          ng-click="submitCredentials()" ng-disabled="isLoggingIn">
          Log In
        </md-button>

        <!-- <span class="bar"><span class="or">or</span></span> -->

        <!-- <md-button href="/auth/google" class="md-raised login-button google-login-button">
            <i class="fa fa-google fa-lg"></i><span>Log In with Google</span>
        </md-button> -->

      </div>
      <a class="register-link" href="#/register">Register for an account</a>
    </form>
  </div>
</div>*/}
