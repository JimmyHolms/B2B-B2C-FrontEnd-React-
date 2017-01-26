import React from 'react';
import Time from 'react-time';

class CommunicationSubListDetail extends React.Component {
	
	setDate(date)
	{
		if(date==null)
		{
			return "";
		}
		return (<Time value={date} format="YYYY/MM/DD HH:mm" />);
	}
	round2Digit(amount)
	{
			return (Math.round(amount * 100) / 100);
	}
	setUnitDescription(usageitem)
	{
		if(usageitem.unityDescription == null)
		{
			return "";
		}
		return "("+usageitem.unityDescription+")";
	}
	render() {
		const {usageitem} = this.props;
		
		
		return (
			<div className="row col-sm-12 usageline">
				<div className="col-sm-3"><strong> {this.setDate(usageitem.dateEvent)} </strong></div>
				<div className="col-sm-3"><strong> {usageitem.description} </strong></div>
				<div className="col-sm-1"><strong>€ {this.round2Digit(usageitem.unitAmountWithoutTax)}</strong> </div>
				<div className="col-sm-2"><strong> {this.round2Digit(usageitem.quantity)} {this.setUnitDescription(usageitem)}</strong> </div>
				<div className="col-sm-2"><strong>€ {this.round2Digit(usageitem.amountWithoutTax)} </strong> </div>
			</div>
		);
	}
}

export default CommunicationSubListDetail;