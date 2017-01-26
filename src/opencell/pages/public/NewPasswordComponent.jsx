import React, {Component} from 'react';
import { render } from 'react-dom';
import {Link} from 'react-router';
import CommonService from '../../services/CommonService';

var NewPasswordComponent = require( './NewPasswordComponent.jsx');
var FormLoaderIndicator = require('./../elements/FormLoaderIndicatorComponent.jsx');

class ResetPasswordComponent extends Component{

  constructor() {
      super();
      this.state = {
        loading : false,
  			form :{
        }
      }
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

  connect(event) {
    event.preventDefault();
  }

  render() {
    return (
        <div className="new-password-container">
           <div className="container-fluid">
             <div className="row">
               <div className="col-md-12">
                 <div id="alert_msg" className ="container-form-alert" ></div>
               </div>
             </div>
            <div className="row">
             <div className="col-md-12 container-form">
              <div className="form_header text-center">
               <h2>
                Your password has been successfully saved
               </h2>
              </div>
              <form method="post" onSubmit={this.connect.bind(this)}>
                <div className="form-group">
     						 <div className="checkbox">
     						  <label className="checkbox">
     						   <input id="stay_connected_check" type="checkbox"/>
     						   Stay connected <br/>
                 (not recommended if you are using a shared computer)
     						  </label>
     						 </div>
     				   </div>
               <div className="form-group">
                <div>
                 <button className="btn btn-success btn-lg pull-left" name="submit" type="submit">
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
