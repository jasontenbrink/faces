import {Component, PropTypes} from 'react';

const warningColor = {color: 'red'}
class ErrorBanner extends Component {
    
    render(){
        console.log(this.props);
        console.log('react component');
        if(this.props.showError){
            return(
                <div>
                    <div style={warningColor}>*Incorrect username or password*</div>
                </div>
            )
        }
        else return null;
    }
}

ErrorBanner.propTypes = {
    showError: PropTypes.bool
}
// angular.module('app').value('ErrorBanner', ErrorBanner);
angular.module('app').directive( 'error', ['reactDirective',
function( reactDirective ) {
  return reactDirective( ErrorBanner);
}]);