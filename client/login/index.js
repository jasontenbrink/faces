import React from 'react'
import {ReactDom, render} from 'react-dom'
import axios from 'axios'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import LoginForm from './LoginForm.js'

injectTapEventPlugin();

const app = document.getElementById('app');

render(
  <MuiThemeProvider>
    <LoginForm />  
  </MuiThemeProvider>, app
);