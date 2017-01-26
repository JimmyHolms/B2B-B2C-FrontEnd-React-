import React from 'react';
import Time from 'react-time';
import * as properties from '../../../properties';

class PaymentActivityLine extends React.Component {
	setTransactionDate(transactionDate)
	{
		if(transactionDate == null)
		{
			transactionDate="";
			return "";
		}
		return (<Time value={transactionDate} format="DD/MM/YYYY" />);
	}
	setDueDate(dueDate)
	{
		if(dueDate == null)
		{
			return "";
		}
		return (<Time value={dueDate} format="DD/MM/YYYY" />);
	}

	render() {
		const { payment } = this.props;				
		return (
			<tr>
				<td>{payment.paymentMethod}</td>
				<td>{this.setTransactionDate(payment.transactionDate)}</td>
				<td>{this.setDueDate(payment.dueDate)}</td>
				<td>{payment.amount}</td>
			</tr>
		);
	}
}

export default PaymentActivityLine;