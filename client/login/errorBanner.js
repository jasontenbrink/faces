import React from 'react'
import styles from './styles.js'

const warningColor = {color: 'red'}

const ErrorBanner = ({showError}) => {
    if(showError) {
        return (   
            <div style={{...styles.baseTextStyle, color: 'red', opacity: '.8'}}>Incorrect username or password</div>

        )
    }
    else return null
};

ErrorBanner.propTypes = {
    showError: React.PropTypes.bool
}
export default ErrorBanner;