import React from 'react';
import {Link} from 'react-router';

import * as properties from '../../../properties';
import InvoiceLine from "./InvoiceLine.jsx";
import LastInvoiceDetail from "./LastInvoice.jsx";
import PaymentActivityLine from "./PaymentActivityLine.jsx";
import LastInvoice from './LastInvoice.jsx'

class MyInvoices extends React.Component {
	renderPreviousBills(){
		const { invoices } = this.props;
		if (invoices.length>0) {
			var newinvoices = [];
			var length = invoices.length;
			invoices.forEach(function(item,index){
				 if ( index == (length - 1) ){
				 } else {
					newinvoices.push(item);
				 }
			});
			return(
				<div className="panel panel-default">
					<div className="panel-heading">
						<h2 className="panel-title">Your previous bills</h2>
					</div>
					<div className="panel-body">
						{newinvoices.map(inv => <InvoiceLine invoice = {inv} key={inv.invoiceId} {...this.props} />)}
					</div>
				</div>
			);
		}
	}

	/*renderLastPayments(){
		const { paymentActivities } = this.props;
		if (paymentActivities.length > 0) {
			return(
				<div className="row">
					<div className="panel panel-default">
						<div className="panel-heading">
							<h2 className="panel-title">Last payment activities</h2>
						</div>
						<div className="panel-body">
							<table className="table table-striped">
									<thead>
										<tr>
											<th>Payment Method</th>
											<th>Date</th>
											<th>Due date</th>
											<th>Amount</th>
										</tr>
									</thead>
									<tbody>
										{paymentActivities.map(pay => <PaymentActivityLine payment = {pay}  {...this.props} />)}
									</tbody>
							</table>
						</div>
					</div>
				</div>
			);
		}
	}*/



	render() {

		const {customerAccount} = this.props.customer || {};
		const {billingAccount} = customerAccount || {};
		const {userAccount} = billingAccount || {};
		const {subscriptions = []} = userAccount || {};
		const [ subscription ] = subscriptions || [];
		const { invoices, nextInvoiceDate } = this.props;
		var lastinvs = [];
		var newinvoices = [];
		var length = invoices.length;
		invoices.forEach(function(item,index){
		   if ( index == (length - 1) ){
		    lastinvs.push(item);
		   } else {
				newinvoices.push(item);
			 }
		});
		if(subscriptions.length>0)
		{
			if(length>0)
			{
				return (
					<div className="row">
						<div className="col-md-12">
							{lastinvs.map( lastinv => <LastInvoice lastinvoice={lastinv} subscription={subscription} preinvoices={newinvoices} nextInvoiceDate={nextInvoiceDate} {...this.props} /> ) }

							{this.renderPreviousBills()}

						</div>
					</div>
				);
			}else{
				return(
					<div className="panel-msg-info nobill">
						<h1>You have no bill yet  <i className="fa fa-2x fa-smile-o" aria-hidden="true"></i></h1>
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
}

export default MyInvoices;
