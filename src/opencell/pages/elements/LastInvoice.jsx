import React from 'react';
import Time from 'react-time';
import FontAwesome from 'react-fontawesome';
import LastInvoiceDetail from "./LastInvoiceDetail.jsx";
import PayBill from "./PayBill.jsx";


class LastInvoice extends React.Component {
	
	render() {
		const {lastinvoice,preinvoices,nextInvoiceDate,subscription} = this.props;
		const {offerTemplate} = subscription || {};
		return <LastInvoiceDetail lastinvoice = {lastinvoice} preinvoices={preinvoices} nextInvoiceDate={nextInvoiceDate} superTopOffer={offerTemplate} {...this.props} />;
	}

}
export default LastInvoice;