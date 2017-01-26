import React from 'react';
import ReactImageFallback from "react-image-fallback";

class Service extends React.Component {

	selectForSubscription() {
		const{subscription, service, parent} = this.props;
		parent.displaySubscribeForm(subscription, service);
	}


	render() {
		const {service} = this.props;
		return (
			<div className="row">
				<div className="col-md-1 col-sm-3 col-xs-6">
					<ReactImageFallback src={service.image} fallbackImage="./images/service_default.png" className="thumbnail img-thumbnail img-service"/>
				</div>
				<div className="col-md-11 col-sm-9 col-xs-6 no-padding-left">
					<div className="row">
						<div className="col-sm-6"><h5>{service.description}</h5></div>
						<div className="col-sm-6 text-right">
							<a onClick={this.selectForSubscription.bind(this)}>Subscribe &gt;</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Service;
