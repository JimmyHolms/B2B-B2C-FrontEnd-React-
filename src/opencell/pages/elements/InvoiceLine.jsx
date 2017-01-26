import React from 'react';
import Time from 'react-time';
import FontAwesome from 'react-fontawesome';
import {Modal} from 'react-bootstrap';

class InvoiceLine extends React.Component {
	constructor() {
		super();
		this.state = {
			showForm: false
		}
	}

	selectPaymentConfirm() {
		this.setState({
			showForm: true
		});
	}

	revertChanges() {
		this.setState({
			showForm: false
		});
	}

	displayPaymentConfirmPopup() {
		const {showForm} = this.state;
		return (
			<Modal show={showForm} className="payment-confirm">
				<Modal.Header closeButton onClick={this.revertChanges.bind(this)}>
					<Modal.Title>Payment Notice</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Do you want to pay?
 				</Modal.Body>
				<Modal.Footer>
					<button className="btn btn-primary" onClick={this.createPayment.bind(this)}>OK </button>
					<button className="btn btn-primary" onClick={this.revertChanges.bind(this)}>Cancel</button>
				</Modal.Footer>
			</Modal>

		);
	}

	createPayment() {
		this.setState({
			showForm: false
		});
		const {invoice} = this.props;
		let occmatch_array = [];
		occmatch_array.push(invoice.invoiceNumber);
		this.props.onCreatePayment(invoice.invoiceNumber,occmatch_array, invoice.amountWithTax);
	}

	setPaymentState(state,duedate)
	{
		if(state=="L" || state=="C")
		{
			return( <FontAwesome className="verify" name="check-circle" size='2x' /> );
		}else
		{
			let cur_date = Math.floor(Date.now());

			if(cur_date > duedate)
			{
				return( <FontAwesome className="unverify" name="exclamation-circle" size='2x' /> );
			}
			return( <FontAwesome className="search verify-glass" name="search" size='2x' /> );
		}
	}
	showPdfDownloadLink(invoice)
	{
		if(invoice.pdf!=null)
		{
			return (<a href={`data:application/force-download;charset=utf-16le;base64,${invoice.pdf}`} download={invoice.invoiceNumber+".pdf"}>
						<FontAwesome className="downloadbtn-shadow" name="file-pdf-o" size='2x'/>
				</a>);
		}
		return "";
	}
	showCreatePayment(matchingStatus)
	{
		if(matchingStatus=="L" || matchingStatus=="C")
		{
			return "";
		}

		return (<button className="btn btn-primary" onClick={this.selectPaymentConfirm.bind(this)}>PAY NOW </button>);
	}
	render() {
		const {invoice} = this.props;
		let recordedInvoiceDto = invoice.recordedInvoiceDto;
		let matchingStatus = "0";
		if(recordedInvoiceDto != null)
		{
			matchingStatus = invoice.recordedInvoiceDto.matchingStatus;
		}
		return (
			<div className="row invoice-line">
				<div className="text-left col-sm-3 invoice-tbltime"><Time value={invoice.invoiceDate} format="MMM YY"/></div>
				<div className="text-left col-sm-3">€ {invoice.amountWithTax}</div>
				<div className="text-left col-sm-2">{this.setPaymentState(matchingStatus,invoice.dueDate)}</div>
				<div className="text-left col-sm-2">{this.showCreatePayment(matchingStatus)}</div>
				<div className="text-right col-sm-2 invoice-tbldownload">
					{this.showPdfDownloadLink(invoice)}
				</div>
				{this.displayPaymentConfirmPopup()}
			</div>
		);
	}
}

export default InvoiceLine;
