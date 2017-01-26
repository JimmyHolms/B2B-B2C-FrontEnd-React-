import React from 'react';
import Time from 'react-time';
import moment from 'moment';

class OrderActivations extends React.Component {

	render() {
		const {orders = []} = this.props;
		const hasOrders = orders && orders.length > 0;

		if (hasOrders) {
			return (
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">Follow Activation</h3>
					</div>
					<div className="panel-body">
						{orders.map(order => {
							return (
								<div className="row" key={order.id}>
									<div className="col-md-4">{order.id}</div>
									<div className="col-md-4">{order.description}</div>
									<div className="col-md-2"><Time value={moment.utc(order.statusDate).valueOf()} format="DD-MM-YYYY"/></div>
									<div className="col-md-2">{order.state}</div>
								</div>
							);
						})}
					</div>
				</div>
			);
		}
		return null;
	}
}

export default OrderActivations;

