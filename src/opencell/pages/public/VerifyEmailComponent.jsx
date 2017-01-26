import React, {Component} from 'react'

class VerifyEmailComponent extends Component {

	constructor() {
		super();
		this.state = {
			loading : false
		}
	}

	send_verification(){

	}

	render() {
		return (
			<div className = "page-verify-email">
				<section>
					<div className="container">
						<div className="row">

							<div className="col-lg-12 text-center">
								<h2 className="section-title">Verify your email address to access to your account</h2>
								<hr />
							</div>
							<div className="col-xs-12 visible-xs text-center m-md-bottom">
				                    <img src="images/mail.png" alt="Check your email." width="100" />
				            </div>
							<img src="images/mail.png" alt="" className="col-md-2 col-sm-2 hidden-xs" />
							<div className="col-md-10 col-sm-10 col-xs-12 p-md-top">
								<p className="fs-lg fw-700 hidden-xs">
								    We just sent an email to your address: <span>{this.props.email}</span>
								</p>
								<p className="visible-xs text-center m-lg-bottom">
						            <span className="text-muted">We sent an email to:</span>
						            <br />
						            <span>{this.props.email}</span>
						            <br />
						            <span className="text-muted">Please click on the verification link in the email.</span>
						        </p>
								<button className = "btn btn-theme-default" onClick = {this.send_verification.bind(this)} >
									<i className = "fa fa-sent"></i>
									Resend verification email
								</button>
							</div>
						</div>
					</div>
				</section>
			</div>
		)
	}
};

module.exports = VerifyEmailComponent;
