import React from 'react'
import styles from './styles.js'
import PropTypes from 'prop-types'

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
    showError: PropTypes.bool
}
export default ErrorBanner;