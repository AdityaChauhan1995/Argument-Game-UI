import React from 'react';
import { Grid, Button, Header, Segment, Icon } from "semantic-ui-react";


const CompletedRequests = ({myrequests, downloadedFile, downloadFile}) => {
  return (
    <Segment basic style={{ padding: 0, paddingTop: 10 }}>
      <Header as='h4' className='highlight'>Ready to download ({myrequests.length})</Header>

      <Grid style={{ padding: 15, paddingRight: 40 }}>
        {myrequests.map(item =>
          <Grid.Row key={item._id} style={{ paddingBottom: 5, borderBottom: '1px solid rgba(117, 118, 120, 0.1)' }}>
            <Grid.Column width={4} style={{ padding: 0 }}>
              <Header as='h5' style={{ padding: 0, margin: 0 }}>{item.reportName}</Header>
              <div style={{ color: '#757678', fontSize: 13 }}>{item.reportType}</div>
            </Grid.Column>
            <Grid.Column width={4} style={{ padding: 0 }}>
              <Icon name="clock" style={{ color: '#757678' }} size='large' />
              <span style={{ color: '#757678', fontSize: 13 }}>{item.createdDate}</span>
            </Grid.Column>
            <Grid.Column width={4} style={{ padding: 0 }}>
              <Icon name="alarm" style={{ color: '#757678' }} size='large' />
              <span style={{ color: '#757678', fontSize: 13 }}>{item.completedDate}</span>
            </Grid.Column>
            <Grid.Column width={4} style={{ padding: 0 }}>
          
            { 
              item.downloadUrl!=="SYSTEM_ERROR"?
            
              <Button primary floated='right' onClick={() => { downloadFile(item.downloadUrl) } }>DOWNLOAD</Button>
              :
                <Button color='red' floated='right' onClick={() => { alert("Some error Occured while downloading the file. Please contact ISD team") } }>FAILED</Button>
              
            }
           
            </Grid.Column>
          </Grid.Row>
        )}
      </Grid>
    </Segment>
  )
}

export default CompletedRequests;