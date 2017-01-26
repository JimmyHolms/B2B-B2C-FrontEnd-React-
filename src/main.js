import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, IndexRedirect, hashHistory} from 'react-router'

import * as properties from  './properties';

var MainComponent = require('./opencell/pages/MainComponent.jsx');

var IndexComponent = require('./opencell/pages/public/IndexComponent.jsx');
var LoginComponent = require('./opencell/pages/public/LoginComponent.jsx');
var SignupComponent = require('./opencell/pages/public/SignupClientComponent.jsx');
var ForgotPasswordComponent = require('./opencell/pages/public/ForgotPasswordComponent.jsx');
var ResetPasswordComponent = require('./opencell/pages/public/ResetPasswordComponent.jsx');
var ContactComponent = require('./opencell/pages/public/ContactComponent.jsx');
var HowitworksComponent = require('./opencell/pages/public/HowitworksComponent.jsx');
var AboutUsComponent = require('./opencell/pages/public/AboutUsComponent.jsx');
var FaqComponent = require('./opencell/pages/public/FaqComponent.jsx');
var VerifyEmailComponent = require('./opencell/pages/public/VerifyEmailComponent.jsx');
var Guest = require('./opencell/pages/public/Guest.jsx');

var ProfilClientComponent = require('./opencell/pages/client/ProfilClientComponent.jsx');
var Dashboard = require('./opencell/pages/client/Dashboard.jsx');
var MyUsageComponent = require('./opencell/pages/client/MyUsageComponent.jsx');
var MyOffers = require('./opencell/pages/client/MyOffers.jsx');
var MyInvoicesComponent = require('./opencell/pages/client/MyInvoicesComponent.jsx');
var SearchResult = require('./opencell/pages/client/SearchResult.jsx');
var MyOptions = require('./opencell/pages/client/MyOptions.jsx');
var MyAccount = require('./opencell/pages/client/MyAccount.jsx');
var AvailableOffers = require('./opencell/pages/client/AvailableOffers.jsx');
var FollowOrder = require('./opencell/pages/client/FollowOrder.jsx');
var OfferCancellation = require('./opencell/pages/client/OfferCancellation.jsx');

render((
	<Router onUpdate={() => window.scrollTo(0, 0)} history={hashHistory}>
		<Route component={MainComponent}>
			<IndexRoute component={Guest}/>
			<Route path="/" component={Guest}/>
			{/*<Route path={properties.about_url} component={Guest} />*/}

			<Route path={properties.index_url} component={Guest}/>
			<Route path={properties.faq_url} component={FaqComponent}/>
			<Route path={properties.email_verification_url} component={VerifyEmailComponent}/>
			<Route path={properties.how_it_works_url} component={HowitworksComponent}/>
			<Route path={properties.about_url} component={AboutUsComponent}/>
			<Route path={properties.signin_url} component={LoginComponent}/>
			<Route path={properties.signup_url} component={SignupComponent}/>
			<Route path={properties.forgot_password_url} component={ForgotPasswordComponent}/>
			<Route path={properties.reset_password_url} component={ResetPasswordComponent}/>
			<Route path={properties.contact_url} component={ContactComponent}/>

			<Route path={properties.client_profil_url} component={ProfilClientComponent}/>
			<Route path={properties.dashboard_url} component={Dashboard}/>
			<Route path={properties.search_url} component={SearchResult}/>
			<Route path={properties.my_usage_url} component={MyUsageComponent}/>
			<Route path={properties.my_usage_url + "/:subscriptionCode"} component={MyUsageComponent}/>
			<Route path={properties.my_offers_url} component={MyOffers}/>
			<Route path={properties.my_offers_url + "/:subscriptionCode"} component={MyOffers}/>
			<Route path={properties.my_bills_url} component={MyInvoicesComponent}/>
			<Route path={properties.my_bills_url + "/:subscriptionCode"} component={MyInvoicesComponent}/>
			<Route path={properties.my_options_url} component={MyOptions}/>
			<Route path={properties.my_options_url + "/:subscriptionCode"} component={MyOptions}/>
			<Route path={properties.available_offers_url} component={AvailableOffers}/>
			<Route path={properties.available_offers_url + "/:subscriptionCode"} component={AvailableOffers}/>
			<Route path={properties.offer_cancellation_url} component={OfferCancellation}/>
			<Route path={properties.offer_cancellation_url + "/:subscriptionCode"} component={OfferCancellation}/>
			<Route path={properties.my_account_url} component={MyAccount}/>
			<Route path={properties.follow_order_url} component={FollowOrder}/>

		</Route>
	</Router>
), document.getElementById('selfcare'));
