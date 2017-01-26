import React, {Component} from 'react';

import * as properties from  '../../../properties';

class AccountDetails extends Component{

  renderCivilities(){
    var civilities = properties.list_civilities.map(function(val) {
        return(<option value={val}>{val}</option>);
      });
    return civilities;
  }

  renderCountries(){
    var countries = properties.list_countries.map(function(val) {
        return (<option value={val.code}>{val.description}</option>);
      });
    return countries;
  }

  renderPaymentMethods(){
    var payment_methods = properties.list_payment_methods.map(function(val) {
        return (<option value={val}>{val}</option>);
      });
    return payment_methods;
  }

  client_update(event) {
    event.preventDefault();
  }
  render() {
    const customer = this.props.customer;
    const {customerAccount = []} = customer;
    const {name = []} = customerAccount;
    const {address = []} = customerAccount;
    const {contactInformation = []} = customerAccount;
    const {billingAccount = []} = customerAccount;
    const {bankCoordinates = []} = billingAccount;
    return (
<div>
<label className="control-label top-label">Contract holder</label>
<div className="block-info">
				<div className="row">
					<div className="col-md-4 content">
            <div className="form-group">
              <div className="col-md-4">
                <label className="control-label" htmlFor="civility">
                  Civility
                </label>
              </div>
              <div className="col-md-8">
                <select className="form-control" value={name.title} name="civility">
                  {this.renderCivilities()}
                </select>
              </div>
            </div>

            <div className="form-group">
              <div className="col-md-4">
                <label className="control-label" htmlFor="last_name">
                  Last name
                </label>
              </div>
              <div className="col-md-8">
                <input className="form-control" value={name.lastName} name="last_name" type="text" />
              </div>
            </div>

            <div className="form-group">
              <div className="col-md-4">
                <label className="control-label" htmlFor="first_name">
                  First name
                </label>
              </div>
              <div className="col-md-8">
                <input className="form-control" value={name.firstName} name="first_name" type="text" />
              </div>
            </div>

					</div>
        </div>
</div>

<label className="control-label top-label">Contact information</label>
<div className="block-info">
        <div className="row">
          <div className="col-md-8 content">
            <div className="form-group">
              <div className="col-md-2">
                <label className="control-label" htmlFor="email">
                  Email
                </label>
              </div>
              <div className="col-md-4">
                <input className="form-control" value={contactInformation.email} name="email" type="text" />
              </div>
            </div>

            <div className="form-group">
              <div className="col-md-2">
                <label className="control-label" htmlFor="mobile">
                  Mobile number
                </label>
              </div>
              <div className="col-md-4">
                <input className="form-control" value={contactInformation.mobile} name="mobile" type="text" />
              </div>
            </div>

            <div className="form-group">
              <div className="col-md-2">
                <label className="control-label" htmlFor="address">
                  Address
                </label>
              </div>
              <div className="col-md-4">
                <input className="form-control" value={address.address1} name="address" type="text" />
              </div>

              <div className="col-md-2">
                <label className="control-label" htmlFor="address2">
                  Complementary address
                </label>
              </div>
              <div className="col-md-4">
                <input className="form-control" value={address.address2} name="address2" type="text" />
              </div>
            </div>

            <div className="form-group">
              <div className="col-md-2">
                <label className="control-label" htmlFor="postcode">
                  Postcode
                </label>
              </div>
              <div className="col-md-4">
                <input className="form-control" value={address.zipcode} name="postcode" type="text" />
              </div>
            </div>

            <div className="form-group">
              <div className="col-md-2">
                <label className="control-label" htmlFor="country">
                  Country
                </label>
              </div>
              <div className="col-md-4">
                <select className="form-control" value={address.country} name="country">
                  {this.renderCountries()}
                </select>
              </div>
            </div>

            <div className="form-group">
              <div className="col-md-2">
                <label className="control-label" htmlFor="state">
                  State
                </label>
              </div>
              <div className="col-md-4">
                <input className="form-control" value={address.state} name="state" type="text" />
              </div>
            </div>

					</div>
				</div>
</div>

<label className="control-label top-label">Access</label>
<div className="block-info">
				<div className="row">
					<div className="col-md-4 content">

            <div className="form-group">
              <div className="col-md-4">
                <label className="control-label" htmlFor="login">
                  Login
                </label>
              </div>
              <div className="col-md-8">
                <input className="form-control" value={customer.code} name="login" type="text" readOnly/>
              </div>
            </div>

            <div className="form-group">
              <div className="col-md-4">
                <label className="control-label" htmlFor="password">
                  Password
                </label>
              </div>
              <div className="col-md-8">
                <input className="form-control" name="password" type="password" />
              </div>
            </div>

					</div>
        </div>
</div>

<label className="control-label top-label">Electronic payment method</label>
<div className="block-info">
				<div className="row">
					<div className="col-md-8 content">

            <div className="form-group">
              <div className="col-md-2">
                <label className="control-label" htmlFor="payment_method">
                  Payment method
                </label>
              </div>
              <div className="col-md-4">
                <select className="form-control" value={customerAccount.paymentMethod} name="payment_method">
                  {this.renderPaymentMethods()}
                </select>
              </div>

              <div className="col-md-2">
                <label className="control-label" htmlFor="mandate_identification">
                  Mandate identification
                </label>
              </div>
              <div className="col-md-4">
                <input className="form-control" value={customerAccount.mandateIdentification} name="mandate_identification" type="text" />
              </div>
            </div>

            <div className="form-group">
              <div className="col-md-2">
                <label className="control-label" htmlFor="electronic_billing">
                  Electronic billing
                </label>
              </div>
              <div className="col-md-4">
                <input className="form-control" checked={billingAccount.electronicBilling ? "checked" : false} name="electronic_billing" type="checkbox" />
              </div>

              <div className="col-md-2">
                <label className="control-label" htmlFor="signature_date">
                  Signature date
                </label>
              </div>
              <div className="col-md-4">
                <input className="form-control" value={customerAccount.mandateDate} name="signature_date" type="date" />
              </div>
            </div>

            <div className="form-group">
              <div className="col-md-2">
                <label className="control-label" htmlFor="email">
                  Email
                </label>
              </div>
              <div className="col-md-4">
                <input className="form-control" value={billingAccount.email} name="email" type="email" />
              </div>
            </div>

					</div>
        </div>

        <div className="row">
					<div className="col-md-8 content">
            <div className="col-md-3">
              <label className="control-label" htmlFor="bank_code">
                Bank code
              </label>
              <input className="form-control" value={bankCoordinates.bankCode} name="bank_code" type="text" />
            </div>
            <div className="col-md-3">
              <label className="control-label" htmlFor="bank_branch">
                Bank branch
              </label>
              <input className="form-control" value={bankCoordinates.branchCode} name="bank_branch" type="text" />
            </div>
            <div className="col-md-3">
              <label className="control-label" htmlFor="account_number">
                Account number
              </label>
              <input className="form-control" value={bankCoordinates.accountNumber} name="account_number" type="text" />
            </div>
            <div className="col-md-3">
              <label className="control-label" htmlFor="bank_key">
                Key
              </label>
              <input className="form-control" value={bankCoordinates.key} name="key" type="text" />
            </div>
          </div>
        </div>

        <div className="row">
					<div className="col-md-6 content">
            <div className="col-md-4">
              <label className="control-label" htmlFor="bic">
                BIC
              </label>
              <input className="form-control" value={bankCoordinates.bic} name="bic" type="text" />
            </div>
            <div className="col-md-8">
              <label className="control-label" htmlFor="iban">
                IBAN
              </label>
              <input className="form-control" value={bankCoordinates.iban} name="iban" type="text" />
            </div>
          </div>
        </div>

        <div className="row">
					<div className="col-md-8 content">
            <div className="col-md-6">
              <label className="control-label" htmlFor="account_owner">
                Account owner
              </label>
              <input className="form-control" value={bankCoordinates.accountOwner} name="account_owner" type="text" />
            </div>
            <div className="col-md-6">
              <label className="control-label" htmlFor="bank_name">
                Bank name
              </label>
              <input className="form-control" value={bankCoordinates.bankName} name="bank_name" type="text" />
            </div>
          </div>
        </div>
</div>
</div>
		)
	}
}

module.exports = AccountDetails;
