import React from 'react';
import Time from 'react-time';
import FontAwesome from 'react-fontawesome';
import {withRouter} from 'react-router';
import * as properties from '../../../properties';

@withRouter
class LastInvoiceDetail extends React.Component {
	
	createPayment_b2b() {
		const {lastinvoice,preinvoices} = this.props;
		let occmatch_array = [];
		occmatch_array.push(lastinvoice.invoiceNumber);
		preinvoices.forEach(function(item,index){
			let recordedInvoiceDto = item.recordedInvoiceDto;
			let matchingStatus = "0";
			if(recordedInvoiceDto != null)
			{
				matchingStatus = recordedInvoiceDto.matchingStatus;
			}
			if(matchingStatus!="L" && matchingStatus!="C")
			{
				occmatch_array.push(item.invoiceNumber);
			}
		});
		this.props.onCreatePayment(lastinvoice.invoiceNumber,occmatch_array, lastinvoice.netToPay);
	}

	createPayment_b2c(){
		const {lastinvoice} = this.props;
		let occmatch_array = [];
		occmatch_array.push(lastinvoice.invoiceNumber);
		this.props.onCreatePayment(lastinvoice.invoiceNumber,occmatch_array, lastinvoice.amountWithTax);
	}

	setNextInvoiceDate(nextdate)
	{
		if(nextdate == null)
		{
			return "";
		}
		return (<Time value={nextdate} format="DD/MM/YYYY"/>);
	}

	showPdfDownloadLink(lastinvoice)
	{
		if(lastinvoice.pdf!=null)
		{
			return(<div>
					<a href={`data:application/force-download;charset=utf-16le;base64,${lastinvoice.pdf}`}  className="text-right" download={lastinvoice.invoiceNumber+".pdf"}> 
						<FontAwesome className='downloadbtn-shadow' name='file-pdf-o' size='2x' />&nbsp;&nbsp; Download
					</a>
				</div>);
		}
		return "";
	}
	setSuperOfferName(superTopOffer)
	{
		if(superTopOffer!=null)
		{
			let name = superTopOffer.description;
			return name;
		}
		return "Super Top Offer";
	}
	gotoMyAccountsPage(){
		this.props.router.push(properties.my_account_url);
	}

	render() {
		const {lastinvoice,nextInvoiceDate,superTopOffer} = this.props;
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<h2 className="panel-title">Your last bills</h2>
				</div>
				<div className="lastbill-body panel-body">
					<div className="col-sm-12">
						<div><label className="supertop-offer mediumfont-size">{this.setSuperOfferName(superTopOffer)}</label></div>
						<div><label className="nextbill-date normalfont-size">Next bill on {this.setNextInvoiceDate(nextInvoiceDate)} </label></div>
					</div>
					<div className="text-left col-sm-3">
						<div className="bill-render-file">
							<img src="./images/file-image.png" className="bill-img"/>
							<div className="bill-pdf-data">
								<div>
									<label className="mediumfont-size">€{lastinvoice.amountWithTax}</label>
								</div>
								{this.showPdfDownloadLink(lastinvoice)}
							</div>
						</div>
						<br/>
					</div>
					<div className="text-left col-sm-9 no-padding-left">
						<div className="row">
							<div className="info-padding col-sm-1 no-padding-left">
								<img src="./images/notification.png" className="img-info"/>
							</div>
							<div className="col-sm-11 no-padding-left">
								<div className="col-sm-12 no-padding-left">
									<label className="normalfont-size"> Autopay on <Time value={lastinvoice.dueDate} format="DD/MM/YYYY" />  of € {lastinvoice.netToPay}</label><br/>
								</div>
								<div className="col-sm-12 paybtn-div no-padding-left">
									<ul className="list-unstyled">
										<li>
											<a onClick={this.createPayment_b2c.bind(this)}>
												<button type="button" className="btn btn-theme-default" >Pay now if your payment is rejected</button>
											</a>
										</li>
										<li>
											<button type="button" className="btn btn-theme-default" onClick={this.gotoMyAccountsPage.bind(this)}>Change your payment information</button>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div className="col-sm-12">
						<div className="help-body">
							<h2><img src="./images/help.png" className="img-info"/>  Help</h2>
							<div className="row">
								<div className="col-sm-1"></div>
								<div className="col-sm-11 no-padding-left">
									<h2 className="panel-title"><a href="#">Understand my bill</a></h2>
									<h2 className="panel-title"><a href="#">Payment method</a></h2>
									<h2 className="panel-title"><a href="#">What if my bill is paid</a></h2>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

}
export default LastInvoiceDetail;
