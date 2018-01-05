import React from 'react'

const PermissionsError = ({error}) => {
    if (error){
        return <p style={{color: "red"}}>You do not have the required permissions</p>
    } else return null
}

export default PermissionsError;