import React, {Component} from 'react';
import { render } from 'react-dom';
import {Router} from 'react-router';

import ClientService from '../../services/ClientService';
const oClientService = new ClientService();

import CommonService from '../../services/CommonService';
const oCommonService = new CommonService();

var FormLoaderIndicator = require('./../elements/FormLoaderIndicatorComponent.jsx');

class ProfilClientComponent extends Component{

  constructor() {
		super();
		this.state = {
			loading : false,
      clientData: {},
      clientCustomFields: {},
			form :{
				email : '',
				first_name: '',
				last_name: '',
        tel: '',
        skype: '',
        website: '',
        company: '',
				newsletter: '',
				password : ''
			}
		}
	}

  getCustomFieldValue(cfName){
    for (let cf of this.state.clientCustomFields){
       if( cf.code == cfName){
          if (cf.stringValue!=null){
             return cf.stringValue;

          }else if(cf.doubleValue!=null){
             return cf.doubleValue;

          }else if(cf.dateValue!=null){
            var customDate = new Date(cf.dateValue);
            var dd = customDate.getDate();
            var mm = customDate.getMonth()+1; //January is 0
            var yyyy = customDate.getFullYear();
            if(dd<10){
                dd='0'+dd;
            }
            if(mm<10){
                mm='0'+mm;
            }
            customDate = yyyy+'-'+mm+'-'+dd;
             return customDate;

          }else if(cf.longValue!=null){
             return cf.longValue;

          }else if(cf.listValue!=null){
            var ex_list = [];
            for (let row of cf.listValue){
              ex_list.push(row.value);
            }
             return ex_list;

          }
      }
    }
  }

  changeContent(name, e) {
	  var state = this.state;
    state['form'][name] = e.target.value;
	  this.setState(state);
	}

  hideLoading() {
		this.setState({loading: false});
    window.scrollTo(0,0);
	}

	showLoading(){
		this.setState({loading: true});
    window.scrollTo(0,0);
	}

  validateOldPassword(event){
    event.preventDefault();
		console.log("validateOldPassword");
    var old_password = document.getElementById("password").value;
    if ((old_password.length != 0) && (old_password != this.state.form.password) ) {
      document.getElementById("password").setCustomValidity("L'ancien mot de passe est incorrecte");
    }else{
      document.getElementById("password").setCustomValidity('');
    }
	}

  validatePassword(event){
    event.preventDefault();
		console.log("validatePassword");
	  if(document.getElementById("new_password").value != document.getElementById("confirm_password").value) {
			document.getElementById("confirm_password").setCustomValidity("Les mots de passe sont pas identiques");
	  } else {
			document.getElementById("confirm_password").setCustomValidity('');
	  }
	}

	validate(){
	  return document.getElementById("form_update_client").checkValidity();
	}

  client_update(event) {
    event.preventDefault();

    if (!this.validate()){
			return false;
	  }

    var state = this.state;

    if (document.getElementById("new_password").value.length != 0) {
      state['form']['password'] = document.getElementById("new_password").value;
    }

    this.setState(state);

    this.showLoading();
    let data = this.state.form;

	  oClientService.UpdateClient(data).then(
		(response) => {
			this.hideLoading();
			if (response.errorCode == null) {
        render(
				  <div className="alert alert-success">
						Modification has been successfully done.
				  </div>,
				  document.getElementById("alert_msg")
				);
			}else{
				render(
				  <div className="alert alert-danger">
						Error occured while updating your information.
				  </div>,
				  document.getElementById("alert_msg")
				);
			}
		},
		(err) => {
			this.hideLoading();
			render(
			  <div className="alert alert-danger">
					Problem occured.
			  </div>,
			  document.getElementById("alert_msg")
			);
			}
		)
  }

  render() {
      if (oCommonService.checkLogin()) {
        var client_code = localStorage.username;
        var client_data = {};

        if (Object.keys(this.state.clientData).length === 0 ) {
          oCommonService.findUser(client_code).then(
            (response) => {
              if (response.customers.customer != null && client_data != null) {
                var customFields = {};
                client_data = response.customers.customer[0];
                this.setState({clientData: client_data});
                this.setState({clientCustomFields: client_data.customFields.customField});

                var state = this.state;
            		  state['form']['newsletter'] = this.getCustomFieldValue("newsletter");
                  state['form']['skype'] = this.getCustomFieldValue("skype");
                  state['form']['password'] = this.getCustomFieldValue("password");
                  state['form']['website'] = this.getCustomFieldValue("website");
                  state['form']['company'] = this.getCustomFieldValue("company");

                  state['form']['email'] = client_data.contactInformation.email;
                  state['form']['first_name'] = client_data.name.firstName;
                  state['form']['last_name'] = client_data.name.lastName;
                  state['form']['tel'] = client_data.contactInformation.phone;
                this.setState(state);
              }else{
                client_data = null;
              }

          },
          (err) => {
              render(
                <div className="alert alert-danger">
                  <strong>Erreur </strong>occured while loading the page content.
                </div>,
                document.getElementById("alert_msg")
              );
            }
          )

        }
      }else{
          //document.location = "#/signin";
      }

    return (
			<div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div id="alert_msg" className ="container-form-alert" >
            </div>
          </div>
        </div>
        <form method="post" onSubmit={this.client_update.bind(this)} id = "form_update_client">
				<div className="row">
					<div className = "container-user-form">
					 	<div className="col-md-4 content col-md-offset-2">
                <div className="form-group ">
         				<div className="input-group">
         				 <div className="input-group-addon">
         				  <i className="fa fa-user">
         				  </i>
         				 </div>
         				 <input className="form-control" value={this.state.form.last_name} onChange={this.changeContent.bind(this, 'last_name')} placeholder="Nom" type="text" required />
         				</div>
       			   </div>
       			   <div className="form-group ">
         				<div className="input-group">
         				 <div className="input-group-addon">
         				  <i className="fa fa-user">
         				  </i>
         				 </div>
         				 <input className="form-control" value={this.state.form.first_name} onChange={this.changeContent.bind(this, 'first_name')} placeholder="Prenom" type="text" required />
         				</div>
       			   </div>
       			   <div className="form-group ">
         				<div className="input-group">
         				 <div className="input-group-addon">
         				  <i className="fa"> @
         				  </i>
         				 </div>
         				 <input className="form-control" value={this.state.form.email} onChange={this.changeContent.bind(this, 'email')} placeholder="Email" type="email" required/>
         				</div>
       			   </div>
               <div className="form-group">
         				<div className="input-group">
         				 <div className="input-group-addon">
         				  <i className="fa fa-link"></i>
         				 </div>
         				 <input className="form-control" value={this.state.form.tel} onChange={this.changeContent.bind(this, 'tel')} placeholder="Téléphone" type="tel"/>
         				</div>
       			   </div>
               <div className="form-group">
         				<div className="input-group">
         				 <div className="input-group-addon">
         				  <i className="fa fa-link"></i>
         				 </div>
         				 <input className="form-control" value={this.state.form.website} onChange={this.changeContent.bind(this, 'website')} placeholder="Site web" type="url"/>
         				</div>
       			   </div>

						</div>
            <div className="col-md-4 content">
              <div className="form-group ">
                <div className="input-group">
                 <div className="input-group-addon">
                  <i className="fa fa-user">
                  </i>
                 </div>
                 <input className="form-control" value={this.state.form.company} onChange={this.changeContent.bind(this, 'company')} placeholder="Entreprise" type="text" />
                </div>
               </div>
               <div className="form-group ">
                 <div className="input-group">
                  <div className="input-group-addon">
                   <i className="fa fa-user">
                   </i>
                  </div>
                  <input className="form-control" value={this.state.form.skype} onChange={this.changeContent.bind(this, 'skype')} placeholder="Skype" type="text" />
                 </div>
                </div>
               <div className="form-group">
         				<div className="input-group">
         				 <div className="input-group-addon">
         				  <i className="fa fa-link"></i>
         				 </div>
         				 <input className="form-control" onChange={this.validateOldPassword.bind(this)} id="password" placeholder="Mot de passe actuel" type="password" required/>
         				</div>
       			   </div>
       			   <div className="form-group">
         				<div className="input-group">
         				 <div className="input-group-addon">
         				  <i className="fa fa-link"></i>
         				 </div>
         				 <input className="form-control" id="new_password" placeholder="Nouveau mot de passe" type="password"/>
         				</div>
       			   </div>
       			   <div className="form-group">
         				<div className="input-group">
         				 <div className="input-group-addon">
         				  <i className="fa fa-link">
         				  </i>
         				 </div>
         				 <input className="form-control" onKeyUp={this.validatePassword.bind(this)} id="confirm_password" placeholder="Confirmer votre mot de passe" type="password"/>
         				</div>
       			   </div>
						</div>
					</div>
				</div>
        <div className="row">
					<div className = "">
            <div className="col-md-4 col-md-offset-2">
              <button className="btn btn-success btn-lg btn-block" type="submit">
                Valider
                <FormLoaderIndicator loading={this.state.loading} />
              </button>
            </div>
          </div>
        </div>
        </form>
			</div>
		)
	}
}

module.exports = ProfilClientComponent;
