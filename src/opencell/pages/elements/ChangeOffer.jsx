import React from 'react';
import {Link} from 'react-router';

import * as properties from  '../../../properties';

export default class ChangeOffer extends React.Component {
	render() {
		const {show, subscription} = this.props;
		if (show) {
			return (
				<div className="col-md-12">
					<div className="panel panel-default">
						<div className="panel-body">
							<div className="row">
								<div className="text-left col-md-6">Do you want to change your offer?</div>
								<div className="text-right col-md-6">
									<Link to={properties.available_offers_url + "/" + subscription.code}
										  className="text-right btn btn-theme-default see-all-offers-btn">See all our offers</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
		return null;
	}
}