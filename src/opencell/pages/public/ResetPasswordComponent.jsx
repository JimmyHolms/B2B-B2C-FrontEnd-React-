import React, {Component} from 'react';
import { render } from 'react-dom';
import {Link} from 'react-router';
import CommonService from '../../services/CommonService';

var FormLoaderIndicator = require('./../elements/FormLoaderIndicatorComponent.jsx');

class ResetPasswordComponent extends Component{

  constructor() {
      super();
      this.state = {
        loading : false,
  			form :{
          new_password: ''
        }
      }
  }

  changeContent(name, e) {
	  var state = this.state;
	  state['form'][name] = e.target.value;
	  this.setState(state);
	}

  navigateBack(){
    document.location = "index.html#/signin";
  }

  hideLoading() {
    this.setState({loading: false});
  }

  showLoading(){
    this.setState({loading: true});
  }

  reset_password(event) {
    event.preventDefault();
    this.showLoading();
    let data = this.state.form;
    if (data.new_password == document.getElementById("confirm_password").value) {
      const oCommonService = new CommonService();
      oCommonService.resetPassword(data.new_password).then(function(response){
        this.hideLoading();
          if (response.errorCode == null && response.status != "FAIL") {
            render(
      			  <NewPasswordComponent />,
      			  document.getElementById("body")
      			);
          }
      },
      (err) => {
        this.hideLoading();
        render(
          <div className="alert alert-danger">
            Error occured while resetting your password.
          </div>,
          document.getElementById("alert_msg")
        );
        }
      )
    }else {
      this.hideLoading();
      render(
        <div className="alert alert-danger">
          The two passwords do not match.
        </div>,
        document.getElementById("alert_msg")
      );
    }
  }

  render() {
    return (
        <div className="reset-password-container">
           <div className="container-fluid">
             <div className="row">
                 <div id="alert_msg" className ="container-form-alert" ></div>
             </div>
            <div className="row">
             <div className="col-md-12 container-form">
              <div className="form_header text-center">
               <h2>
                Choose your new password
               </h2>
              </div>
              <form method="post" onSubmit={this.reset_password.bind(this)}>
               <div className="form-group ">
                 <input className="form-control input-lg" onChange={this.changeContent.bind(this, 'new_password')} placeholder="New password" type="password" required/>
               </div>
               <div className="form-group ">
                 <input className="form-control input-lg" id="confirm_password" placeholder="Password confirmation" type="password" required/>
               </div>
               <div className="form-group">
                <div>
                <button className="btn btn-default btn-sm pull-left" type="button" onClick={this.navigateBack}>
                 Back
                </button>
                 <button className="btn btn-success btn-sm pull-right" name="submit" type="submit">
                  Continue
                  <FormLoaderIndicator loading={this.state.loading} />
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
module.exports = ResetPasswordComponent;
