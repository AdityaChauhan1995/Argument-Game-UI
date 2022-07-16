import React, { Component } from "react";
import { Segment, Button, Label } from "semantic-ui-react";
import LoadingDimmer from "./loading-dimmer";

//redux
import { connect } from 'react-redux';
import { doLogout } from '../actions/UserActions';
import { doGetReports } from '../actions/ReportActions';

class NavBar extends Component {

	constructor(props){
		super(props);
		this.state = {
			loading: false,
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.LOGOUT_STATUS === 'SUCCESS') {
			this.setState({ loading: false });
			this.props.reset();
		} 
		else if (this.props.GET_REPORT_STATUS !== 'SUCCESS' && nextProps.GET_REPORT_STATUS === 'SUCCESS') {
			this.setState({ loading: false });
			this.props.navigate('/standard-report-selection');
		}		
	}

	goNewReport = () =>{
		this.setState({ loading: true });
		this.props.doGetReports(this.props.sessionId);		//pass sessionId
	}

	logout = () => {
		this.setState({ loading: true });
		this.props.doLogout(this.props.sessionId);
	}

	render() {
		const {loading} = this.state;
		const { index, name, navigate } = this.props;
		return (
			<Segment basic className='header'>
				<div className='brand'>
					<span className='brandHighlight'>UCCS</span> Reporting
				</div>
				<div className='menu'>
					<Label basic as='a'
						onClick={this.goNewReport}
						className={index === 1 ? 'itemActive' : 'item'}>
						NEW REPORT
					</Label>
					<span className='seperator'>|</span>
					<Label basic as='a'
						onClick={() => navigate('/my-requests')}
						className={index === 2 ? 'itemActive' : 'item'}>
						MY REQUESTS
					</Label>
					<span className='seperator'>|</span>
					<Label basic as='a'
					onClick={() => navigate('/scheduled-report')}
					className={index === 3 ? 'itemActive' : 'item'}>
						Scheduled Report 
					</Label>
				</div>
				<div style={{ flex: 1 }} />
				<div className='welcomeMessage'>
					Welcome, <span className='highlight'>{name}</span>
				</div>
				<Button onClick={this.logout} basic size='small' className='secondaryButton'>LOGOUT</Button>
				<LoadingDimmer active={loading} />
			</Segment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		sessionId: state.user.data.sessionId,
		name: state.user.data.name,
		LOGOUT_STATUS: state.user.meta.LOGOUT_STATUS,
		GET_REPORT_STATUS: state.report.meta.GET_REPORT_STATUS,
	}
}

const mapDispatchToProps = {
	doLogout,
	doGetReports
}

//export default NavBar;
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);