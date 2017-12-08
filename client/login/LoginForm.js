import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper'
import React, {Component} from 'react'
import axios from 'axios'
import styles from './styles.js'
import ErrorBanner from './errorBanner.js'
import Loading from './Loading.js'
import image from '../images/UUchalice.jpg'

export default class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
      authenticationError: false,
      isSubmitting: false
    }
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleFieldChange(inputName, e){
    this.setState({[inputName]: e.target.value})
  }

  submit({ username, password }) {
    this.setState({ authenticationError: false })
    this.setState({ isSubmitting: true })
    let data = { username, password }
    axios.post('/login', data)
      .then(response => {
        this.setState({ isSubmitting: false })
        window.location.assign('/')
      })
      .catch(response => {
        this.setState({ authenticationError: true })
        this.setState({ isSubmitting: false })
      })
  }

  render(){
    return (
      <div>
        <Loading show={this.state.isSubmitting} />
        <div style={styles.container}>
          <Paper id="formContainer" style={styles.formContainer} zDepth={1}>
            <div style={styles.welcomeContainer}>
              <img style={styles.image} src={image}/>
              <h1 style={styles.welcome}>Faces</h1>
            </div>
            <ErrorBanner showError={this.state.authenticationError}/>
            <form style={styles.mainBox} action="/" method="post">
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

              <RaisedButton 
                onClick={() => this.submit(this.state)}
                disabled = {this.state.isSubmitting}
                
                style={styles.submitButton}
                labelStyle={styles.submitLabel}
                buttonStyle={styles.submitButton}
                label="Log In"
              />
              <p style={{textAlign: "center"}}>--or--</p>
              {/* <div style={styles.socialContainer}> */}
                <RaisedButton
                  id="googleButton"
                  href="/auth/google"
                  icon={<FontIcon id="googleIcon" style={styles.icon} className="fa fa-google fa-lg" />}
                  labelStyle={styles.socialLabel}
                  buttonStyle={styles.googleButton}
                  
                  label="Log In with Google"
                />
                <RaisedButton
                  href="/auth/facebook"
                  icon={<FontIcon style={styles.icon} className="fa fa-facebook fa-lg" />}
                  buttonStyle={styles.facebookButton}
                  labelStyle={styles.socialLabel}
                  label="Log In with Facebook"
                />
                {/* <a class="register-link" href="#/register">Register for an account</a> */}
              {/* </div> */}
          </form>
          </Paper>
        </div>
      </div>
    )
  }
}