import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import styles from './styles'

const FacebookButton = props => {
    return <RaisedButton
        href="/auth/facebook"
        icon={
            <FontIcon 
                style={styles.icon} 
                className="fa fa-facebook fa-lg" 
            />
        }
        labelStyle={styles.socialLabel}
        buttonStyle={{...styles.facebookButton, ...props.buttonStyle}}
        style={props.style}
        label={props.label}
    />
}

export default FacebookButton;