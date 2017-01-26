import React from 'react';
import Time from 'react-time';
import { Link } from 'react-router';

import OfferDetail from "./OfferDetail.jsx";
import OfferSubscriptions from "./ActiveService.jsx";

import * as properties from '../../../properties';

class InvoiceDetail extends React.Component {
	render() {
		const { customerAccount, billingAccount, subscription } = this.props;
		const { services = [] } = subscription;
		
		return (
			<div className="col-md-12">
				<OfferDetail {...this.props} />
				<div className="row">
					<div className="panel panel-default">
						<div className="panel-heading">
							<h2 className="panel-title">Your last bill</h2>
						</div>
						<div className="panel-body">
							{services.map(service => <OfferSubscriptions service = {service} key = {service.code} {...this.props} />)}
							<div className="row">
								<div className="col-md-6"></div>
								<div className="text-right col-md-6">
									<Link to={properties.my_options_url} className="btn btn-primary">Get additional options</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default InvoiceDetail;