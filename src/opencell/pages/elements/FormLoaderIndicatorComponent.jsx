import React, {Component} from 'react';
import { render } from 'react-dom';

class ReactFormLoaderIndicatorComponent extends Component{
	
	render() {
		if(!this.props.loading) {
		  return ( <span></span> );
		}
		return  ( <span className='fa fa-spinner'></span> )
	}
}

module.exports = ReactFormLoaderIndicatorComponent;