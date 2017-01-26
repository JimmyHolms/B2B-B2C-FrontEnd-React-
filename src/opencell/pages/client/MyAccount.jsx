import React, {Component} from 'react';
import {render} from 'react-dom';
import {Router} from 'react-router';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import DatePicker from 'react-bootstrap-date-picker';

import ErrorDetail from '../elements/ErrorDetail.jsx';
import PageLoader from '../elements/PageLoader.jsx';
var FormLoaderIndicator = require('./../elements/FormLoaderIndicatorComponent.jsx');

import CustomerStore from '../../stores/CustomerStore';
import {getCurrentCustomer, updateCustomer, updateUser} from '../../actions/CustomerActions';

import * as properties from  '../../../properties';

class MyAccount extends Component {

    constructor() {
        super();
        this.state = {
            isLoading: false,
            error: null,
            success: null,
            customer: {},
            customerData: {},
            empty_required_field: {}
        }
    }

    componentWillMount() {
        CustomerStore.bindLoadHandler(this.renderLoader.bind(this));
        CustomerStore.bindUpdateHandler(this.renderCustomerInfo.bind(this));
        CustomerStore.bindErrorHandler(this.renderError.bind(this));
    }

    componentWillUnmount() {
        CustomerStore.unbindLoadHandler(this.renderLoader.bind(this));
        CustomerStore.unbindUpdateHandler(this.renderCustomerInfo.bind(this));
        CustomerStore.unbindErrorHandler(this.renderError.bind(this));
    }

    componentDidMount() {
        getCurrentCustomer();
    }

    renderCustomerInfo(customer) {
        this.setState({isLoading: false, customer, error: null, success: customer.success});

        const {customerAccount = []} = customer;
        const {name = []} = customerAccount;
        const {address = []} = customerAccount;
        const {contactInformation = []} = customerAccount;
        const {billingAccount = []} = customerAccount;
        const {bankCoordinates = []} = billingAccount;
        var state = this.state;

        state['customerData']['username'] = customer.code;

        state['customerData']['title'] = name.title;
        state['customerData']['first_name'] = name.firstName;
        state['customerData']['last_name'] = name.lastName;

        state['customerData']['email'] = contactInformation.email;
        state['customerData']['mobile'] = contactInformation.mobile;

        state['customerData']['address1'] = address.address1;
        state['customerData']['address2'] = address.address2;
        state['customerData']['zipcode'] = address.zipCode;
        state['customerData']['country'] = address.country;
        state['customerData']['city'] = address.city;

        state['customerData']['paymentMethod'] = customerAccount.paymentMethod;
        state['customerData']['mandateIdentification'] = customerAccount.mandateIdentification;

        if (customerAccount.mandateDate == null || customerAccount.mandateDate == 0 || customerAccount.mandateDate == "1970-01-01") {
            var today = new Date().toISOString();
            state['customerData']['mandateDate'] = today;
        } else {
            state['customerData']['mandateDate'] = customerAccount.mandateDate;
        }

        state['customerData']['electronicBilling'] = billingAccount.electronicBilling;
        state['customerData']['billingEmail'] = billingAccount.email;

        state['customerData']['bankCode'] = bankCoordinates.bankCode;
        state['customerData']['branchCode'] = bankCoordinates.branchCode;
        state['customerData']['accountNumber'] = bankCoordinates.accountNumber;
        state['customerData']['key'] = bankCoordinates.key;
        state['customerData']['bic'] = bankCoordinates.bic;
        state['customerData']['iban'] = bankCoordinates.iban;
        state['customerData']['accountOwner'] = bankCoordinates.accountOwner;
        state['customerData']['bankName'] = bankCoordinates.bankName;

        this.setState(state);
    }

    renderError(error) {
        this.setState({isLoading: false, customer: null, error});
    }

    renderLoader() {
        this.setState({isLoading: true, customer: null, error: null});
    }

    renderDetail(result) {
        const {isLoading, customer, error, success} = this.state;

        if (isLoading) {
            window.scrollTo(0, 0);
            return <PageLoader page="My account"/>;
        }

        if (error) {
            window.scrollTo(0, 0);
            return <ErrorDetail error={error}/>;
        }

        if (success) {
			return(<div className="notification notification-success">
					<div className="notification-message">
						Operation was successful.
					</div>
				</div>);
        }
    }

    change_mandateDate(value) {
        var state = this.state;
        state['customerData']['mandateDate'] = value;
        this.setState(state);
    }

    changeContent(name, e) {
        var state = this.state;
        state['customerData'][name] = e.target.value;
        this.setState(state);
    }

    changeElectronicBilling() {
        var state = this.state;
        if (document.getElementById("electronic_billing").checked) {
            state['customerData']['electronicBilling'] = true;
        } else {
            state['customerData']['electronicBilling'] = false;
        }
        this.setState(state);
    }

    renderCivilities() {
        var civilities = properties.list_civilities.map(function (val) {
            return (<option value={val}>{val}</option>);
        });
        return civilities;
    }

    renderCountries() {
        var countries = properties.list_countries.map(function (val) {
            return (<option value={val.code}>{val.description}</option>);
        });
        return countries;
    }

    renderPaymentMethods() {
        var payment_methods = properties.list_payment_methods.map(function (val) {
            return (<option value={val}>{val}</option>);
        });
        return payment_methods;
    }

    client_update(event) {
        event.preventDefault();
        var state = this.state;
        state['empty_required_field'] = [];
        var found_empty = false;
        var empty_field_description = [];

        let required_fields_list = [{
            id: "last_name",
            desc: "Last name"
        },
            {
                id: "first_name",
                desc: "First name"
            },
            {
                id: "email",
                desc: "Email"
            },
            {
                id: "address1",
                desc: "Address"
            },
            {
                id: "zipcode",
                desc: "Postcode"
            }];

        let bank_required_fields_list = [
            {
                id: "billing_email",
                desc: "Billing email"
            },
            {
                id: "bank_code",
                desc: "Bank code"
            },
            {
                id: "bank_branch",
                desc: "Bank branch"
            },
            {
                id: "account_number",
                desc: "Account number"
            },
            {
                id: "bank_key",
                desc: "Bank key"
            },
            {
                id: "bic",
                desc: "Bic"
            },
            {
                id: "iban",
                desc: "Iban"
            },
            {
                id: "account_owner",
                desc: "Account owner"
            },
            {
                id: "bank_name",
                desc: "Bank name"
            }
        ];

        let mandate_fields_list = [{
            id: "mandate_identification",
            desc: "Mandate identification"
        },
            {
                id: "mandate_date",
                desc: "Signature date"
            }
        ];

        required_fields_list.map(function (field) {
            var fieldVal = document.getElementById(field.id).value;
            if (fieldVal.length == 0 || fieldVal == 0) {
                found_empty = true;
                state['empty_required_field'][field.id] = "true";
                empty_field_description.push(field.desc);
            }
        });

        var payment_method_val = document.getElementById("payment_method").value;

        if (payment_method_val == "DIRECTDEBIT") {
            var mandateID = document.getElementById("mandate_identification").value;
            var mandateDate = document.getElementById("mandate_date").value;
            if (mandateID.length == 0 && mandateDate.length == 0) {
                bank_required_fields_list.map(function (bankField) {
                    var BankFieldVal = document.getElementById(bankField.id).value;
                    if (BankFieldVal.length == 0 || BankFieldVal == 0) {
                        found_empty = true;
                        state['empty_required_field'][bankField.id] = "true";
                        empty_field_description.push(bankField.desc);
                    }
                });
            } else {
                mandate_fields_list.map(function (mandateField) {
                    var mandateFieldVal = document.getElementById(mandateField.id).value;
                    if (mandateFieldVal.length == 0 || mandateFieldVal == 0) {
                        found_empty = true;
                        state['empty_required_field'][mandateField.id] = "true";
                        empty_field_description.push(mandateField.desc);
                    }
                });
            }
        }
        this.setState(state);

        if (found_empty) {
          var emptyFields = empty_field_description.map(function (empty_field){
            return(<div className="notification-message">The field {empty_field} is mandatory</div>);
          });

            document.getElementById("pageStatus").style.display = "none";
            window.scrollTo(0, 0);
            render(
                <div className="notification notification-error">
                    {emptyFields}
                </div>,
                document.getElementById("alert_msg")
            );
        } else {
            document.getElementById("pageStatus").style.display = "block";
            render(
                <div></div>,
                document.getElementById("alert_msg")
            );
            let customer_data = this.state.customerData;
            updateCustomer(customer_data);
        }

    }

    updateUserPassword(event) {
        event.preventDefault();
        //this.showLoading();
        let user_data = {};
        user_data.username = this.state.customerData.username;
        user_data.email = this.state.customerData.email;
        user_data.password = document.getElementById("password").value;
        updateUser(user_data);
    }

    render() {

        return (
            <div>
                <div id="pageStatus">
                    {this.renderDetail()}
                </div>
                <div id="alert_msg" className="myaccount-form-alert"></div>
                <div className={this.state.customerData == null ? "container-fluid hidden" : "container-fluid"}>
                    <div className="row">

                    </div>
                    <form method="post" onSubmit={this.client_update.bind(this)}
                          className="form-horizontal myaccount-form">
                        <div className="block-info">
                            <div className="row">
                                <div id="contract-holder" className="col-md-3 col-sm-12 col-xs-12">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h3 className="panel-title">Contract holder</h3>
                                        </div>
                                        <div className="panel-body">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label className="control-label requiredField" htmlFor="civility">
                                                        Civility
                                                        <span className="asteriskField">*</span>
                                                    </label>
                                                    <select className="form-control" value={this.state.customerData.title}
                                                            onChange={this.changeContent.bind(this, 'title')} name="civility">
                                                        {this.renderCivilities()}
                                                    </select>
                                                </div>

                                                <div
                                                    className={this.state.empty_required_field['last_name'] == "true" ? "form-group has-error" : "form-group"}>
                                                    <label className="control-label requiredField" htmlFor="last_name">
                                                        Last name
                                                        <span className="asteriskField">*</span>
                                                    </label>
                                                    <input className="form-control" value={this.state.customerData.last_name}
                                                           onChange={this.changeContent.bind(this, 'last_name')}
                                                           name="last_name" id="last_name" type="text"/>
                                                </div>

                                                <div
                                                    className={this.state.empty_required_field['first_name'] == "true" ? "form-group has-error" : "form-group"}>
                                                    <label className="control-label requiredField" htmlFor="first_name">
                                                        First name
                                                        <span className="asteriskField">*</span>
                                                    </label>
                                                    <input className="form-control" value={this.state.customerData.first_name}
                                                           onChange={this.changeContent.bind(this, 'first_name')}
                                                           name="first_name" id="first_name" type="text"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="contract-information" className="col-md-3 col-sm-12 col-xs-12">
                                    <div className="panel panel-default ">
                                        <div className="panel-heading">
                                            <h3 className="panel-title">Contact information</h3>
                                        </div>
                                        <div className="panel-body">
                                            <div className="col-md-12">
                                                <div
                                                    className={this.state.empty_required_field['email'] == "true" ? "form-group has-error" : "form-group"}>
                                                    <label className="control-label requiredField" htmlFor="email">
                                                        Email
                                                        <span className="asteriskField">*</span>
                                                    </label>
                                                    <input className="form-control" value={this.state.customerData.email}
                                                           onChange={this.changeContent.bind(this, 'email')}
                                                           name="email" id="email" type="text"/>
                                                </div>

                                                <div className="form-group">
                                                    <label className="control-label" htmlFor="mobile">
                                                        Mobile number
                                                    </label>
                                                    <input className="form-control" value={this.state.customerData.mobile}
                                                           onChange={this.changeContent.bind(this, 'mobile')} name="mobile"
                                                           type="text"/>
                                                </div>

                                                <div className={this.state.empty_required_field['address1'] == "true" ? "form-group has-error" : "form-group"}>
                                                    <label className="control-label requiredField" htmlFor="address1">
                                                        Address
                                                        <span className="asteriskField">*</span>
                                                    </label>
                                                    <input className="form-control" value={this.state.customerData.address1}
                                                           onChange={this.changeContent.bind(this, 'address1')}
                                                           name="address1" id="address1" type="text"/>
                                                </div>

                                                <div className="form-group">
                                                    <label className="control-label" htmlFor="address2">
                                                        Complementary address
                                                    </label>
                                                    <input className="form-control" value={this.state.customerData.address2}
                                                           onChange={this.changeContent.bind(this, 'address2')} name="address2"
                                                           type="text"/>
                                                </div>

                                                <div
                                                    className={this.state.empty_required_field['zipcode'] == "true" ? "form-group has-error" : "form-group"}>
                                                    <label className="control-label requiredField" htmlFor="zipcode">
                                                        Postcode
                                                        <span className="asteriskField">*</span>
                                                    </label>
                                                    <input className="form-control" value={this.state.customerData.zipcode}
                                                           onChange={this.changeContent.bind(this, 'zipcode')}
                                                           name="zipcode" id="zipcode" type="text"/>
                                                </div>

                                                <div className="form-group">
                                                    <label className="control-label requiredField" htmlFor="country">
                                                        Country
                                                        <span className="asteriskField">*</span>
                                                    </label>
                                                    <select className="form-control" value={this.state.customerData.country}
                                                            onChange={this.changeContent.bind(this, 'country')} name="country">
                                                        {this.renderCountries()}
                                                    </select>
                                                </div>

                                                <div className="form-group">
                                                    <label className="control-label" htmlFor="city">
                                                        City
                                                    </label>
                                                    <input className="form-control" value={this.state.customerData.city}
                                                           onChange={this.changeContent.bind(this, 'city')} name="city"
                                                           type="text"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="access" className="col-md-3 col-sm-12 col-xs-12">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h3 className="panel-title">Access</h3>
                                        </div>
                                        <div className="panel-body">
                                            <div className="col-md-12 content">
                                                <div className="form-group">
                                                    <label className="control-label" htmlFor="login">
                                                        Login
                                                    </label>
                                                    <input className="form-control" value={this.state.customerData.username}
                                                           name="login" type="text" readOnly/>
                                                </div>

                                                <div className="form-group">
                                                    <label className="control-label" htmlFor="password">
                                                        Password
                                                    </label>

                                                    <input className="form-control" name="password" id="password"
                                                           type="password"/>
                                                </div>

                                                <div className="form-group">
                                                    <div className="confirm_msg"></div>
                                                    <a className="btn btn-theme-default" onClick={this.updateUserPassword.bind(this)}>Update Password</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="electronic-payment-method" className="col-md-3 col-sm-12 col-xs-12">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h3 className="panel-title">Electronic payment method</h3>
                                        </div>
                                        <div className="panel-body">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label className="control-label" htmlFor="payment_method">
                                                        Payment method
                                                    </label>

                                                    <select className="form-control"
                                                            value={this.state.customerData.paymentMethod}
                                                            onChange={this.changeContent.bind(this, 'paymentMethod')}
                                                            name="payment_method" id="payment_method">
                                                        {this.renderPaymentMethods()}
                                                    </select>
                                                </div>
                                                <div
                                                    className={this.state.empty_required_field['mandate_identification'] == "true" ? "form-group has-error" : "form-group"}>
                                                    <label className="control-label" htmlFor="mandate_identification">
                                                        Mandate identification
                                                    </label>

                                                    <input className="form-control"
                                                           value={this.state.customerData.mandateIdentification}
                                                           onChange={this.changeContent.bind(this, 'mandateIdentification')}
                                                           name="mandate_identification" id="mandate_identification"
                                                           type="text"/>
                                                </div>

                                                <div className="form-group">
                                                    <label className="control-label" htmlFor="electronic_billing">
                                                        Electronic billing
                                                    </label>
                                                    <input className="form-control"
                                                           checked={this.state.customerData.electronicBilling ? "checked" : false}
                                                           onChange={this.changeElectronicBilling.bind(this)}
                                                           name="electronic_billing" id="electronic_billing" type="checkbox"/>
                                                </div>

                                                <div
                                                    className={this.state.empty_required_field['mandate_date'] == "true" ? "form-group has-error" : "form-group"}>
                                                    <label className="control-label" htmlFor="signature_date">
                                                        Signature date
                                                    </label>
                                                    <DatePicker dateFormat="DD/MM/YYYY"
                                                                value={this.state.customerData.mandateDate}
                                                                onChange={this.change_mandateDate.bind(this)}
                                                                name="mandate_date" id="mandate_date"/>
                                                </div>

                                                <div
                                                    className={this.state.empty_required_field['billing_email'] == "true" ? "form-group has-error" : "form-group"}>
                                                    <label className="control-label" htmlFor="billing_email">
                                                        Email
                                                    </label>
                                                    <input className="form-control" value={this.state.customerData.billingEmail}
                                                           onChange={this.changeContent.bind(this, 'billingEmail')}
                                                           name="billing_email" id="billing_email" type="email"/>
                                                </div>
                                                <div
                                                    className={this.state.empty_required_field['bank_code'] == "true" ? "form-group has-error" : "form-group"}>
                                                    <label className="control-label" htmlFor="bank_code">
                                                        Bank code
                                                    </label>
                                                    <input className="form-control" value={this.state.customerData.bankCode}
                                                           onChange={this.changeContent.bind(this, 'bankCode')}
                                                           name="bank_code" id="bank_code" type="text"/>
                                                </div>
                                                <div
                                                    className={this.state.empty_required_field['bank_branch'] == "true" ? "form-group has-error" : "form-group"}>
                                                    <label className="control-label" htmlFor="bank_branch">
                                                        Bank branch
                                                    </label>
                                                    <input className="form-control" value={this.state.customerData.branchCode}
                                                           onChange={this.changeContent.bind(this, 'branchCode')}
                                                           name="bank_branch" id="bank_branch" type="number"/>
                                                </div>
                                                <div
                                                    className={this.state.empty_required_field['account_number'] == "true" ? "form-group has-error" : "form-group"}>
                                                    <label className="control-label" htmlFor="account_number">
                                                        Account number
                                                    </label>
                                                    <input className="form-control" value={this.state.customerData.accountNumber}
                                                           onChange={this.changeContent.bind(this, 'accountNumber')}
                                                           name="account_number" id="account_number" type="text"/>
                                                </div>
                                                <div
                                                    className={this.state.empty_required_field['bank_key'] == "true" ? "form-group has-error" : "form-group"}>
                                                    <label className="control-label" htmlFor="bank_key">
                                                        Key
                                                    </label>
                                                    <input className="form-control" value={this.state.customerData.key}
                                                           onChange={this.changeContent.bind(this, 'key')}
                                                           name="bank_key" id="bank_key" type="number"/>
                                                </div>
                                                <div
                                                    className={this.state.empty_required_field['bic'] == "true" ? "form-group has-error" : "form-group"}>
                                                    <label className="control-label" htmlFor="bic">
                                                        BIC
                                                    </label>
                                                    <input className="form-control" value={this.state.customerData.bic}
                                                           onChange={this.changeContent.bind(this, 'bic')}
                                                           name="bic" id="bic" type="text"/>
                                                </div>
                                                <div
                                                    className={this.state.empty_required_field['iban'] == "true" ? "form-group has-error" : "form-group"}>
                                                    <label className="control-label" htmlFor="iban">
                                                        IBAN
                                                    </label>
                                                    <input className="form-control" value={this.state.customerData.iban}
                                                           onChange={this.changeContent.bind(this, 'iban')}
                                                           name="iban" id="iban" type="text"/>
                                                </div>
                                                <div
                                                    className={this.state.empty_required_field['account_owner'] == "true" ? "form-group has-error" : "form-group"}>
                                                    <label className="control-label" htmlFor="account_owner">
                                                        Account owner
                                                    </label>
                                                    <input className="form-control" value={this.state.customerData.accountOwner}
                                                           onChange={this.changeContent.bind(this, 'accountOwner')}
                                                           name="account_owner" id="account_owner" type="text"/>
                                                </div>
                                                <div
                                                    className={this.state.empty_required_field['bank_name'] == "true" ? "form-group has-error" : "form-group"}>
                                                    <label className="control-label" htmlFor="bank_name">
                                                        Bank name
                                                    </label>
                                                    <input className="form-control" value={this.state.customerData.bankName}
                                                           onChange={this.changeContent.bind(this, 'bankName')}
                                                           name="bank_name" id="bank_name" type="text"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-4 col-md-offset-4">
                                <button className="btn btn-theme-default btn-lg btn-block my-account-submit-btn" type="submit"
                                        disabled={this.state.isLoading}>
                                    Validate
                                    <FormLoaderIndicator loading={this.state.isLoading}/>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

module.exports = MyAccount;
