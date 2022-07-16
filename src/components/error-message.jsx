import React from 'react'
import { Label } from 'semantic-ui-react';

const ErrorMessage = ({errorMessage}) => {
    return (

        errorMessage.length > 0 &&
        <Label basic color='red'>{errorMessage}</Label>

    )
}

export default ErrorMessage