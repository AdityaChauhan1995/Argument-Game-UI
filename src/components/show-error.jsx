import React, {Component} from 'react';
import { Modal, Button } from 'semantic-ui-react';

class ErrorMessage extends Component{
    constructor(props){
        super(props);
        this.state = {
            modalOpen: false
        }
    }
    open = (type, message) => this.setState({ 
        modalOpen: true,
        errorType: type,
        errorMessage: message
    })
    close = () => this.setState({ modalOpen: false })

    render(){
        const {modalOpen, errorType, errorMessage} = this.state;
        return (
            <Modal size='mini' open={modalOpen} onClose={this.close}>
              <Modal.Header>{errorType}</Modal.Header>
              <Modal.Content>
                <p>{errorMessage}</p>
              </Modal.Content>
              <Modal.Actions>
                <Button negative onClick={this.close}>OK</Button>
              </Modal.Actions>
            </Modal>
        )
    }
}

export default ErrorMessage;