import React from 'react';
import { Grid, Header, Segment, Icon, Progress } from "semantic-ui-react";

const PendingRequests = ({myrequests,calcProgress}) => {
  return(
    <Segment basic style={{padding: 0, paddingTop: 10}}>
        <Header as='h4' className='highlight'>Pending Requests ({myrequests.length})</Header>
        <Grid style={{padding: 15, paddingRight: 40}}>
        {myrequests.map(item =>
          <Grid.Row key={item._id} style={{paddingBottom: 5, borderBottom:'1px solid rgba(117, 118, 120, 0.1)'}}>
            <Grid.Column width={4} style={{padding:0}}>
              <Header as='h5' style={{padding:0, margin:0}}>{item.reportName}</Header>
              <div style={{color: '#757678', fontSize: 13}}>{item.reportType}</div>
            </Grid.Column>
            <Grid.Column width={4} style={{padding:0}}>
              <Icon name="clock" style={{color: '#757678'}} size='large'/>
              <span style={{color: '#757678', fontSize: 13}}>{item.createdDate}</span>
            </Grid.Column>
            <Grid.Column width={4}>
             <Progress percent= {calcProgress(item.createdDate,item.estimatedDuration)}  size='tiny' /> 
            </Grid.Column>
          </Grid.Row>
        )}
      </Grid>
    </Segment>
  )
}

export default PendingRequests;