import React, {Component} from 'react';
import { render } from 'react-dom';

import GuestStore from '../../stores/GuestStore';
import FormLoaderIndicator  from '../elements/FormLoaderIndicatorComponent.jsx';
import { forgotPassword } from '../../actions/CustomerActions';

class ForgotPasswordComponent extends Component{

    constructor() {
      super();
      this.state = {
        isLoading : false,
  			error: null,
        email : ''
      }
    }

    changeContent(name, e) {
      var change = {};
      change[name] = e.target.value;
      this.setState(change);
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

    navigateBack(){
      document.location = "index.html#/signin";
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
        window.scrollTo(0,0);
        render(
          <div className="alert alert-success">
            We have sent you an email with a link to reset your password at: {this.state.email}.
          </div>,
          document.getElementById("alert_msg")
        );

  	}

  	displayError() {
  		const { error } = this.state;
  		if (error == null){
  			return;
  		}else{
  			window.scrollTo(0,0);
  			return (
  				<div className="alert alert-danger">
  					<strong>Error!</strong> {error.message}.
  				</div>
  			);
  		}
  	}

    forgot_password(event) {
      event.preventDefault();
      let user_email = this.state.email;
  		forgotPassword(user_email);
    }

    render() {
      return (
        <div className="forgot-password-container login-container">
           <div className="container-fluid">
            <div className="row">
                <div id="alert_msg" className ="container-form-alert" >
                    {this.displayError()}
                </div>
            </div>
            <div className="row">
             <div className="col-md-12 container-form login-form">
              <div className="form_header text-center">
               <h2>
                You do not know your password ?
               </h2>
               <p>
                 Please enter your email address to retrieve it
               </p>
              </div>
              <form method="post" onSubmit={this.forgot_password.bind(this)}>
               <div className="form-group ">
                 <input className="form-control input-lg" onChange={this.changeContent.bind(this, 'email')} id="reset_email" name="reset_email" placeholder="Email address" type="email" required/>
               </div>
               <div className="form-group">
                <div className="clearfix">
                <button className="btn btn-danger btn-sm pull-left" type="button" onClick={this.navigateBack}>
                 Back
                </button>
                 <button className="btn btn-theme-default btn-sm pull-right" name="submit" type="submit">
                  Continue
                  <FormLoaderIndicator loading={this.state.isLoading} />
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
module.exports = ForgotPasswordComponent;
