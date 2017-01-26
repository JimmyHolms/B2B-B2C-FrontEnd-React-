import React from 'react';
import Time from 'react-time';
import { Link } from 'react-router';

import UsageOfferDetail from "./UsageOfferDetail.jsx";
import OverUsageDetail from "./OverUsageDetail.jsx";
import PurchaseDetail from "./PurchaseDetail.jsx";
import UsageServiceDetail from "./UsageServiceDetail.jsx";

import * as properties from '../../../properties';

class UsageDetail extends React.Component {
	render() {
		const { customerAccount, billingAccount, subscription, chargeAggregate } = this.props;
		const { services = [] } = subscription;
		let now = new Date();
		return (
			<div className="col-md-12">
				<UsageOfferDetail {...this.props} />
				{chargeAggregate.map(chargeAgg => <UsageServiceDetail chargeAggregat={chargeAgg}  {...this.props} /> )}
			</div>
		);
	}
}

export default UsageDetail;
