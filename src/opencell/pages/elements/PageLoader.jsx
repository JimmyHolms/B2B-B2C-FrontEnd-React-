import React from 'react';

class PageLoader extends React.Component {
	render() {
		const { page } = this.props;
		return (
			<div className="col-md-12">
				<div className="row">
					<div className="col-md-2 col-sm-3 col-xs-6">
						<img src="./images/page_loading.gif" className="thumbnail img-thumbnail" />
					</div>
					<div className="col-md-10 col-sm-9 col-xs-6">
						<h1>Loading {page} page...</h1>
					</div>
				</div>
			</div>
		);
	}
}

export default PageLoader;