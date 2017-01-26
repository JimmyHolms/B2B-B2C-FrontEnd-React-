import React from 'react';
import Time from 'react-time';
import {Modal} from 'react-bootstrap';
import ItemContainer from './ItemContainer.jsx';

class PurchaseDetail extends React.Component {
	constructor() {
		super();
		this.state = {
			showForm: false
		}
	}

	selectForPurchases() {
		this.setState({
			showForm: true
		});
	}

	revertChanges() {
		this.setState({
			showForm: false,
		});
	}

	displayPurchasesPopup() {
		const {showForm} = this.state;
		return (
			<Modal show={showForm}>
				<Modal.Header closeButton>
					<Modal.Title>Purchase details</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Bla.. Bla.. Bla.. Bla..
 				</Modal.Body>
				<Modal.Footer>
					<button className="btn btn-warning" onClick={this.revertChanges.bind(this)}>Cancel</button>
				</Modal.Footer>
			</Modal>

		);
	}

	render() {
		return (
			<ItemContainer className="row">
				<div className="col-md-11 col-sm-9 col-xs-6">
					<div className="row">
						<div className="col-sm-6 text-left">
							<a onClick={this.selectForPurchases.bind(this)}>&gt; Consult purchases</a>
						</div>
					</div>
				</div>
				{this.displayPurchasesPopup()}
			</ItemContainer>
		);
	}
}

export default PurchaseDetail;