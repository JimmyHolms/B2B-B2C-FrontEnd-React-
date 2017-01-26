import React from 'react';
import Time from 'react-time';

import CommunicationSubDetail from './CommunicationSubDetail.jsx'

class CommunicationDetail extends React.Component {
	
	render() {
		const {usage} = this.props;
		let listSubCatUsage = [];
		if(Array.isArray(usage.listSubCatUsage))
		{
			listSubCatUsage = usage.listSubCatUsage;
		}
		let now = new Date();
		return (
			<div className="col-sm-12">
				<div className="panel panel-default">
					<div className="subcategory-header panel-heading">
						<h5><strong> - {usage.description} </strong> </h5>
					</div>
					<div className="panel-body">
						{listSubCatUsage.map(subcat => <CommunicationSubDetail subusage={subcat}></CommunicationSubDetail> )}
					</div>
				</div>
			</div>
		);
	}
}

export default CommunicationDetail;