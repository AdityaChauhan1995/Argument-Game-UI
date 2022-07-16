import React from 'react';
import { Segment, Icon } from 'semantic-ui-react';

const Footer = ({
  ...props
}) => {
  
  return (
  	<Segment basic className='footer'>
      <div className='message'>
        <Icon name='copyright'/>
        All rights reserved
      </div>
    </Segment>
  )
}

export default Footer;