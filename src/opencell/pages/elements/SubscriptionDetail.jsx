import React from 'react';
import {Link} from 'react-router';

import OfferDetail from "./OfferDetail.jsx";
import ActiveService from "./ActiveService.jsx";

import * as properties from '../../../properties';

class SubscriptionDetail extends React.Component {
	render() {
		const {subscription} = this.props;
		const {services = []} = subscription;

		return (
			<div className="col-md-12">
				<OfferDetail {...this.props} />
				<div className="panel panel-default">
					<div className="panel-heading">
						<h2 className="panel-title">Your offer details</h2>
					</div>
					<div className="panel-body">
						{services.map(service => <ActiveService service={service} key={service.code} {...this.props} />)}
						<div className="row">
							<div className="col-md-6"></div>
							<div className="text-right col-md-6">
								<Link to={properties.my_options_url + "/" + subscription.code}
									  className="btn btn-theme-default">Get additional options</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default SubscriptionDetail;