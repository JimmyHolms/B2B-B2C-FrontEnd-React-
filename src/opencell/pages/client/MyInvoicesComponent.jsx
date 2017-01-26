import React from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {Modal} from 'react-bootstrap';


import MyContractsSidebar from '../elements/MyContractsSidebar.jsx';
import MyInvoices from '../elements/MyInvoices.jsx';
import ErrorDetail from '../elements/ErrorDetail.jsx';
import PageLoader from '../elements/PageLoader.jsx';

import InvoiceStore from '../../stores/InvoiceStore';
import SubscriptionStore from '../../stores/SubscriptionStore';
import BillingAccountStore from '../../stores/BillingAccountStore';
import CreatePaymentStore from '../../stores/CreatePaymentStore';

import {fetchSubscriptions, fetchSubscriptionByCode} from '../../actions/SubscriptionActions';
import {fetchMyInvoices, createMyPayment} from '../../actions/InvoiceActions';
import {fetchMyNextInvoiceDate} from '../../actions/BillingAccountAction'
class MyInvoicesComponent extends React.Component {
	constructor() {
		super();
		this.invs = null;
		this.lastinv = null;
		this.cust = null;
		this.state = {
			customer: null,
			invoices: null,
			nextbilldate:null,
			paymentCreateStatus:null,
			error: {},
			isLoading: false,
			showForm:false
		};
	}


	componentWillMount() {

		InvoiceStore.bindLoadHandler(this.renderLoader.bind(this));
		InvoiceStore.bindUpdateHandler(this.renderInvoices.bind(this));
		InvoiceStore.bindErrorHandler(this.renderError.bind(this));

		CreatePaymentStore.bindUpdateHandler(this.renderCreatePaymentStatus.bind(this));
		CreatePaymentStore.bindErrorHandler(this.renderError.bind(this));

		BillingAccountStore.bindLoadHandler(this.renderLoader.bind(this));
		BillingAccountStore.bindUpdateHandler(this.renderNextInvoiceDate.bind(this));
		BillingAccountStore.bindErrorHandler(this.renderError.bind(this));

		SubscriptionStore.bindLoadHandler(this.renderLoader.bind(this));
		SubscriptionStore.bindUpdateHandler(this.renderOffer.bind(this));
		SubscriptionStore.bindErrorHandler(this.renderError.bind(this));
	}

	componentWillUnmount() {

		InvoiceStore.unbindLoadHandler(this.renderLoader.bind(this));
		InvoiceStore.unbindUpdateHandler(this.renderInvoices.bind(this));
		InvoiceStore.unbindErrorHandler(this.renderError.bind(this));

		CreatePaymentStore.unbindUpdateHandler(this.renderCreatePaymentStatus.bind(this));
		CreatePaymentStore.unbindErrorHandler(this.renderError.bind(this));

		BillingAccountStore.unbindLoadHandler(this.renderLoader.bind(this));
		BillingAccountStore.unbindUpdateHandler(this.renderNextInvoiceDate.bind(this));
		BillingAccountStore.unbindErrorHandler(this.renderError.bind(this));

		SubscriptionStore.unbindLoadHandler(this.renderLoader.bind(this));
		SubscriptionStore.unbindUpdateHandler(this.renderOffer.bind(this));
		SubscriptionStore.unbindErrorHandler(this.renderError.bind(this));

	}

	createMyBillPayment(lastinv_num,inv_array,amount){
		this.setState({showForm:true});
		createMyPayment(lastinv_num,inv_array,amount);
	}
	componentDidMount() {
		const {subscriptionCode} = this.props.routeParams;
		if (subscriptionCode && subscriptionCode.trim() !== '') {
			fetchSubscriptionByCode(subscriptionCode);
		} else {
			fetchSubscriptions();
		}
		fetchMyNextInvoiceDate();
		fetchMyInvoices();
	}

	shouldComponentUpdate(nextProps,nextState){
		const {paymentCreateStatus} = nextState;
		const shouldUpdate = this.props.location.pathname !== nextProps.location.pathname;
		if(shouldUpdate){
			const {subscriptionCode} = nextProps.routeParams;
			if (subscriptionCode && subscriptionCode.trim() !== '') {
				fetchSubscriptionByCode(subscriptionCode);
			} else {
				fetchSubscriptions();
			}
		}
		return true;
	}

	createNotification(type){
		   switch (type) {
			case 'SUCCESS':
			  NotificationManager.success('', 'Payment Successfully finished.',2500);
			  break;
			case 'FAIL':
			  NotificationManager.error('','Your payment action failed.', 2500);
			  break;
		      }
	};
	setLoadingBar() {
		const {showForm} = this.state;
		if(showForm==true)
		{
			return (
				<div className="modal-backdrop fade in" >
					<div className="loader"></div>
				</div>
			);
		}
		return "";
	}
	renderCreatePaymentStatus(response)
	{
		const {showForm} = this.state;
		if (showForm == true)
		{
			this.setState({showForm:false});
		}
		const {status} = response;
		const {data} = response;
		if(status == "SUCCESS")
		{
			this.invs = data;
		}
		this.setState({paymentCreateStatus:status,invoices: this.invs});
		this.createNotification(status);
		
	}
	renderNextInvoiceDate(nextbilldate)
	{
		if(this.invs==null  || this.cust ==null)
		{
			this.setState({
				nextbilldate,
				isLoading: true,
				error: null});
		}else
		{
			this.setState({
				nextbilldate,
				isLoading: false,
				error: null});
		}
	}
	renderInvoices(invoices) {
		this.invs = invoices;
		if( this.cust==null)
		{
			this.setState({
			isLoading: true,
			invoices: this.invs,
			customer:this.cust,
			error: null});
		}else
		{
			this.setState({
			isLoading: false,
			invoices: this.invs,
			customer:this.cust,
			error: null});
		}

	}

	renderOffer(customer) {
		this.cust = customer;
		if(this.invs==null )
		{
			this.setState({
			isLoading: true,
			invoices:this.invs,
			customer:this.cust,
			error: null});
		}else
		{
			this.setState({
			isLoading: false,
			invoices:this.invs,
			customer:this.cust,
			error: null});
		}

	}


	renderError(error) {
		this.setState({
			isLoading: false,
			customer: null,
			error,
			invoices: null,
			paymentCreateStatus: null,
			nextbilldate : null
		});
	}

	renderLoader() {
		this.setState({
			isLoading: true,
			customer: null,
			error: null,
			invoices: null,
			paymentCreateStatus: null,
			nextbilldate:null
		});
	}

	renderDetail() {
		const {isLoading, invoices,customer, nextbilldate, error} = this.state;

		if (isLoading) {
			return <PageLoader page="My Bills"/>;
		}

		if (error) {
			return <ErrorDetail error={error}/>;
		}

		return <MyInvoices invoices={invoices}   customer={customer} nextInvoiceDate={nextbilldate}  onCreatePayment={this.createMyBillPayment.bind(this)} {...this.props} />;
	}

	render() {
		return (
			<div className="container-fluid">
				<div className="row">
					<NotificationContainer className="notification-container" />
					<MyContractsSidebar customer={this.state.customer} loading={this.state.isLoading}/>
					<div className="col-md-9">
						{this.renderDetail()}
						{this.setLoadingBar()}
					</div>
				</div>
			</div>
		);
	}

}

module.exports = MyInvoicesComponent;
