import React from 'react'
import styles from './styles.js'

const warningColor = {color: 'red'}

const ErrorBanner = ({showError}) => {
    console.log('error banner');
    if(showError) {
        return (   
            <div style={{...styles.baseTextStyle, color: 'red', opacity: '.8'}}>Incorrect username or password</div>

        )
    }
    else return null
};
// class ErrorBanner extends Component {
    
//     render(){
//         console.log(this.props);
//         console.log('react component');
//         if(this.props.showError){
//             return(
//                 <div>
//                     <div style={warningColor}>*Incorrect username or password*</div>
//                 </div>
//             )
//         }
//         else return null;
//     }
// }

ErrorBanner.propTypes = {
    showError: React.PropTypes.bool
}
export default ErrorBanner;
// angular.module('app').value('ErrorBanner', ErrorBanner);
// angular.module('app').directive( 'error', ['reactDirective',
// function( reactDirective ) {
//   return reactDirective( ErrorBanner);
// }]);