import React from 'react';
import Time from 'react-time';

import Accordion from './Accordion.jsx';
import ItemContainer from './ItemContainer.jsx';

class UsageServiceDetail extends React.Component {
	getSumSubCategory(subcatlist)
	{
		var sublistarray = subcatlist.listUsage;
		var sum = 0;
		if(Array.isArray(sublistarray))
		{
			sublistarray.forEach(function(item,index){
				sum = sum + item.amountWithoutTax;
			});
		}
		return (Math.round(sum * 100) / 100);
	}
	getQuantityCategory(subcatlist)
	{
		var sublistarray = subcatlist.listUsage;
		var sum = 0;
		if(Array.isArray(sublistarray))
		{
			sublistarray.forEach(function(item,index){
				sum = sum + item.quantity;
			});
		}
		return (Math.round(sum * 100) / 100);
	}
	render() {
		const {chargeAggregat} = this.props;
		//console.log(chargeAggregat);
		let listChargeAggregate = [];
		if(Array.isArray(chargeAggregat.listChargeAggregate))
		{
			listChargeAggregate = chargeAggregat.listChargeAggregate;
		}
		//console.log(listChargeAggregate);
		let now = new Date();
		return (
			<div className="panel panel-default">
				<div className="panel-body">

					<div className="row">
						<div className="col-md-12">
							<Accordion>
								{listChargeAggregate.map(subusage => <ItemContainer triggerText={subusage.description}>
									On <Time value={now} format="YYYY/MM/DD HH:mm" />
									<div>Used {subusage.quantity}  {subusage.amount}</div>
									</ItemContainer> )}
							</Accordion>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default UsageServiceDetail;
