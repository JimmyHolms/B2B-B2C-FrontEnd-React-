import React, {Component} from 'react';
import {Link} from 'react-router'

import * as properties from  '../../../properties';

class IndexComponent extends Component{
  render() {
    return (
			<div>
				<section className="section1 text-center section-backg">
					<div className="container">
						<div className="row">
							<div className="col-sm-12">
								<h3 className="text-primary">
									Create your personal space and <span>visualize your invoices</span>
								</h3>
								<div className="btn-wrap-inner">
									<Link className="btn-start" to={properties.signup_url}>Start</Link>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="section2 text-center">
					<div className="container">
						<ul className="landing-categories list-unstyled clearfix">
							<li className="col-sm-6 col-md-4 col-lg-3">
								<a className="category-item" href="/cat/developers/">
									<span className="front">
										<i className="category-icon category-developers"></i>
									</span>
									<span className="category-title">Admin acces</span>
									<span className="back">
										Administration<br />
										<br />
										<em>an more...</em>
									</span>
								</a>
							</li>
						</ul>
						<div className="clear"></div>
					</div>
				</section>

				<section className="feature-section ">
					<div className="contentRow smart_bi">
						<div className="container">
							<div className="col-sm-3 fact statistics-content ">
								<div className="counter-box">
									<h3><span className="counter">+100</span></h3>
									<h5>Customers</h5>
								</div>
							</div>
							<div className="col-sm-3 fact statistics-content ">
								<div className="counter-box">
									<h3><span className="counter">5</span></h3>
									<h5>Years of service</h5>
								</div>
							</div>
							<div className="col-sm-3 fact statistics-content ">
								<div className="counter-box">
									<h3><span className="counter">10</span>+</h3>
									<h5>Professionals</h5>
								</div>
							</div>
							<div className="col-sm-3 fact statistics-content ">
								<div className="counter-box">
									<h3><span className="counter">100</span>%</h3>
									<h5>Satisfied customers</h5>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="section3 text-center clearfix">
					<h2 className="container-title">Choose ideal plan for your budget</h2>
					<div id="monthly">
						<div className="col-sm-12 pricing_table col-md-5">
							<div className="m0 inner">
								<h4 className="pricing_title">Entreprise</h4>

								<div className="row m0 pricing_price">
									<div className="row m0 round_box">
										<div className="price_inner"><span className="price">0€</span><br />
											per month
										</div>
									</div>
								</div>

								<ul className="list-unstyled feature">
									<li className="fa fa fa-check-circle">Open source</li>
									<li className="fa fa-times-circle">Community Support via forum</li>
								</ul>
								<a className="purchase_btn" href="http://google.com">Choose</a>
							</div>
						</div>
						<div className="col-sm-12 pricing_table col-md-5 col-md-offset-2">
							<div className="m0 inner">
								<h4 className="pricing_title">Enterprise</h4>

								<div className="row m0 pricing_price">
									<div className="row m0 round_box">
										<div className="price_inner"><span className="price">90€</span><br />
											per month
										</div>
									</div>
								</div>

								<ul className="list-unstyled feature">
									<li className="fa fa fa-check-circle">bug fix with SLA</li>
									<li className="fa fa-check-circle">Support</li>
									<li className="fa fa-check-circle">Upgrade scripts</li>
								</ul>
								<a className="purchase_btn" href="http://google.com">Choose</a>
							</div>
						</div>
						{/*<div className="clear"></div>*/}
					</div>
				</section>

				<section className="section4">
					<div className="container">
						<div className = "row">
							<div className="col-md-6  text-center">
								<div>
									<img src="images/1.jpg" alt="Design offers tailored for your buiness." className="img-responsive"/>
								</div>
							</div>
							<div className="col-md-6  text-left">
								<div className="description-div">
									<h2 className="section-title">
										Design offers tailored
										<br />
										for your buiness
									</h2>
									<p className="section-description">
										Get amazing results working with our catalog designers and get help form our experts.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="section6">
					<div className="container">
						<div className = "row">
							<div className="col-md-6 text-left">
								<div className="description-div">
									<h2 className="section-title">
										Monetize your
										<br />
										online business
									</h2>
									<p className="section-description">
									   Create priceplans, bundles, etc.
									</p>
								</div>
							</div>
							<div className="col-md-6 text-center pull-left">
								<div>
									<img src="images/2.jpg" alt="Monetize your online business." className="img-responsive"/>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="section8">
					<div className="container">
						<div className = "row">
							<div className="col-md-6 text-center">
								<div>
									<img src="images/3.jpg" alt="Collect payments and monitor dunning process." className="img-responsive"/>
								</div>
							</div>
							<div className="col-md-6 text-left">
								<div className="description-div">
									<h2 className="section-title">
										<span>Collect </span>
										<span>payments</span>
									</h2>
									<p className="section-description">
									Collect payments and monitor dunning process.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="section10 text-center">
					<h2 className="container-title">
						Open your account today
					</h2>
					<div className="btn-wrap">
						<Link to={properties.signup_url} className="btn-start">START</Link>
					</div>
				</section>
			</div>

		);
	}
}

module.exports = IndexComponent;
