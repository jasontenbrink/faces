import RaisedButton from 'material-ui/RaisedButton'
import React, {Component} from 'react'
import Paper from 'material-ui/Paper'
import axios from 'axios'
import styles from './styles.js'
import ErrorBanner from './errorBanner.js'
import Loading from './Loading.js'

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
    console.log('is submitting', this.state.isSubmitting)
    return (
      <div>
        <Loading show={this.state.isSubmitting} />
        {/*<Loading show={true} />*/}
        <div style={styles.background}></div>
        <div style={styles.container}>
          <div style={styles.welcome}>Nora UU Faces</div>
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
              labelColor="gainsboro"
              style={styles.submitButton}
              labelStyle={styles.submitLabel}
              buttonStyle={styles.submitButton}
              label="Log In"
            />
        </form>
        </div>
      </div>
    )
  }
}