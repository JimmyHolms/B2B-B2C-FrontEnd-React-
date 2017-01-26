import React from 'react';
import ReactImageFallback from "react-image-fallback";

class ActiveService extends React.Component {
	render() {
		const { service = {} } = this.props;
		return (
			<div className="row">
				<div className="col-md-1 col-sm-3 col-xs-6 no-padding-right">
					<ReactImageFallback src={service.image} fallbackImage="./images/service_default.png" className="thumbnail img-thumbnail img-service" />
				</div>
				<div className="col-md-11 col-sm-9 col-xs-6 no-padding-left">
					<div className="row">
						<div className="col-md-12"><h5>{service.description}</h5></div>
					</div>
				</div>
			</div>
		);
	}
}

export default ActiveService;
