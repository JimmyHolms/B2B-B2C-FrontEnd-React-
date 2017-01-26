import React from 'react';
import Time from 'react-time';

import CommunicationSubListDetail from './CommunicationSubListDetail.jsx';

class CommunicationSubDetail extends React.Component {
	
	render() {
		const {subusage} = this.props;
		let listSubUsage = [];
		if(Array.isArray(subusage.usage))
		{
			listSubUsage = subusage.usage;
		}
		return (
			<div className="col-sm-12 Collapsible">
				<h6 className="Collapsible__trigger"> <strong> {subusage.description} </strong> </h6>
				{listSubUsage.map(usage => <CommunicationSubListDetail usageitem={usage}> </CommunicationSubListDetail>) }
			</div>
		);
	}
}

export default CommunicationSubDetail;