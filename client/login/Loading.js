import React from 'react'
import styles from './styles.js'

const style = {
    height: 300,
    width: 400,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
}

export default class Loading extends React.Component {
  constructor(props){
    super(props);
    this.state = { text: '.' }   
  }

  componentDidMount(){
    const stopper = '...'
    this.interval = setInterval( () => {
      if (this.state.text === stopper) this.setState({  text: '.' });
      else this.setState({ text: this.state.text + '.' })
    }, 300);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  render(){
    if(this.props.show){
      return(
        <div style={{...styles.container, position: "absolute", zIndex: '102'}}>
          <div style={styles.loading}>{this.state.text}</div>
          <div style={styles.loadingBackground}></div>
        </div>
      )
    }
    else return null
  }
}