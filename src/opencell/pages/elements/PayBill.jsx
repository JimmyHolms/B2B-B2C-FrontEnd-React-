import React from 'react';
import Time from 'react-time';

class PayBill extends React.Component {
	createPayment() {
		const {invoice} = this.props;
		this.props.onCreatePayment(invoice.invoiceNumber, invoice.amountWithTax);
	}

	render() {
		const {invoice} = this.props;
		let now = new Date();
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<h2 className="panel-title">Pay my bill</h2>
				</div>
				<div className="panel-body pay-billbody">
					<div className="row">
						<div className="col-sm-7">
							<h2 className="panel-title">Contract for Super Top Offer</h2>
							<h2 className="panel-title">Bill for <Time value={now} format="YYYY/MM/DD" /></h2>
							<h2 className="panel-title">123456789</h2>
						</div>
						<div className="col-sm-5">
							<h2>${invoice.amountWithTax}</h2>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-7">
							<h2>Account balance</h2>
						</div>
						<div className="col-sm-5">
							<h2>$</h2>
						</div>
					</div>
					<div className="row pull-right ">
						<button type="button" onClick={this.createPayment.bind(this)} className="btn btn-primary right-element"> Proceed to Payment </button>
					</div>
				</div>
			</div>
		);
	}

}
export default PayBill;
