import React, {Component} from 'react';
import { render } from 'react-dom';
import {Link} from 'react-router';

var FormLoaderIndicator = require('./../elements/FormLoaderIndicatorComponent.jsx');

class ContactComponent extends Component{

    constructor() {
        super();
        this.state = {
          loading : false,
    			form :{
            fullname: '',
            email: '',
            subject: '',
            message: ''
          }
        }
    }

    changeContent(name, e) {
      var change = {};
      change[name] = e.target.value;
      this.setState(change);
    }

    hideLoading() {
      this.setState({loading: false});
    }

    showLoading(){
      this.setState({loading: true});
    }

    contact(event) {
      event.preventDefault();
      this.showLoading();
      let data = this.state.form;
      const oCommonService = new CommonService();
      oCommonService.contact(data).then(function(response){
        this.hideLoading();
          if (response.ok) {
            render(
              <div className="alert alert-success">
                Your message was successfully sent, we will contact you soon!.
              </div>,
              document.getElementById("alert_msg")
            );
          }
      },
      (err) => {
        this.hideLoading();
        render(
          <div className="alert alert-danger">
            An error occurred while sending your message.
          </div>,
          document.getElementById("alert_msg")
        );
        }
      )
    }

  render() {
    return (
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
             Contact us form
            </h2>
            <p>
            </p>
           </div>
           <form method="post" onSubmit={this.contact.bind(this)}>
            <div className="form-group ">
             <label className="control-label requiredField" for="user_fullname">
              Full name
              <span className="asteriskField">
               *
              </span>
             </label>
             <div className="input-group">
              <div className="input-group-addon">
               <i className="fa fa-user">
               </i>
              </div>
              <input className="form-control" onChange={this.changeContent.bind(this, 'fullname')} id="user_fullname" name="user_fullname" type="text" required/>
             </div>
            </div>
            <div className="form-group ">
             <label className="control-label requiredField" for="contact_email">
              Your email address
              <span className="asteriskField">
               *
              </span>
             </label>
             <div className="input-group">
              <div className="input-group-addon">
               <i className="fa fa-user">
               </i>
              </div>
              <input className="form-control" onChange={this.changeContent.bind(this, 'email')} id="contact_email" name="contact_email" type="text"/>
             </div>
            </div>
            <div className="form-group ">
             <label className="control-label requiredField" for="subject">
              Subject
              <span className="asteriskField">
               *
              </span>
             </label>
             <input className="form-control" onChange={this.changeContent.bind(this, 'subject')} id="subject" name="subject" type="text"/>
            </div>
            <div className="form-group ">
             <label className="control-label requiredField" for="message">
              Message
              <span className="asteriskField">
               *
              </span>
             </label>
             <textarea className="form-control" onChange={this.changeContent.bind(this, 'message')} cols="40" id="message" name="message" rows="10"></textarea>
            </div>
            <div className="form-group">
             <div>
              <button className="btn btn-success btn-lg btn-block" name="submit" type="submit">
               Send
               <FormLoaderIndicator loading={this.state.loading} />
              </button>
             </div>
            </div>
           </form>
          </div>
         </div>
        </div>
    )
  }
}

module.exports = ContactComponent;
