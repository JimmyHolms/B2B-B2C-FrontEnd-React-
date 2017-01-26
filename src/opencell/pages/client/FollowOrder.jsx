import React from "react";
import MyContractsSidebar from "../elements/MyContractsSidebar.jsx";
import ErrorDetail from "../elements/ErrorDetail.jsx";
import PageLoader from "../elements/PageLoader.jsx";
import OrderActivations from "../elements/OrderActivations.jsx";
import SubscriptionStore from "../../stores/SubscriptionStore";
import {fetchSubscriptions} from "../../actions/SubscriptionActions";
import OrderTrackingStore from "../../stores/OrderTrackingStore";
import {trackOrder, listPendingOrders} from "../../actions/OrderTrackingActions";

class FollowOrder extends React.Component {

	constructor() {
		super();
		this.state = {
			orderNumber: '',
			customer: {},
			orders: [],
			error: null,
			isLoading: false,
			isSearching: false
		};
	}

	componentWillMount() {
		SubscriptionStore.bindLoadHandler(this.renderLoader.bind(this));
		SubscriptionStore.bindUpdateHandler(this.renderOffer.bind(this));
		SubscriptionStore.bindErrorHandler(this.renderError.bind(this));

		OrderTrackingStore.bindLoadHandler(this.renderLoader.bind(this));
		OrderTrackingStore.bindUpdateHandler(this.renderOrders.bind(this));
		OrderTrackingStore.bindErrorHandler(this.renderError.bind(this));
	}

	componentWillUnmount() {
		SubscriptionStore.unbindLoadHandler(this.renderLoader.bind(this));
		SubscriptionStore.unbindUpdateHandler(this.renderOffer.bind(this));
		SubscriptionStore.unbindErrorHandler(this.renderError.bind(this));

		OrderTrackingStore.unbindLoadHandler(this.renderLoader.bind(this));
		OrderTrackingStore.unbindUpdateHandler(this.renderOrders.bind(this));
		OrderTrackingStore.unbindErrorHandler(this.renderError.bind(this));
	}

	componentDidMount() {
		fetchSubscriptions();
		listPendingOrders();
	}

	shouldComponentUpdate() {
		const {orderNumber, isSearching} = this.state;
		if (isSearching && !!orderNumber && orderNumber.trim().length > 0) {
			this.setState({
				isSearching: !isSearching
			});
		}
		return true;
	}

	componentDidUpdate() {
		const {orderNumber, isSearching} = this.state;
		if (isSearching) {
			if (!!orderNumber && orderNumber.trim().length > 0) {
				trackOrder(this.state.orderNumber);
			} else {
				listPendingOrders();
			}
		}
	}

	changeOrderNumber(event) {
		const orderNumber = event.target.value;
		this.setState({
			orderNumber: orderNumber,
			isSearching: true
		});
	}

	search() {
		trackOrder(this.state.orderNumber);
	}

	renderOrders(orders) {
		this.setState({
			orders,
			isLoading: false,
			isSearching: false,
			error: null
		});
	}

	renderOffer(customer) {
		this.setState({
			isLoading: false,
			customer,
			error: null
		});
	}

	renderError(error) {
		this.setState({
			isLoading: false,
			error
		});
	}

	renderLoader() {
		this.setState({
			isLoading: true,
			error: null
		});
	}

	renderDetail() {
		const {isLoading, error, orders} = this.state;

		if (isLoading) {
			return <PageLoader page="My Account"/>;
		}

		if (error) {
			return <ErrorDetail error={error}/>;
		}

		return (
			<div>
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">Follow Order</h3>
					</div>
					<div className="panel-body">
						<form className="input-group" onSubmit={this.search.bind(this)}>
							<span className="input-group-addon"><strong>Access code or order number</strong></span>
							<input id="orderNumber" type="text" className="form-control" value={this.state.orderNumber}
								   onChange={this.changeOrderNumber.bind(this)}/>
							<div className="input-group-btn">
								<button type="submit" className="btn btn-primary">Go!</button>
							</div>
						</form>
					</div>
				</div>
				<OrderActivations orders={orders}/>
			</div>
		);
	}

	render() {
		return (
			<div className="container-fluid">
				<div className="row">
					<MyContractsSidebar customer={this.state.customer} loading={this.state.isLoading}/>
					<div className="col-md-9">
						{this.renderDetail()}
					</div>
				</div>
			</div>
		)
	}
}

module.exports = FollowOrder;
