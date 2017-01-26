import React from 'react';
import ReactImageFallback from "react-image-fallback";

class ServiceCardGroup extends React.Component {

	render() {
		const {services = []} = this.props;

		return (
			<div className="row equal service-card-group">
				{services.map(service => {
					const rowClass = "row " + ((!!service.longDescription && service.longDescription.trim() !== "") ? "" : "full-width");
					return (
						<div className="col-lg-6" key={service.code}>
							<div className={rowClass}>
								<div className="col-lg-2 col-md-3 col-sm-3">
									<ReactImageFallback src={service.image} fallbackImage="./images/service_default.png" className="img-thumbnail img-service"/>
								</div>
								<div className="col-lg-10 col-md-9 col-sm-9">
									<div className="row">
										<div className="col-md-12"><strong>{service.description}</strong></div>
									</div>
									<div className="row">
										<div className="col-md-12">
											<div dangerouslySetInnerHTML={{__html: service.longDescription}}/>
										</div>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		);
	}
}

export default ServiceCardGroup;
