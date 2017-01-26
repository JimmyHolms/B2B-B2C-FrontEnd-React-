import React from 'react';
import {Link} from 'react-router';

import * as properties from '../../../properties';
import {Modal} from 'react-bootstrap';
import UsageDetail from "./UsageDetail.jsx";
import CommunicationDetail from "./CommunicationDetail.jsx";

class MyUsageDetails extends React.Component {

	constructor() {
		super();
		this.state = {
			showForm: false
		}
	}

	selectForOverUsage() {
		this.setState({
			showForm: true
		});
	}

	revertChanges() {
		this.setState({
			showForm: false
		});
	}

	displayOverUsagePopup() {
		const {showForm} = this.state;
		const {usages} = this.props;
		return (
			<Modal show={showForm} >
				<Modal.Header >
					<button type="button" aria-label="Close" className="close" onClick={this.revertChanges.bind(this)}><span aria-hidden="true">×</span></button>
					<Modal.Title> <strong> Usage Details </strong> <span className="text-right" onClick={this.revertChanges.bind(this)} ><i class="fa fa-times"></i></span> </Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="row">
						{usages.map(usage => <CommunicationDetail usage = {usage}> </CommunicationDetail>)}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<button className="btn btn-theme-default" onClick={this.revertChanges.bind(this)}>OK</button>
				</Modal.Footer>
			</Modal>

		);
	}
	renderCommunicationDetails(){
		const { customerAccount } = this.props.customer;
		var usages= this.props.usages;
		const { billingAccount } = customerAccount;
		const { subscriptions = [] } = billingAccount.userAccount;
		if (usages.length>0 && subscriptions.length>0){
			return(
				<div className="col-md-12">
					<div className="panel panel-default">
						<div className="panel-body">
							<div className="row">
								<div className="text-left col-md-6">See Usage details</div>
								<div className="text-right col-md-6">
									<a onClick={this.selectForOverUsage.bind(this)} className="text-right btn btn-theme-default" >Show details</a>
									{this.displayOverUsagePopup()}
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
	renderUsagePanel()
	{
		const { customerAccount } = this.props.customer;
		const { billingAccount } = customerAccount;
		const { subscriptions = [] } = billingAccount.userAccount;
		var usages =  this.props.usages;
		var chargeAggregate =  this.props.chargeAggregate;
		//console.log(chargeAggregate);
		if(subscriptions.length>0)
		{
			if(chargeAggregate.length>0)
			{
				return (<div>{ subscriptions.map(subscription => <UsageDetail customerAccount = {customerAccount} billingAccount = {billingAccount} subscription = {subscription} chargeAggregate={chargeAggregate} key= {subscription.code} {...this.props} />)}</div>);
			}else
			{
				return(
					<div className="panel-msg-info nousage">
						<h1>You have no Usage information yet   <i className="fa fa-2x fa-smile-o" aria-hidden="true"></i></h1>
					</div>
				);
			}
		}else
		{
			return(
				<div className="panel-msg-info">
					<Link to={properties.available_offers_url}><h1>You have no contract, go to the shop first <i className="fa fa-2x fa-smile-o" aria-hidden="true"></i></h1></Link>
				</div>
			);
		}
	}
	render() {


		return (
			<div className="row">
				{this.renderUsagePanel()}
				{this.renderCommunicationDetails()}
			</div>
		);
	}
}

export default MyUsageDetails;
