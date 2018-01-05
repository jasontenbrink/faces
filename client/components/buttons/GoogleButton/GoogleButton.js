import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import styles from './styles'

const GoogleButton = props => {
    return <RaisedButton
        href="/auth/google"
        icon={
            <FontIcon 
                style={styles.icon} 
                className="fa fa-google fa-lg" 
            />
        }
        labelStyle={styles.socialLabel}
        buttonStyle={{...styles.googleButton, ...props.buttonStyle}}
        style={props.style}
        label={props.label}
    />
}

export default GoogleButton;