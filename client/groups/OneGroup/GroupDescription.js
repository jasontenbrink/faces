import React from 'react'
import TextField from 'material-ui/TextField'

const titleStyle = {
    alignSelf: 'flex-end',
    fontWeight: 300
}

const GroupDescription = ({style, isDisabled, description}) => {
    console.log('description', isDisabled, description)
    if(isDisabled){
        return <h1 
                    style={{...style, ...titleStyle}}
                >
                {description}</h1>
    }
    else {
        return <TextField 
            name="description" 
            value={description} 
            style={{...style, alignSelf: 'flex-end'}} />

    }
}

export default GroupDescription;