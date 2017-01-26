import React from 'react';

class OfferCardGroup extends React.Component {
	
	beginSubscription(subscription, offer){
		const {parent} = this.props;
		parent.renderSubscriptionForm(subscription, offer);
	}

	render() {
		const {group = [], subscription} = this.props;

		return (
			<div className="row equal offer-list">
				{group.map(offer => {
					return (
						<div className="col-md-4" key={offer.code}>
							<div className="panel panel-default">
								<div className="panel-body text-center">
									<div className="row">
										<h1>{offer.name}</h1>
									</div>
									<ul className="list-unstyled">
										{offer.offerServices.map(service => {
											return (
												<li className="list-item" key={service.code}>
													<div className="row">{service.description}</div>
													{/*<hr style={{width:'80%'}}/>*/}
												</li>
											);
										})}
									</ul>
									<a className="btn btn-theme-default" onClick={this.beginSubscription.bind(this, subscription, offer)}>Get Started</a>
								</div>
							</div>
						</div>
					);
				})}

			</div>
		);
	}
}

export default OfferCardGroup;