import React from 'react';
import ReactImageFallback from "react-image-fallback";
import Time from 'react-time';
import moment from 'moment';

import {Modal} from 'react-bootstrap';

class ServiceInstance extends React.Component {
	constructor() {
		super();
		this.state = {
			showForm: false,
			showWarning: false,
			terminationDate: moment().utc().format()
		}
	}

	selectForTermination() {
		this.setState({
			showWarning: true
		});
	}

	closeDialogWithoutSaving() {
		this.setState({
			showWarning: false
		});
	}

	confirmTermination() {
		const {parent, serviceInstance, subscription} = this.props;
		const data = Object.assign({}, serviceInstance);
		parent.terminationHandler(subscription, data);
		this.setState({
			showForm: false,
			showWarning: false
		});
	}

	displayTerminationConfirmation() {
		const {terminationDate, showWarning} = this.state;
		const {serviceInstance} = this.props;
		return (
			<Modal show={showWarning}>
				<Modal.Header>
					<Modal.Title>Confirm Termination</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<h5>Confirm option details</h5>
					<p>You are about to terminate subscription to the {serviceInstance.description} option.</p>
					<p>Termination Date: <Time value={terminationDate} format="YYYY-MM-DD"/>
					</p>
				</Modal.Body>
				<Modal.Footer>
					<button className="btn btn-danger" onClick={this.closeDialogWithoutSaving.bind(this)}>Cancel
					</button>
					{' '}
					<button className="btn btn-theme-default" onClick={this.confirmTermination.bind(this)}>OK</button>
				</Modal.Footer>
			</Modal>
		);
	}

	displayTerminateLink() {
		const {serviceInstance} = this.props;
		if (serviceInstance.mandatory) {
			return (
				<div className="row">
					<div className="col-md-12"><h5>{serviceInstance.description}</h5></div>
				</div>
			);
		}

		return (
			<div className="row">
				<div className="col-sm-6"><h5>{serviceInstance.description}</h5></div>
				<div className="col-sm-6 text-right">
					<a onClick={this.selectForTermination.bind(this)}>Terminate &gt;</a>
				</div>
			</div>
		);

	}

	render() {
		const {serviceInstance} = this.props;
		return (
			<div className="row">
				<div className="col-md-1 col-sm-3 col-xs-6 no-padding-right">
					<ReactImageFallback src={serviceInstance.image} fallbackImage="./images/service_default.png" className="thumbnail img-thumbnail img-service"/>
				</div>
				<div className="col-md-11 col-sm-9 col-xs-6 no-padding-left">
					{this.displayTerminateLink()}
				</div>
				{this.displayTerminationConfirmation()}
			</div>
		);
	}
}

export default ServiceInstance;
