import React from 'react';

class ErrorDetail extends React.Component {
	render() {
		const { error } = this.props;
		return (
			<div className="well">
				<div className="row">
					<div className="col-md-2 col-sm-3 col-xs-6">
						<img src={error.image} className="img-thumbnail" />
					</div>
					<div className="col-md-10 col-sm-9 col-xs-6">
						<div className="short-div">{error.code}</div>
						<div className="short-div">{error.message}</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ErrorDetail;