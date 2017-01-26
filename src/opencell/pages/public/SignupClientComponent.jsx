import React, {Component} from 'react';
import {render} from 'react-dom';
import {Router} from 'react-router';

var LoginComponent = require('./LoginComponent.jsx');
var FormLoaderIndicator = require('./../elements/FormLoaderIndicatorComponent.jsx');

import GuestStore from '../../stores/GuestStore';
import {signupCustomer} from '../../actions/CustomerActions';
import LocalStorageService from '../../services/LocalStorageService';

class SignupClientComponent extends Component {

    constructor() {
        super();
        this.state = {
            isLoading: false,
            error: null,
            form: {
                username: '',
                email: '',
                first_name: '',
                last_name: '',
                password: ''
            }
        }
    }

    componentWillMount() {
        GuestStore.bindLoadHandler(this.renderLoader.bind(this));
        GuestStore.bindUpdateHandler(this.redirectOnUpdate.bind(this));
        GuestStore.bindErrorHandler(this.renderError.bind(this));
    }

    componentWillUnmount() {
        GuestStore.unbindLoadHandler(this.renderLoader.bind(this));
        GuestStore.unbindUpdateHandler(this.redirectOnUpdate.bind(this));
        GuestStore.unbindErrorHandler(this.renderError.bind(this));
    }

    changeContent(name, e) {
        var state = this.state;
        state['form'][name] = e.target.value;
        this.setState(state);
    }

    renderLoader() {
        this.setState({
            isLoading: true,
            error: null
        });
    }

    renderError(error) {
        this.setState({
            isLoading: false,
            error: error
        });
    }

    redirectOnUpdate() {
        this.setState({
            isLoading: false,
            error: null
        });
        LocalStorageService.set("signupEmail", this.state.form.email);
        document.location = "index.html#/signin";
    }

    displayError() {
        const {error} = this.state;
        if (error == null) {
            return;
        } else {
            window.scrollTo(0, 0);
            return (
                <div className="alert alert-danger">
                    <strong>Error!</strong> {error.message}.
                </div>
            );
        }

    }

    validatePassword(e) {
        console.log("validatePassword");
        if (this.state.form.password != document.getElementById("confirm_password").value) {
            document.getElementById("confirm_password").setCustomValidity("Passwords do not match");
        } else {
            document.getElementById("confirm_password").setCustomValidity('');
        }
    }

    validate() {
        return document.getElementById("form_add_client").checkValidity();
    }

    client_signup(event) {
        event.preventDefault();
        let user_data = this.state.form;
        signupCustomer(user_data);
    }

    render() {
        return (
            <div className="container-fluid login-container">
                <div className="row">
                    <div id="alert_msg" className="container-form-alert">
                        {this.displayError()}
                    </div>
                </div>
                <div className="row">
                    <div className="container-form">
                        <div className="col-md-12 content login-form signup-form">
                            <div className="form_header text-center">
                                <h2>
                                    Subscription form
                                </h2>
                                <p>
                                    Please enter your details
                                </p>
                            </div>
                            <form method="post" onSubmit={this.client_signup.bind(this)} id="form_add_client">
                                <div className="form-group ">
                                    <div className="input-group">
                                        <div className="input-group-addon">
                                            <i className="fa fa-user">
                                            </i>
                                        </div>
                                        <input className="form-control"
                                               onChange={this.changeContent.bind(this, 'last_name')}
                                               id="client_lastname" name="client_lastname" placeholder="Last name"
                                               type="text" required/>
                                    </div>
                                </div>
                                <div className="form-group ">
                                    <div className="input-group">
                                        <div className="input-group-addon">
                                            <i className="fa fa-user">
                                            </i>
                                        </div>
                                        <input className="form-control"
                                               onChange={this.changeContent.bind(this, 'first_name')}
                                               id="client_firstname" name="client_firstname" placeholder="First name"
                                               type="text" required/>
                                    </div>
                                </div>
                                <div className="form-group ">
                                    <div className="input-group">
                                        <div className="input-group-addon">
                                            <i className="fa"> @
                                            </i>
                                        </div>
                                        <input className="form-control"
                                               onChange={this.changeContent.bind(this, 'email')} placeholder="Email"
                                               type="email" required/>
                                    </div>
                                </div>
                                <div className="form-group ">
                                    <div className="input-group">
                                        <div className="input-group-addon">
                                            <i className="fa fa-user">
                                            </i>
                                        </div>
                                        <input className="form-control"
                                               onChange={this.changeContent.bind(this, 'username')}
                                               placeholder="Username" type="text" required/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-addon">
                                            <i className="fa fa-lock"></i>
                                        </div>
                                        <input className="form-control"
                                               onChange={this.changeContent.bind(this, 'password')} id="password"
                                               name="password" placeholder="Password" type="password" required/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-addon">
                                            <i className="fa fa-lock">
                                            </i>
                                        </div>
                                        <input className="form-control" onKeyUp={this.validatePassword.bind(this)}
                                               id="confirm_password" name="confirm_password"
                                               placeholder="Confirm your password" type="password" required/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div>
                                        <button className="btn btn-theme-default btn-lg btn-block" name="submit" type="submit"
                                                disabled={this.state.isLoading}>
                                            Start
                                            <FormLoaderIndicator loading={this.state.isLoading}/>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = SignupClientComponent;
