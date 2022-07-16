import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const LoadingDimmer = ({active}) => {
    return (
        <Dimmer active={active} page>
            <Loader>Loading</Loader>
        </Dimmer>
    )
}

export default LoadingDimmer;