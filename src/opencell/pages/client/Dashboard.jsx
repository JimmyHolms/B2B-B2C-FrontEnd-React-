import React from 'react';
import {Link} from 'react-router';
import {Modal} from 'react-bootstrap';

import DashboardDetails from '../elements/DashboardDetails.jsx';
import ErrorDetail from '../elements/ErrorDetail.jsx';
import SubscriptionStore from '../../stores/SubscriptionStore';
import {fetchSubscriptions,createSubscription} from '../../actions/SubscriptionActions';
import {getOfflineOffer} from '../../actions/OfferActions';

import * as properties from '../../../properties';

class Dashboard extends React.Component {

    constructor() {
        super();
        this.state = {
            customer: {},
	    showSubscribeConfirm:false,
	    guestOffer:{},
	    guestServices:[],
            error: {},
            isLoading: false
        };
    }

    componentWillMount() {
        SubscriptionStore.bindLoadHandler(this.renderLoader.bind(this));
        SubscriptionStore.bindUpdateHandler(this.renderOffer.bind(this));
        SubscriptionStore.bindErrorHandler(this.renderError.bind(this));
    }

    componentWillUnmount() {
        SubscriptionStore.unbindLoadHandler(this.renderLoader.bind(this));
        SubscriptionStore.unbindUpdateHandler(this.renderOffer.bind(this));
        SubscriptionStore.unbindErrorHandler(this.renderError.bind(this));
    }

    componentDidMount() {
        fetchSubscriptions();
	let offlinedata = getOfflineOffer();
	if(offlinedata != "")
	{
		this.setState({showSubscribeConfirm:true,guestOffer:offlinedata.offer,guestServices:offlinedata.services});
	}else
	{
		this.setState({showSubscribeConfirm:false});
	}
    }
    subscribeToOffer()
    {
	const {guestOffer, guestServices} = this.state;
	let subscription = null;
	createSubscription(guestOffer, guestServices,subscription);
    }
    showMessageAlert(message) {
		this.setState({
			alert: {
				icon: 'fa fa-4x fa-info-circle',
				header: 'Notice',
				message
			},
			showSubscribeConfirm:false
		});
    }

    clearAlert() {
		this.setState({
			alert: null
		});
    }

    displayMessage() {
		const {alert} = this.state;
		if (alert) {
			return (
				<Modal show={true}>
					<Modal.Header>
						<Modal.Title>{alert.header}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="row">
							<div className="col-sm-2"><i className={alert.icon}/></div>
							<div className="col-sm-10"><h4>{alert.message}</h4></div>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<button className="btn btn-theme-default" onClick={this.clearAlert.bind(this)}>OK</button>
					</Modal.Footer>
				</Modal>
			);
		}
		return null;
    }
    displayConfirmation() {
	const {showSubscribeConfirm, guestOffer, guestServices} = this.state;
	const selectedServices = [];
	guestServices.forEach(svc => {
		if (svc.selected) {
			selectedServices.push(svc);
		}
	});
	if (showSubscribeConfirm) {
		return (
			<Modal show={showSubscribeConfirm}>
				<Modal.Header>
					<Modal.Title>Subscription Confirmation</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="row">
						<div className="col-sm-2"><i className="fa fa-4x fa-info-circle"/></div>
						<div className="col-sm-10">
							<div className="row">
								<h4>You are about to subscribe to the following offer:</h4>
							</div>
							<div className="row">
								Offer: {guestOffer.name}
							</div>
							<div className="row">
								<ul className="list-unstyled options-list">
									{selectedServices.length > 0 ? <span>Options</span> : null}
									{selectedServices.map(selectedService =>
										<li key={selectedService.code}>{selectedService.description}</li>
									)}
								</ul>
							</div>
						</div>
					</div>

				</Modal.Body>
				<Modal.Footer>
					<button className="btn btn-danger" onClick={this.closeConfirmationWithoutSaving.bind(this)}>
						Cancel
					</button>
					{' '}
					<button className="btn btn-theme-default" onClick={this.subscribeToOffer.bind(this)}>OK</button>
				</Modal.Footer>
			</Modal>
		);
	}
	return null;
    }
    closeConfirmationWithoutSaving() {
	this.setState({
		error: null,
		isLoading: false,
		showSubscribeConfirm: false
	});
    }
    renderOffer(customer) {
	const {message} = customer;
	if (message) {
		this.showMessageAlert(message);
	}
        this.setState({isLoading: false, customer ,error: null});
    }

    renderError(error) {
        this.setState({isLoading: false, customer: null, error});
    }

    renderLoader() {
        this.setState({isLoading: true, customer: null, error: null});
    }

    renderDetail() {
        const {isLoading, customer, error} = this.state;

        if (isLoading) {
            return <div className="col-xs-12 text-info">
                Loading offer details...
            </div>;
        }

        if (error) {
            return <ErrorDetail error={error}/>;
        }

        return <DashboardDetails customer={customer} {...this.props} />;
    }

    render() {
        return (
            <div id="home" className="container-fluid dashboard-container">
		{this.displayMessage()}
		{this.displayConfirmation()}
                <div className="row">
                    <div>
                        <div className="col-md-2">
                            <div className="img-ratio"></div>
                        </div>

                        <div className="col-md-7">
							<p>
							  ➤ Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.<br/>
							  ➤ Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words<br/> 
							  ➤ The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. Lorem Ipsum used since the 1500s is reproduced.<br/>
							</p>
                        </div>

                        <div className="col-md-3">
                            {this.renderDetail()}
                            <Link to={properties.my_usage_url}>
                                <button className="btn btn-lg btn-theme-default col-xs-12">
                                    <i className="fa fa-area-chart pull-left"/> Usage & consumption
                                </button>
                            </Link>

                            <Link to={properties.my_bills_url}>
                                <button className="btn btn-lg btn-theme-default col-xs-12">
                                    <i className="fa fa-file-text-o pull-left"/> My bills
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 thumbnail-wrapper">
                        <div className="thumbnail">
                            <div className="text-center">
				<img src="./images/dashboard/dash1.png" />
			    </div>

                            <div className="caption">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint explicabo dolores
                                    ipsam aliquam inventore corrupti eveniet quisquam quod totam laudantium
                                    repudiandae obcaecati ea consectetur debitis velit facere nisi expedita vel.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 thumbnail-wrapper">
                        <div className="thumbnail">
                            <div className="text-center">
				<img src="./images/dashboard/dash2.png" />
			    </div>

                            <div className="caption">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint explicabo dolores
                                    ipsam aliquam inventore corrupti eveniet quisquam quod totam laudantium
                                    repudiandae obcaecati ea consectetur debitis velit facere nisi expedita vel.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 thumbnail-wrapper">
                        <div className="thumbnail">
                            <div className="text-center">
				<img src="./images/dashboard/dash3.png" />
			    </div>

                            <div className="caption">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint explicabo dolores
                                    ipsam aliquam inventore corrupti eveniet quisquam quod totam laudantium
                                    repudiandae obcaecati ea consectetur debitis velit facere nisi expedita vel.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = Dashboard;
